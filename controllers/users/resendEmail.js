const { BadRequest } = require('http-errors')
const { User } = require('../../models')
const { sendEmail } = require('../../helpers')

const resendEmail = async (req, res) => {
  const { email } = req.body
  const user = await User.findOne({ email })
  if (!email) {
    throw new BadRequest('Missing required field email')
  }
  if (user.verify) {
    throw new BadRequest('Verification has already been passed')
  }
  await sendEmail()

  res.json({
    status: 'success',
    code: 200,
    message: 'Verification successful',
  })
}

module.exports = resendEmail