const express = require('express')
const router = express.Router()
const helpers = require('../data/helpers/projectModel')
const validateID = require('../middleware/validateID')


router.get('/', async (req, res) => {
try{
    res.json(await helpers.get())
} catch(err) {
    console.log(err)
    res.status.json({
        message: "There was an error when getting the projects"
    })
}
})

router.get('/:id', validateID('project'), async (req, res) =>{
    try {
        res.json(req.project)
    } catch(err){
        console.log(err)
        res.status(500).json("There was an internal Server Error")
    }
})

router.get('/:id/actions', validateID('project'), async (req, res) =>{
    try{
        res.json(await helpers.getProjectActions(req.params.id))
    } catch(err){
        console.log(err)
        res.status(500).json("There was an internal Server Error")
    }
})

router.post('/', async (req, res) => {
    try{
        if (req.body.name && req.body.description){
            return res.status(201).json(await helpers.insert({
                name: req.body.name,
                description: req.body.description,
            }))
        }
        res.status(400).json({
            message: "You need to add a name and description"
        })
    } catch(err){
        console.log(err)
        res.status(500).json({
            message: "There was an error while adding your project"
        })
    }
})

router.put('/:id', validateID('project'), async (req, res) =>{
    try {
        res.json(await helpers.update(req.params.id, {
            name: req.body.name,
            description: req.body.description,
            completed: req.body.completed
        }))
    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: "There was an internal Server Error"
        })
    }
})

router.delete('/:id', validateID('project'), async (req, res) =>{
    try{
        res.json(await helpers.remove(req.params.id))
    } catch(err){
        console.log(err)
        res.status(500).json({
            message: "There was an internal server error"
        })
    }
})


module.exports = router;