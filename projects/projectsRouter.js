const express = require('express');
const actions = require('../data/helpers/actionModel')
const projects = require('../data/helpers/projectModel')
const router = express.Router();

// GET PROJECTS
router.get('/', (req, res, next) => {
    projects
      .get()
      .then((projects) => {
        res.status(200).json(projects)
      })
      .catch((error) => {
        next(error)
      })
  });

  // GET PROJECTS BY ID
  router.get('/:id', (req, res, next) => {
    projects
      .get(req.params.id)
      .then((project) => {
        if (project) {
          res.status(200).json(project)
        } else {
          res.status(404).json({message:"No project found with said ID"})
        }
      })
      .catch((error) => {
        next(error)
      })
  });

// GET PROJECT'S ACTIONS BY ID
  router.get('/:id/actions', (req, res, next) => {
    projects
      .get(req.params.id)
      .then((project) => {
        if (project) {
          res.status(200).json(project.actions)
        } else {
          res.status(404).json({message:"No project/actions found with said ID"})
        }
      })
      .catch((error) => {
        next(error)
      })
  });

  // GET PROJECT'S ACTIONS BY ID (made this one with helper)
  router.get('/:id/actionss', (req, res, next) => {
    projects
      .getProjectActions(req.params.id)
      .then((project) => {
        if (project) {
          res.status(200).json(project)
        } else {
          res.status(404).json({message:"No project/actions found with said ID"})
        }
      })
      .catch((error) => {
        next(error)
      })
  });

  // POST/CREATE PROJECT
  router.post('/', (req, res) => {
    const project = { id: req.params.id, ...req.body }
  
    if (!req.body.name || !req.body.description) {
      res.status(404).json({message:"Name and description required"})
    }
  
    projects
      .insert(project)
      .then((data) => {
        if (data) {
          res.status(201).json({data})
        } else {
          res.status(404).json({message:"error"})
        }
      })
      .catch((error) => {
        console.log(error)
        res.status(500).json({error: "Oops"})
      })
  });

  //PUT PROJECT/UPDATE BY ID
  router.put('/:id',  (req, res, next) => {
    if ( !req.body.description || !req.body.name ) {
      return res.status(400).json({message:"Please provide DESCRIPTION, and NAME"})
    }
  
    projects
      .update(req.params.id, req.body)
      .then((project) => {
        if (project) {
          res.status(200).json({
            message:"project updated."
          })
        } else {
          res.status(404).json({
            message:"project with said ID not found."
          })
        }
      })
      .catch((error) => {
        next(error)
      })
  });


  //DELETE PROJECTS BY ID
  router.delete('/:id', (req, res, next) => {
    projects
     .remove(req.params.id)
     .then((count) => {
       if (count > 0){
         res.status(200).json({message:"project deleted"})
       } else {
         res.status(404).json({message:"project with said ID not found"})
       }
     })
     .catch((error) => {
       next(error)
     })
   });







module.exports = router;