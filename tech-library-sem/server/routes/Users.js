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
            id: req.params.id
        }
    })
})
// delete a user from the db
router.delete('/:id', async (req,res)=>{
    await Users.destroy({
        where:{
            id: req.params.id
        }
    });
    res.json(await Users.findAll());
 })

 // User add entries
router.post("/", async (req,res) => {

    console.log('added item', req.body )
    const itemtoAdd = await Items.create(req.body);
    res.json(await Users.findAll());
    })

    // Keeing track of authorized users and their data

    const authorizedUsers = [
    { username: 'user1', password: 'password1', level: 1 },
    { username: 'user2', password: 'password2', level: 2 },
    
    // Populate with / add more authorized users as needed
    ];
    
    // Middleware is here checking if a user is authorized to access the API
    const authorizeUser = (req, res, next) => {
    const { username, password } = req.headers;
    
    // Checking to make sure the user is authorized

    const authorizedUser = authorizedUsers.find(user => user.username === username && user.password === password);
    
    if (!authorizedUser) {
    
    // If the user is not authorized, send a 401 error with message

    res.status(401).json({ error: 'You are not authorized to access this API.' });
    } else {
    
    // If the user is authorized, store their authorization level in the request object and proceed to the next middleware
    
    req.userLevel = authorizedUser.level;
    next();
    }
    };
module.exports = router;