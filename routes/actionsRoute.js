const express = require('express')
const router = express.Router()
const actionsDb = require('../data/helpers/actionModel')

router.get("/", async (req, res, next) =>{
    try{
        
        res.json(await actionsDb.get())
    }
    catch(err){
        next(err)
    }    
})


router.get("/:id", async (req, res, next) =>{
    try{
       const actionId = await actionsDb.get(req.params.id)
        if(!actionId){
            res.status(400).json({
                errMsg: "that action doesnt exist"
            })
        }
        res.json(await actionId)
    }
    catch(err){
        next(err)
    }    
})


router.delete("/:id", async (req, res, next) =>{
    try{
       const actionId = await actionsDb.get(req.params.id)

        if(!actionId){
            res.status(400).json({
                errMsg: "that action doesnt exist"
            })
        }
        res.status(201).json(await actionsDb.remove(req.params.id))
    }
    catch(err){
        next(err)
    }    
})



router.put("/:id", async (req, res, next) =>{
    try{
        const changes = req.body
        const actionId = await actionsDb.get(req.params.id)

        if(!actionId){
            res.status(400).json({
                error: "The action you are trying to update doesnt exist"
            })
        }
        else{ 
            res.status(201).json( await actionsDb.update(req.params.id, changes))
        }
    }
    catch(err){
        next(err)
    }
})




module.exports = router