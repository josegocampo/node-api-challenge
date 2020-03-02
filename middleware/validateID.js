const actionHelp = require('../data/helpers/actionModel')
const projectHelp = require('../data/helpers/projectModel')


const validateID = (type) =>{
  return async (req, res, next) => {
    switch(type){
        case "project":
            try{
                const project = await projectHelp.get(req.params.id);
                if (project) {
                    req.project = project;
                        return next ();
                }
                res.status(404).json({
                    message: "Couldnt find the project with that ID"
                })
            }
            catch (err) {
                res.status(500).json({
                    message: "Sorry there is an error"
                })
            }
            break;
        case "action":
            try{
                const project = await projectHelp.get(req.params.projectID);
                if (project) {
                    const actions = await actionHelp.get(req.params.id);
                    if (actions){
                        req.actions = actions
                        return next()
                    }
                    req.actions = [];
                    return next ()
                }
               res.status(404).json({
                   message: "This project doesnt exist"
               })     
            }
            catch(err){
                res.status(500).json({
                    message: "Error when getting your actions"
                })
            }
    }

  };
};

module.exports = validateID