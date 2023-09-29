require('dotenv').config()

module.exports = {
    mongodb: process.env.MONGODB,
    host: process.env.HOST,
    port: process.env.PORT,
    brand: process.env.BRAND,
    salt: process.env.SALT,
    cron: process.env.CRON === 'true',
    app: process.env.APP,

    bucket: {
        name: process.env.GOOGLE_STORAGE_NAME,
        type: process.env.GOOGLE_STORAGE_TYPE,
        project_id: process.env.GOOGLE_STORAGE_PROJECT_ID,
        private_key_id: process.env.GOOGLE_STORAGE_PRIVATE_KEY_ID,
        private_key: process.env.GOOGLE_STORAGE_PRIVATE_KEY,
        client_email: process.env.GOOGLE_STORAGE_CLIENT_EMAIL,
        client_id: process.env.GOOGLE_STORAGE_CLIENT_ID,
        auth_uri: process.env.GOOGLE_STORAGE_AUTH_URI,
        token_uri: process.env.GOOGLE_STORAGE_TOKEN_URI,
        auth_provider_x509_cert_url: process.env.GOOGLE_STORAGE_AUTH_PROVIDER_X509_CERT_URL,
        client_x509_cert_url: process.env.GOOGLE_STORAGE_CLIENT_X509_CERT_URL,
    },
}