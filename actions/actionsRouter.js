const express = require('express');
const actions = require('../data/helpers/actionModel')
const projects = require('../data/helpers/projectModel')
const router = express.Router();

// GET ACTIONS
router.get('/', (req, res, next) => {
    actions
      .get()
      .then((actions) => {
        res.status(200).json(actions)
      })
      .catch((error) => {
        next(error)
      })
  });

  // GET ACTIONS BY ID
  router.get('/:id', (req, res, next) => {
    actions
      .get(req.params.id)
      .then((action) => {
        if (action) {
          res.status(200).json(action)
        } else {
          res.status(404).json({message:"No action found with said ID"})
        }
      })
      .catch((error) => {
        next(error)
      })
  });

    // POST/CREATE ACTIONS
    router.post('/', (req, res) => {
        const action = { id: req.params.id, ...req.body }
      
        if (!req.body.notes || !req.body.description || !req.body.project_id) {
          res.status(404).json({message:"notes and description required"})
        }
        if (req.body.description.length >= 128) {
            res.status(400).json({message:"description CANNOT excede 128 characters."})
            .abort()
        }
        actions
          .insert(action)
          .then((data) => {
            if (data) {
              res.status(201).json({data})
            } else {
              res.status(404).json({message:"error"})
            }
          })
          .catch((error) => {
            console.log(error)
            res.status(500).json({error: "Said Project ID does NOT exist"})
          })
      });

  //PUT ACTION/UPDATE BY ID
  router.put('/:id', validateActionId,  (req, res, next) => {
    if ( !req.body.description || !req.body.notes ) {
      return res.status(400).json({message:"Please provide DESCRIPTION, and NOTES"})
    }
  
    actions
      .update(req.params.id, req.body)
      .then((action) => {
        if (action) {
          res.status(200).json({
            message:"action updated."
          })
        } else {
          res.status(404).json({
            message:"action with said ID not found."
          })
        }
      })
      .catch((error) => {
        next(error)
      })
  });


  //DELETE ACTION BY ID
  router.delete('/:id', validateActionId, (req, res, next) => {
    actions
     .remove(req.params.id)
     .then((count) => {
       if (count > 0){
         res.status(200).json({message:"action deleted"})
       } 
     })
     .catch((error) => {
       next(error)
     })
   });


   // random custom middleware
   
   function validateActionId(req, res, next) {
    actions
      .get(req.params.id)
      .then(posts => {
        if (posts) {
          req.posts = posts
          next()
        } else {
          res.status(400).json({ error: "Invalid action ID." })
        }
      })
      .catch((error) => {
        next(error)
      })
  }


module.exports = router;