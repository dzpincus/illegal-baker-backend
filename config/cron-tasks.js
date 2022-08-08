var http = require("http");
module.exports = {
  '*/30 * * * *': ({ strapi }) => {
    console.log('alive')
    http.get("http://illegal-baker-backend.herokuapp.com/api/images")
  }
}