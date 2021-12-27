const { Users } = require('../../schemas/Users.js');
const faker = require('faker');

seedUsers = async () => {
  let count = 5;
  try {
    await Users.deleteMany();

    while (count > 0) {
      const name = `${ faker.name.firstName() } ${ faker.name.lastName() }`;
      const email = `${ name.split(' ').join('') }@${ faker.internet.domainWord() }.com`
      const pass = faker.random.alpha(6);

      const userObj = await new Users({
        name: name,
        email: email,
        password: pass
      })

      await userObj.save()

      count--;
    }

    const all = await Users.find();
    console.log(all)
  } catch (e) {
    console.error('Error seeding: ', e)
  }

}

module.exports = { seedUsers }

