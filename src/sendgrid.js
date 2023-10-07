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

    const msg = {
        to: user.email,
        from: 'hodurbalder@gmail.com',
        templateId: Config.sendgrid.templates.resetPassword,
        dynamic_template_data: {
            name: user.name,
            code: user.codeResetPassword,
        }
    }

    await sendEmail(msg)
    console.log(msg)
    return `email send to: ${user.email}`
}
