const fs = require('fs/promises')
const { v4 } = require('uuid')
const contactsPath = require('./contactsPath')
const listContacts = require('./listContacts')

const addContact = async(data) => {
  const contacts = await listContacts()
  const newContact = { id: v4(), ...data }
  contacts.push(newContact)
  await fs.writeFile(contactsPath, JSON.stringify(contacts))
  return newContact
}

module.exports = addContact
