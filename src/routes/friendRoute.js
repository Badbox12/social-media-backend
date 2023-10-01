const express = require('express')
const FriendController = require('../controller/FriendController')

const router = express.Router()


router.post('/add-un-friend', FriendController.addUnFriend)
router.get('/get-friend-not-friend/:id', FriendController.getAllFriendAndNotFriend)
module.exports = router