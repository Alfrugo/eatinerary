const { AuthenticationError } = require('apollo-server-express');
const { User, Destination, Stop } = require('../models');
const { signToken } = require('../utils/auth');
const mongoose = require('mongoose');


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
            { $push: { stops: stop } },
            { new: true }
          );
      
          return stop;
        }
      
        throw new AuthenticationError('You need to be logged in!');
      },
      addPositiveReaction: async (parent, args, context) => {
        if (context.user) {
          await Destination.findOneAndUpdate(
            { 'stops._id': mongoose.Types.ObjectId(args.stopId) },
            { $inc: { 'stops.$.numPositiveReactions': 1 } }
          );
      
          return await Destination.findOne({ 'stops._id': mongoose.Types.ObjectId(args.stopId) });
        }
      
        throw new AuthenticationError('You need to be logged in!');
      },
      addNegativeReaction: async (parent, args, context) => {
        if (context.user) {
          await Destination.findOneAndUpdate(
            { 'stops._id': mongoose.Types.ObjectId(args.stopId) },
            { $inc: { 'stops.$.numNegativeReactions': 1 } }
          );
      
          return await Destination.findOne({ 'stops._id': mongoose.Types.ObjectId(args.stopId) });
        }
      
        throw new AuthenticationError('You need to be logged in!');
      },
      addNeutralReaction: async (parent, args, context) => {
        if (context.user) {
          await Destination.findOneAndUpdate(
            { 'stops._id': mongoose.Types.ObjectId(args.stopId) },
            { $inc: { 'stops.$.numNeutralReactions': 1 } }
          );
      
          return await Destination.findOne({ 'stops._id': mongoose.Types.ObjectId(args.stopId) });
        }
      
        throw new AuthenticationError('You need to be logged in!');
      },
    }
};

module.exports = resolvers;