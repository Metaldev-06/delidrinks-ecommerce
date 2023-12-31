export default ({ env }) => ({
  "strapi-chatgpt": {
    enabled: true,
  },

  upload: {
    config: {
      provider: "cloudinary",
      providerOptions: {
        cloud_name: env("CLOUDINARY_NAME"),
        api_key: env("CLOUDINARY_KEY"),
        api_secret: env("CLOUDINARY_SECRET"),
      },
      actionOptions: {
        upload: {},
        delete: {},
      },
    },
  },

  email: {
    config: {
      provider: 'sendgrid',
      providerOptions: {
        apiKey: env('SENDGRID_API_KEY'),
      },
      settings: {
        defaultFrom: env('SENDGRID_EMAIL'),
        defaultReplyTo: env('SENDGRID_EMAIL'),
        testAddress: env('SENDGRID_TEST_EMAIL'),
      },
    },
  },
});

