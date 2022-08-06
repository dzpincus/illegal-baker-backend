module.exports = ({ env }) => ({
  upload: {
    config: {
      provider: 'cloudinary',
      providerOptions: {
        cloud_name: env('CLOUDINARY_NAME'),
        api_key: env('CLOUDINARY_KEY'),
        api_secret: env('CLOUDINARY_SECRET'),
      },
      actionOptions: {
        upload: {},
        delete: {},
      },
    },
  },
  email: {
    config: {
      provider: 'gmail-api',
      providerOptions: {
        auth: {
          userId: env('EMAIL_OAUTH2_USERID'),
          clientId: env('EMAIL_OAUTH2_CLIENTID'),
          clientSecret: env('EMAIL_OAUTH2_CLIENTSECRET'),
          refreshToken: env('EMAIL_OAUTH2_REFRESHTOKEN'),
        },
      },
      settings: {
        defaultFrom: env('EMAIL_FROM'),
        defaultReplyTo: env('EMAIL_REPLYTO'),
        testAddress: env('EMAIL_TEST_ADDRESS'),
      },
    },
  }
});