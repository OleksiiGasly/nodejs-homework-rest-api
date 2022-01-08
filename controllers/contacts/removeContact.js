const contactsOperations = require('../../model/contacts/index')
const { NotFound } = require('http-errors')

const removeContact = async (req, res, next) => {
  const { id } = req.params
  const result = await contactsOperations.removeContact(id)
  if (!result) {
    throw new NotFound(`Contact with id = ${id} not found`)
  }
  res.json({
    status: 'success',
    code: 200,
    message: 'Contact deleted',
    data: {
      result
    }
  })
}
module.exports = removeContact
