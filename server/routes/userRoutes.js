const express = require('express')
const router = express.Router()
const passport = require('passport')


const { userLogin, userRegister } = require('../controller/userController')
    
const {addData, getData, updateData, deleteData} = require('../controller/dataController')


//USER REGISTER
router.post('/register', userRegister)

// USER LOGIN
router.post('/login', userLogin)   

//ADD DATA
router.post('/data', passport.authenticate('jwt', { session: false }), addData)

//GET ALL ADDED USER
router.get('/data', passport.authenticate('jwt', { session: false }), getData)

//UPDATE ADDED USER
router.put('/data/:id', passport.authenticate('jwt', { session: false }), updateData)

//DELETE ADDED USER
router.delete('/data/:id', passport.authenticate('jwt', { session: false }), deleteData)


module.exports = router