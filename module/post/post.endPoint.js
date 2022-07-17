const { roles } = require("../../middlewear/auth");

const endpoint = {
   home : [roles.User ,roles.Admin ] 
}

module.exports = 
    endpoint
