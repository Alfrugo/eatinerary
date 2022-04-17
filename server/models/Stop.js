const { Schema, model } = require("mongoose");

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
    username: {
      type: String,
      required: true,
    },
    numPositiveReactions: {
      type: Number,
      required: false,
      default: 0,
    },
    numNegativeReactions: {
      type: Number,
      required: false,
      default: 0,
    },
    numNeutralReactions: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const Stop = model("Stop", stopSchema);

module.exports = {
  Stop,
  stopSchema
};
