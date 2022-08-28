const userService  = require('../service/user.service');
const logger = require('../logger/api.logger');

class AuthController {

    async createUser(user) {
        logger.info('Auth Controller: createUser');
        return await userService.createUser(user);
    }

    async validateUser(user) {
        logger.info('Auth Controller: validateUser');
        return await userService.validateUser(user);
    }
}
module.exports = new AuthController();