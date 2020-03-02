const express = require('express');
const router = express.Router();
const helpers = require('../data/helpers/actionModel');
const validateID = require('../middleware/validateID');


router.get('/', async (req, res) =>{
    try{
        console.log(req.params)
        res.json(await helpers.get())
    } catch(err) {
        console.log(err.message);
        res.status(500).json({message: "There was an error while getting the actions"})
    }
})


router.get('/:projectID/:id', validateID('action'),  async (req, res)=>{
    res.json(req.actions)
})



router.post('/:projectID/', validateID('action'), async (req, res)=>{
    try {
        res.json(await helpers.insert({
            project_id: req.params.projectID,
            description: req.body.description,
            notes: req.body.notes,
            completed: req.body.completed
        }))
    } catch(err){
        res.status(500).json({message: "There was an error while adding an action"})
    }
})

router.put('/:projectID/:id', validateID('action'),  async (req, res)=>{
    res.json(await helpers.update(req.params.id, {
        project_id: req.params.projectID,
        description: req.body.description,
        notes: req.body.notes,
        completed: req.body.completed
    }))
})
router.delete('/:projectID/:id', validateID('action'),  async (req, res)=>{
    res.json(await helpers.remove(req.params.id))
})

module.exports = router;










module.exports = router;