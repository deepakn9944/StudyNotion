const emailValidator = require('deep-email-validator');

const isEmailValid = async(email) => {
  return emailValidator.validate(email)
}

module.exports = isEmailValid;