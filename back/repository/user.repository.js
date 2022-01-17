const Likes = require('../schemas/Likes');
const Posts = require('../schemas/Posts');
const Users = require('../schemas/Users');
const { getHash, compareHash } = require('../utils/bcrypt');
const { Types } = require('mongoose');

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

      if (!user) {
        return reject({ message: 'Email not register' });
      }
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
    return new Promise(async (resolve, reject) => {
      if (!Types.ObjectId.isValid(userId)) {
        return reject({ message: 'UserId not found' });
      }

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

  getUserToken(userId) {
    return new Promise(async (resolve, reject) => {
      const tokenExist = await this.userModel.exists({ _id: userId });
      if (!tokenExist) {
        return reject({ message: 'Wrong Auth token' });
      }

      this.userModel
        .findById(userId)
        .populate('token')
        .then(user => {
          return resolve(user.token);
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
