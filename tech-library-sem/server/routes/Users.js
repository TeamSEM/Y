const express = require("express");
const {Users} = require("../models");

const router = express.Router();

//include middleware for parsing the body included into the request
router.use(express.json());
router.use(express.urlencoded({extended: true}))

// read entries from the database
router.get('/', async (req,res) => {
    await Users.get({
        where:{
            id: req.params.id
        }
    });
    res.json(await Users.findAll());
    })

    //edit entries in the database
router.put('/:id', async (req, res) => {
    await Users.update({
        where:{
            id
        }
    })
})
// delete a user from the db
router.delete('/:userid', async (req,res)=>{
    await Users.destroy({
        where:{
            id: req.params.userid
        }
    });
    console.log('user has been deleted')
    res.json(await Users.findAll());
 })

module.exports = router;