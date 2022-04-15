const { Schema } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const reactionSchema = require('./Reaction');

const stopSchema = new Schema(
  {
    stopTitle: {
      type: String,
      required: true,
      maxlength: 280,
    },
    stopText: {
      type: String,
      required: true,
      maxlength: 2800,
    },
    stopImgUrl: {
      type: String,
      required: true,
      maxlength: 3000,
    },
    stopReaction: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },

    reactions: [reactionSchema], //this will show the array of stops

  },
  {
    toJSON: {
      getters: true,
    },
  }
);


stopSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});
// stopSchema.virtual("mehCount").get(function () {
//   return this.reactions.length;
// });
// stopSchema.virtual("negCount").get(function () {
//   return this.reactions.length;
// });

module.exports = stopSchema;
