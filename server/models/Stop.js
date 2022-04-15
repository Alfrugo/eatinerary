const { Schema } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const stopSchema = new Schema(
  {
    stopTitle: {
      type: String,
      required: true,
      maxlength: 280
    },
    stopText: {
      type: String,
      required: true,
      maxlength: 2800
    },
    stopImgUrl: {
      type: String,
      required: true,
      maxlength: 3000
    },
    stopReaction: {
    type: String,
    required: true,
    maxlength: 280
    },
    username: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    }
  },
  {
    toJSON: {
      getters: true
    }
  }
);

module.exports = stopSchema;
