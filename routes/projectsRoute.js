const express = require('express')
const router = express.Router()
const projectsDb = require('../data/helpers/projectModel')


router.get("/", async (req, res, next) =>{
    try{
        res.json( await projectsDb.get())
    }
    catch(err){
        next(err)
    }
})

router.post("/", async (req, res, next) =>{
    try{
            if(!req.body.name || !req.body.description){
                res.status(400).json({
                    errorMessage: "You have to give both a project name and a project description"
                })
            }
            res.status(201).json( await projectsDb.insert(req.body))
    }
    catch(err){
        next(err)
    }
})

router.put("/:id", async (req, res, next) =>{
    try{
        const changes = req.body
        const projectId = await projectsDb.get(req.params.id)

        if(!projectId){
            res.status(400).json({
                error: "The project you are trying to update doesnt exist"
            })
        }
        else{ 
            res.status(201).json( await projectsDb.update(req.params.id, changes))
        }
    }
    catch(err){
        next(err)
    }
})

router.delete("/:id", async (req, res, next) =>{
    try{
        const projectId = await projectsDb.get(req.params.id)

        if(!projectId){
            res.status(400).json({
                error: "The project you are trying to delete doesnt exist"
            })
        }
        else{
            res.status(201).json( await projectsDb.remove(req.params.id))
        }
    }
    catch(err){
        next(err)
    }
})


router.get("/:id/", async (req, res, next) =>{
    try{
        res.json(await projectsDb.get(req.params.id))
    }
    catch(err){
        next(err)
    }
})



router.get("/:id/actions", async (req, res, next) =>{
    try{
        res.json(await projectsDb.getProjectActions(req.params.id))
    }
    catch(err){
        next(err)
    }
})

module.exports = router;