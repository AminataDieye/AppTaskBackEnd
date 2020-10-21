const express = require('express');
const app = express();
const taskRoute = express.Router();

// Tache model
let Task = require('../model/task');


// Add Tache
taskRoute.route('/create').post((req, res, next) => {
  Task.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});



// Get All Taches
taskRoute.route('/').get((req, res) => {
  Task.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get single tache
taskRoute.route('/read/:id').get((req, res) => {
  Task.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Trie date ordre croissant

taskRoute.route('/dateCroissant/').get((req, res) => {

Task.find().sort({"date": 1}).exec(function(err,data){
  if (err) throw err;
  res.json(data);
})
})

// Trie date ordre decroissant

taskRoute.route('/dateDecroissant/').get((req, res) => {

  Task.find().sort({"date": -1}).exec(function(err,data){
    if (err) throw err;
    res.json(data);
  })
  })

// Update tache
taskRoute.route('/update/:id').put((req, res, next) => {
  Task.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('Tache updated successfully')
    }
  })
})

// Delete task
taskRoute.route('/delete/:id').delete((req, res, next) => {
  Task.findOneAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = taskRoute;