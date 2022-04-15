const faker = require('faker');

const db = require('../config/connection');
const { Destination, Stop, User } = require('../models');

db.once('open', async () => {
  await Destination.deleteMany({});
  // await Stop.deleteMany({});

  await User.deleteMany({});

  // create user data
  const userData = [];

  for (let i = 0; i < 50; i += 1) {
    const username = faker.internet.userName();
    const email = faker.internet.email(username);
    const password = faker.internet.password();

    userData.push({ username, email, password });
  }

  const createdUsers = await User.collection.insertMany(userData);

  // // create friends
  // for (let i = 0; i < 100; i += 1) {
  //   const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
  //   const { _id: userId } = createdUsers.ops[randomUserIndex];

  //   let friendId = userId;

  //   while (friendId === userId) {
  //     const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
  //     friendId = createdUsers.ops[randomUserIndex];
  //   }

  //   await User.updateOne({ _id: userId }, { $addToSet: { friends: friendId } });
  // }

  // create thoughts
  // let createdThoughts = [];
  // for (let i = 0; i < 100; i += 1) {
  //   const thoughtText = faker.lorem.words(Math.round(Math.random() * 20) + 1);

  //   const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
  //   const { username, _id: userId } = createdUsers.ops[randomUserIndex];

  //   const createdThought = await Thought.create({ thoughtText, username });

  //   const updatedUser = await User.updateOne(
  //     { _id: userId },
  //     { $push: { thoughts: createdThought._id } }
  //   );

  //   createdThoughts.push(createdThought);
  // }

  // create Destinations

  let createdDestinations = [];
  for (let i = 0; i < 100; i += 1) {

    const destinationTitle = faker.lorem.words(Math.round(Math.random() * 20) + 1);
    const destinationText = faker.lorem.words(Math.round(Math.random() * 20) + 1);
    const destinationImgUrl = faker.lorem.words(Math.round(Math.random() * 20) + 1);
    const destinationLocUrl = faker.lorem.words(Math.round(Math.random() * 20) + 1);


    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    const { username, _id: userId } = createdUsers.ops[randomUserIndex];

    const createdDestination = await Destination.create(
      { destinationTitle, destinationText, destinationImgUrl, destinationLocUrl, username });

    const updatedUser = await User.updateOne(
      { _id: userId },
      { $push: { destinations: createdDestination._id } }
    );

    createdDestinations.push(createdDestination);
  }


  // create stops

  let createdStops = [];
  for (let i = 0; i < 100; i += 1) {

    const stopTitle = faker.lorem.words(Math.round(Math.random() * 20) + 1);
    const stopText = faker.lorem.words(Math.round(Math.random() * 20) + 1);
    const stopImgUrl = faker.lorem.words(Math.round(Math.random() * 20) + 1);
    const stopLocUrl = faker.lorem.words(Math.round(Math.random() * 20) + 1);

    const randomDestinationIndex = Math.floor(Math.random() * createdDestinations.ops.length);
    const { destination, _id: destinationId } = createdDestinations.ops[randomDestinationIndex];

    // const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    // const { username, _id: userId } = createdUsers.ops[randomUserIndex];

    const createdStop = await stopImgUrl.create(
      { stopTitle, stopText, stopImgUrl, stopLocUrl, destination });

    const updatedDestination = await Destination.updateOne(
      { _id: destinationId },
      { $push: { stops: createdStops._id } }
    );

    createdStops.push(createdStop);
  }

  // create reactions
  // for (let i = 0; i < 100; i += 1) {
  //   const reactionBody = faker.lorem.words(Math.round(Math.random() * 20) + 1);

  //   const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
  //   const { username } = createdUsers.ops[randomUserIndex];

  //   const randomThoughtIndex = Math.floor(Math.random() * createdThoughts.length);
  //   const { _id: thoughtId } = createdThoughts[randomThoughtIndex];

  //   await Thought.updateOne(
  //     { _id: thoughtId },
  //     { $push: { reactions: { reactionBody, username } } },
  //     { runValidators: true }
  //   );
  // }

  for (let i = 0; i < 100; i += 1) {
    const reactionBody = faker.lorem.words(Math.round(Math.random() * 20) + 1);

    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    const { username } = createdUsers.ops[randomUserIndex];

    const randomStopIndex = Math.floor(Math.random() * createdStops.length);
    const { _id: stopId } = createdStops[randomStopIndex];

    await Stop.updateOne(
      { _id: stopId },
      { $push: { reactions: { reactionBody, username } } },
      { runValidators: true }
    );
  }

  console.log('all done!');
  process.exit(0);
});
