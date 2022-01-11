const { Conflict } = require('http-errors')
const gravatar = require('gravatar')
const { User } = require('../../models')
// const bcrypt = require('bcryptjs')

const signup = async (req, res) => {
  const { password, email, subscription } = req.body
  const user = await User.findOne({ email })
  if (user) {
    throw new Conflict(`User with ${email} already exists`)
  }
  const avatarURL = gravatar.url(email)
  const newUser = new User({ email, avatarURL })
  newUser.setPassword(password)
  newUser.save()
  //   const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
  //   const result = await User.create({ password: hashPassword, email, subscription })
  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      user: {
        email,
        password,
        avatarURL
      }
    }
  })
}

module.exports = signup