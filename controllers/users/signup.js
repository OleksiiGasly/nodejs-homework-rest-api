const { Conflict } = require('http-errors')
const gravatar = require('gravatar')
const { nanoid } = require('nanoid')
const { sendEmail } = require('../../helpers')
const { User } = require('../../models')

const signup = async (req, res) => {
  const { password, email, subscription } = req.body
  const user = await User.findOne({ email })
  if (user) {
    throw new Conflict(`User with ${email} already exists`)
  }
  const verificationToken = nanoid()
  const avatarURL = gravatar.url(email)
  const newUser = new User({ email, avatarURL, verificationToken })
  newUser.setPassword(password)
  await newUser.save()
  const mail = {
    to: email,
    subject: 'Email conformation',
    html: `<a target = '_blank' href = 'http://localhost:300/api/users/verify/${verificationToken}'>Confirm email</a>`
  }
  await sendEmail(mail)
  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      user: {
        email,
        password,
        avatarURL,
        verificationToken
      }
    }
  })
}

module.exports = signup