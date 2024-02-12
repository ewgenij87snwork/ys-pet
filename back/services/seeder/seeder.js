const faker = require('faker');

const { Users } = require('../../schemas/Users.js');
const { Posts } = require('../../schemas/Posts');
const { Likes } = require('../../schemas/Likes');
const { Tags } = require('../../schemas/Tags');

seed = async () => {
  let randomTotal = Math.ceil(Math.random() * 3);
  let countUsers = randomTotal;
  let countPosts = randomTotal + 2;
  let countDays = randomTotal;
  let today = new Date();

  try {
    await Users.deleteMany();
    await Posts.deleteMany();
    await Likes.deleteMany();
    await Tags.deleteMany();

    // Seed Users
    while (countUsers > 0) {
      let name = `${ faker.name.firstName() } ${ faker.name.lastName() }`;
      let email = `${ name.split(' ').join('') }@${ faker.internet.domainWord() }.com`
      let pass = faker.random.alpha(6);

      let userObj = await new Users({
        name: name,
        email: email,
        password: pass
      })

      await userObj.save()

      // Seed Posts
      while (countPosts > 0) {
        let postObj = await new Posts({
          title: faker.name.title(),
          subtitle: faker.name.title(2) + ' ' + faker.random.words(3),
          text: faker.lorem.paragraphs(5),
          author: userObj._id,
          updatedAt: new Date(today.setDate(today.getDate() - Math.ceil(Math.random() * countDays)))
        })

        await postObj.save();

        countPosts--;
      }

      countPosts = randomTotal;
      countUsers--;
    }

    await seedLikes();
    return console.log('Users & Posts seeded')

  } catch (e) {
    console.error('Error seeding: ', e)
  }

}


seedLikes = async () => {
  const TAGS = [
    'mechanics',
    'electronics',
    'medicine',
    'industrial',
    'transport',
    'aviation',
    'finance',
    'social',
    'family',
    'inventions'
  ];

  for (const tagItem of TAGS) {
    let tagObj = await new Tags({
      title: tagItem
    })

    await tagObj.save();
  }

  let allUsers = await Users.find();
  let allPosts = await Posts.find();

  for (const postItem of allPosts) {
    const randomNumberTags = Math.floor(Math.random() * TAGS.length)

    // Seed Tags
    await Posts.findByIdAndUpdate((await postItem)._id,
      {
        tags: await Tags.aggregate().sample(randomNumberTags)
      })

    // Seed Likes
    for (const userItem of allUsers) {
      const userPutsLike = Math.round(Math.random());

      if (userPutsLike) {
        let likeObj = await new Likes({
          post: (await postItem)._id,
          user: (await userItem)._id
        })

        await likeObj.save();
        await Posts.findByIdAndUpdate((await postItem)._id, { $inc: { likes: Math.ceil(Math.random()) } })
      }
    }
  }
  return console.log('Likes seeded')
}

module.exports = { seed }

