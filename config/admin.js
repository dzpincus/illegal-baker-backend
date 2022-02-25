module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '08c70d9a4076dd23e580f2cfa42b9d9a'),
  },
});
