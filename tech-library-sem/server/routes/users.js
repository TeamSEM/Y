const express = require("express");
const {Users} = require("../models");
const jwt = require('jsonwebtoken');
const router = new express.Router();
const cors = require('cors');

const bcrypt = require('bcrypt');
const {sequelize} = require("sequelize")
//include middleware for parsing the body included into the request
router.use(express.json());
router.use(express.urlencoded({extended: true}))

const SALT_COUNT = 10;
const {JWT_SECRET} = process.env;

const setUser = async (req, res, next) => {
    /* handler logic*/
      try{
      const auth = req.header('Authorization');
          if(!auth) {
              next();
          } else {
          const [,token] = auth.split(' ');
          const user = jwt.verify(token, JWT_SECRET);
          req.user = user;
          next()
          }
      } catch({message}) {
          res.sendStatus(401);
          next({message})
      }
    }

// POST /register
// OPTIONAL - takes req.body of {username, password} and creates a new user with the hashed password
// POST /register
router.post('/register', setUser, async (req, res, next) => {

    try {
        const { username, password} = req.body;
        // create a new user
    
        const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
        const {id, user} = await Users.create({
        username: username,
        password: hashedPassword
        });
        const token = jwt.sign({id,username}, process.env.JWT_SECRET);
        console.log('token', token, user)
        res.send({message: 'success', token });
    } catch (error) {
        console.log(error, "you have an error");
        next(error);
    }
  });

  // POST /login
// OPTIONAL - takes req.body of {username, password}, finds user by username, and compares the password with the hashed version from the DB
router.post('/login', setUser, async (req, res, next) => {

    try {
        const { username, password } = req.body;
        const [foundUser] = await Users.findAll({
            where: {username}
        });
         if(!foundUser) {
            return 'Failed';
        }
        const comparePassword = await bcrypt.compare(password, foundUser.password);
        if(comparePassword) {
            const token = jwt.sign({id:foundUser.id,username:foundUser.username}, process.env.JWT_SECRET)
            res.send({message: 'success', token});
        } else {
            return res.sendStatus(401);
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
  
  })
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