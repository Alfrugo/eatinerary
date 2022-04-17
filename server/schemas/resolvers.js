const { AuthenticationError } = require('apollo-server-express');
const { User, Destination, Stop } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
      me: async (parent, args, context) => {
        if (context.user) {
          const userData = await User.findOne({ _id: context.user._id })
            .select('-__v -password')
            // .populate('thoughts')
            // .populate('friends')
            .populate('destinations')
      
          return userData;
        }
      
        throw new AuthenticationError('Not logged in');
      },

      destinations: async (parent, { username }) => {
        const params = username ? { username } : {};
        return Destination.find(params).sort({ createdAt: -1 });
      },

      destination: async (parent, { _id }) => {
        return Destination.findOne({ _id });
      },

      users: async () => {
        return User.find()
            .select('-__v -password')
            // .populate('friends')
            // .populate('thoughts')
            .populate('destinations');
      },
      // get a user by username
      user: async (parent, { username }) => {
        return User.findOne({ username })
          //  .select('-__v -password')
          .populate('friends')
          .populate('thoughts')
          .populate('destinations');
      },      
    },
    Mutation: {
      addUser: async (parent, args) => {
        const user = await User.create(args);
        const token = signToken(user);
      
        return { token, user };
      },
      login: async (parent, { email, password }) => {
        const user = await User.findOne({ email });
      
        if (!user) {
          throw new AuthenticationError('Incorrect credentials');
        }
      
        const correctPw = await user.isCorrectPassword(password);
      
        if (!correctPw) {
          throw new AuthenticationError('Incorrect credentials');
        }
      
        const token = signToken(user);
        return { token, user };
      },
      addDestination: async (parent, args, context) => {
        if (context.user) {
          const destination = await Destination.create({ ...args, username: context.user.username });
      
          await User.findByIdAndUpdate(
            { _id: context.user._id },
            { $push: { destinations: destination._id } },
            { new: true }
          );
      
          return destination;
        }
      
        throw new AuthenticationError('You need to be logged in!');
      },
      addStop: async (parent, args, context) => {
        if (context.user) {
          const stop = await Stop.create({ ...args, username: context.user.username });
      
          await Destination.findByIdAndUpdate(
            { _id: args.destinationId },
            { $push: { stops: stop._id } },
            { new: true }
          );
      
          return stop;
        }
      
        throw new AuthenticationError('You need to be logged in!');
      },
      addPositiveReaction: async (parent, args, context) => {
        if (context.user) {
          const dest = await Destination.findById(args.destinationId);
          console.log(dest.stops);

          const stop = dest.stops.findById(s => {
            if (s) {
              s._id.toString() === args.stopId
            };
            return false;
          });
          console.log(stop);
          stop.numPositiveReactions = stop.numPositiveReactions+1;
          await dest.stops.pull({ _id: args.stopId });
          await dest.stops.push(stop)

          await dest.save();
      
          return stop;
        }
      
        throw new AuthenticationError('You need to be logged in!');
      },
      addNegativeReaction: async (parent, args, context) => {
        if (context.user) {
          await Stop.findOneAndUpdate(
            { _id: args.stopId },
            { $inc: { numNegativeReactions: 1 } },
          );
      
          return await Stop.findOne({ _id: args.stopId });
        }
      
        throw new AuthenticationError('You need to be logged in!');
      },
      addNeutralReaction: async (parent, args, context) => {
        if (context.user) {
          const updatedStop = await Stop.findOneAndUpdate(
            { _id: args.stopId },
            { $inc: { numNeutralReactions: 1 } },
          );
      
          return await Stop.findOne({ _id: args.stopId });
        }
      
        throw new AuthenticationError('You need to be logged in!');
      },
    }
};

module.exports = resolvers;