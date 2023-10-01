const express = require('express')
const AuthController = require('../controller/AuthController')
const multer = require('multer')
const authMiddleware = require('../middleware/authMiddleware')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    const filename = file.fieldname + Date.now() + '-' + Math.round(Math.random() * 1E9)+ '.jpg'
    req.body.profile_picture_path = filename
    cb(null, filename)
  }
})

const upload = multer({ storage: storage })

const router = express.Router()

router.post('/register',upload.single('image'), AuthController.register)
router.post('/login', AuthController.login)
router.get('/check-auth',authMiddleware ,AuthController.checkAuth)

module.exports = router