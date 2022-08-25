var express = require('express');
var router = express.Router();
const usersModel = require('../models/users-model');
const cors = require("cors");

router.use(cors())

router.get('/login/:id', async (req, res)=> {
const findID = await usersModel.findById({_id: req.params.id})
res.status(200).json(findID);
});

router.get('/login', async (req, res) =>{
const users = await usersModel.find(req.body)
res.status(200).json(users)
})

router.post('/login', async (req, res)=> {
const users = await usersModel.find();
const result = users.find(({username}) => username === req.body.username);
if(result){
var passwords = req.body.password;
if(passwords === req.body.password){
res.json(result._id);
}else{
  res.json("error");
}}else{
  res.json("error")}
});

router.post('/add', async (req, res)=> {
const user = await usersModel.find()
const resultUsername = user.find(({username})=> username === req.body.username);
if(!resultUsername){
const theUser= new usersModel({username:req.body.username, password:req.body.password, subscriber: req.body.subscriber});
await theUser.save();
res.status(200).json("created")
}else{
res.status(404).json("Username already exists")
}
});

router.put("/change", async (req,res)=>{
const {_id, subscriber} = req.body;
const user = await usersModel.findById({_id});
user.subscriber = subscriber;
await user.save();
res.json(user);
});

module.exports = router;
