const express = require('express')

const { validation, upload, ctrlWrapper, auth } = require('../../middlewares')
const { users: ctrl } = require('../../controllers')
const { joiSignupSchema, joiLoginSchema } = require('../../models/user')

const router = express.Router()
// Registration route - POST

router.post('/signup', validation(joiSignupSchema), ctrlWrapper(ctrl.signup))
router.post('/login', validation(joiLoginSchema), ctrlWrapper(ctrl.login))
router.get('/current', auth, ctrlWrapper(ctrl.getCurrent))
router.get('/logout', auth, ctrlWrapper(ctrl.logout))
router.patch('/avatars', auth, upload.single('avatar'), ctrlWrapper(ctrl.updateAvatar))

module.exports = router