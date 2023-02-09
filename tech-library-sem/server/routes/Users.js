const express = require("express");
const {Users} = require("../models");

const router = express.Router();

//include middleware for parsing the body included into the request
router.use(express.json());
router.use(express.urlencoded({extended: true}))


// delete a user from the db
router.delete('/:id', async (req,res)=>{
    await Users.destroy({
        where:{
            id: req.params.id
        }
    });
    res.json(await Users.findAll());
 })

module.exports = router;