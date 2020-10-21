const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Task = new Schema({
   titre: {
      type: String
   },
  description: {
      type: String
   },
   
   date :
   {
     type : Date,
   },
   
   
}, {
   collection: 'tasks'
})

module.exports = mongoose.model('Task', Task)