const express = require('express')
const router = express.Router()
const { validation, ctrlWrapper } = require('../../middlewares')
const { contactSchema } = require('../../schemas')
const { contacts: ctrl } = require('../../controllers')

const validateMiddleware = validation(contactSchema)

router.get('/', ctrlWrapper(ctrl.listContacts))

router.get('/:id', ctrlWrapper(ctrl.getContactById))

router.post('/', validateMiddleware, ctrlWrapper(ctrl.addContact))

router.delete('/:id', ctrlWrapper(ctrl.removeContact))

router.put('/:id', validateMiddleware, ctrlWrapper(ctrl.updateContact))

module.exports = router
