const Methods = require('./methods')
const Config = require('./config')
const SGMail = require('@sendgrid/mail')

SGMail.setApiKey(Config.sendgrid.key)

module.exports = {
    sendEmail,
    sendEmailResetPassword
}

async function sendEmail(msg) {
    try {
        return await SGMail.send(msg);
    } catch (error) {
        console.error(error);
    }
}

async function sendEmailResetPassword(user) {

    const today = new Date().toISOString()
    const token = Methods.stringCryptr(`${user._id} ${today}`, Config.sendgrid.saltResetPassword)
    const token2 = Methods.stringCryptr(user._id, Config.saltDecryptToken) 

    const msg = {
        to: user.email,
        from: 'hodurbalder@gmail.com',
        templateId: Config.sendgrid.templates.resetPassword,
        dynamic_template_data: {
            name: user.name,
            urlResetPassword: `https://pasaporte-digital-front-28b8cb7afdd5.herokuapp.com/resetPasword/${token}`,
            token2
        }
    }

    await sendEmail(msg)
    console.log(msg)
    return `email send to: ${user.email}`
}
