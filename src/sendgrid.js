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
        from: 'eventos@grupoamasb.mx',
        templateId: Config.sendgrid.templates.resetPassword,
        dynamic_template_data: {
            name: user.name,
            code: user.codeResetPassword,
        }
    }

    const data = await sendEmail(msg)
    console.log(msg, data)
    return `email send to: ${user.email}`
}
