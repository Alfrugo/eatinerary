const { Schema, model } = require('mongoose');
const stopSchema = require('./Stop');
const dateFormat = require('../utils/dateFormat');

const destinationSchema = new Schema(
  {
    destinationTitle: {
      type: String,
      required: 'Please enter title for your destination',
      minlength: 1,
      maxlength: 280
    },
    
    destinationText: {
      type: String,
      required: 'Please enter brief description about your destination',
      minlength: 1,
      maxlength: 280
    },

    destinationImgUrl: {
      type: String,
      required: 'Please enter image url so we can display it',
      minlength: 1,
      maxlength: 1280
    },

    locationUrl: {
      type: String,
      required: 'Please enter google maps url so we can display the map',
      minlength: 1,
      maxlength: 1280
    },
    // createdAt: {
    //   type: Date,
    //   default: Date.now, // should this be a string? 
    //   get: timestamp => dateFormat(timestamp)
    // },
    username: {
      type: String,
      required: true
    },
    stops: [stopSchema] //this will show the array of stops
  },
  {
    toJSON: {
      getters: true
    }
  }
);
 
// three types of reaction positive meh neg / goes in the Stop.js model

destinationSchema.virtual('positiveCount').get(function() {
  return this.reactions.length;
});



const Destination = model('Destination', destinationSchema);

module.exports = Destination;
