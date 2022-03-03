const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const normalize = require('normalize-url');
const config = require('../../config');
const User = require('../../models/User');
const Stack = require('../../models/Stack');

// @route    POST api/users/signUp
// @desc     Register user
// @access   Public
router.post(
  '/sendRequest',
  async (req, res) => {
    
    const { userPass, stackAmount } = req.body;
    console.log(req.body);
    try {
      let user = await User.findOne({ userPass });
      // console.log(user);
      const email = user.userEmail;
      var date = new Date();
      // console.log(date);
      let newDate = new Date(date.setDate(date.getDate() + 30)); 
      let stacksOfNow = await Stack.find({ $or: [ { 'waitStatus': 1 }, { 'waitStatus': 2 }, { 'waitStatus': 3 } ] });
      stack = new Stack({
        stackIndex: stacksOfNow.length + 1,
        userEmail: email,
        stackAmount: stackAmount,
        endDate : newDate,
        waitStatus : 2,
        newFlag: 0,
      });
      // console.log(stack);
      await stack.save();        

      res.json({msg:'success'});
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);
router.post(
  '/sendUnStackRequest',
  async (req, res) => {
    
    const { userPass } = req.body;
    try {
      let user = await User.findOne({ userPass });
      console.log(user);
      const email = user.userEmail;
      await Stack.updateOne({'userEmail':email},{$set:{'waitStatus':3}});
      res.json({msg:'success'});
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);
router.post(
  '/sendUnStackResponse',
  async (req, res) => {
    
    const { userPass } = req.body;
    try {
      let user = await User.findOne({ userPass });
      console.log(user);
      const email = user.userEmail;
      await Stack.updateOne({'userEmail':email},{$set:{'waitStatus':0}});
      res.json({msg:'success'});
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);
router.post(
  '/sendUnStackRejectResponse',
  async (req, res) => {
    
    const { userPass } = req.body;
    try {
      let user = await User.findOne({ userPass });
      console.log(user);
      const email = user.userEmail;
      await Stack.updateOne({'userEmail':email},{$set:{'waitStatus':2}});
      res.json({msg:'success'});
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);
router.post(
  '/changeNewFlag',
  async (req, res) => {
    
    const { id } = req.body;
    console.log(id);
    try {        
      let stacks = await Stack.updateOne({'_id':id},{$set:{'newFlag':true}});
      res.json({msg:'changeNewFlag'});
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

router.get(
  '/getStack',
  async (req, res) => {  
      try {
        let stacks = await Stack.find({ $or: [ { 'waitStatus': 1 }, { 'waitStatus': 2 }, { 'waitStatus': 3 } ] }).sort({ 'endDate': -1, 'newFlag': 1});        
        console.log(stacks);
        let nstacks = stacks.map((item) => {
          var current=Date.now()/1000; 
          var ms = Date.parse(item.endDate)/1000;
          if (current < ms && item.waitStatus !== 0) {          
            var reward = ((30 - (ms-current) / 60 / 60 / 24) * item.stackAmount * 0.01).toFixed(3);
          }
          console.log(reward)
          item = Object.assign({ reward: reward }, item);
          return item;
        })
        res.json({stack:nstacks});
      }
      catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
      }
  }
);

router.post(
  '/changeStatus',
  async (req, res) => {
      const { ids, changeStatus } = req.body;  
      try {  
        var date = new Date();
        console.log(date);
        let newDate = new Date(date.setDate(date.getDate() + 30)); 
        let stacks = await Stack.updateOne({'_id':ids},{$set:{'waitStatus':changeStatus, 'endDate':newDate}});        
        console.log(stacks);
        res.json({stack:stacks});
      }
      catch (err) {
        console.error("err-end", err.message);
        res.status(500).send('Server error');
      }
  }
);

router.post(
  '/getById',
  async (req, res) => {
      const { userPass } = req.body;  
      try {          
        user = await User.find({userPass});
        console.log(user[0].userEmail);
        stack = await Stack.find({userEmail: user[0].userEmail});
        var current=Date.now()/1000; 
        var ms = Date.parse(stack[0].endDate)/1000;
        if (current < ms && stack[0].waitStatus !== 0) {          
          var reward = ((30 - (ms-current) / 60 / 60 / 24) * stack[0].stackAmount * 0.01).toFixed(3);
          console.log(reward);
          res.json({stack:stack, reward:reward});
        }
        else
          res.json({msg:'noStack'});
      }
      catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
      }
  }
);

router.post(
  '/delete',
  async (req, res) => {
      const { userPass } = req.body;  
      try {          
        Stack.remove({}).then(res => {
          console.log('success delete')
        })
        res.json({msg:'delete success'});        
      }
      catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
      }
  }
);


module.exports = router;
