const express = require('express')
const PostController = require('../controller/PostController')
const multer = require('multer')


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    const filename = file.fieldname + Date.now() + '-' + Math.round(Math.random() * 1E9)+ '.jpg'

    req.body.image_path = filename
    
    cb(null, filename)
  }
})

const upload = multer({ storage: storage })

const router = express.Router()

router.post('/add-post',upload.single('image'), PostController.addPost)
router.post('/add-like-unlike', PostController.likeUnlike)
router.get('/all-posts', PostController.getAllPost)
module.exports = router