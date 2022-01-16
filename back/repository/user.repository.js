const Likes = require('../schemas/Likes');
const Posts = require('../schemas/Posts');
const Users = require('../schemas/Users');
const { getHash, compareHash } = require('../utils/bcrypt');
const { reject } = require('bcrypt/promises');

class UserRepository {
  constructor(options) {
    this.likeModel = options.likeModel;
    this.postModel = options.postModel;
    this.userModel = options.userModel;
  }

  async signup(options) {
    let { name, email, password } = options;
    return new Promise(async (resolve, reject) => {
      const userAlreadyCreated = await this.userModel.exists({ email: email });

      if (userAlreadyCreated) {
        return reject({ message: 'Email already registered' });
      }

      password = await getHash(password);

      await this.userModel.create({
        name,
        email,
        password,
      });
      return resolve();
    });
  }

  async findByAuth(options) {
    const { email, password } = options;

    return new Promise(async (resolve, reject) => {
      const user = await this.userModel.findOne({ email });
      const comparedPass = compareHash(password, user.password);

      if (!comparedPass) {
        return reject({ message: 'Wrong Password' });
      }

      return resolve(user);
    });
  }

  saveToken(userId, token) {
    return new Promise((resolve, reject) => {
      this.userModel
        .findOneAndUpdate(
          { _id: userId },
          {
            $set: {
              token: token,
            },
          },
        )
        .then(async user => {
          console.log(await this.userModel.findOne({ _id: userId }));
          return resolve({
            name: user.name,
            email: user.email,
            token: user.token,
          });
        })
        .catch(e => {
          return reject(e);
        });
    });
  }

  deleteToken(userId) {
    return new Promise(resolve => {
      this.userModel
        .findOneAndUpdate(
          { _id: userId },
          {
            $set: {
              token: '',
            },
          },
        )
        .then(_ => {
          return resolve();
        })
        .catch(e => {
          return reject(e);
        });
    });
  }
}

module.exports = new UserRepository({
  likeModel: Likes,
  postModel: Posts,
  userModel: Users,
});
