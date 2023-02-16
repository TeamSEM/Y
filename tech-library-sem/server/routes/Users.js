const express = require("express");
const {Users} = require("../models");
const jwt = require('jsonwebtoken');
const router = express.Router();
const cors = require('cors');

const bcrypt = require('bcrypt');
const {sequelize} = require("sequelize")
//include middleware for parsing the body included into the request
router.use(express.json());
router.use(express.urlencoded({extended: true}))

// read entries from the database
router.get('/', async (req,res,next) => {
    try {
        await Users.get({
            where:{
                id: req.params.id
            }
        });
        res.json(await Users.findAll());
       
    } catch (error) {
        console.log(error);
      next(error); 
    }
})

    //edit entries in the database
router.put('/:id', async (req, res) => {
    await Users.update({
        where:{
            id: req.params.id
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

 // User add entries
router.post("/", async (req,res) => {

    console.log('added item', req.body )
    // const itemtoAdd = await Items.create(req.body);
    res.json(await Users.findAll());
    })

module.exports = router;