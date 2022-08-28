const userRepository  = require('../repository/user.repository');

class UserService {

    constructor() {}

    async createUser(user) {
        return await userRepository.createUser(user);
    }

    async validateUser(user) {
        return await userRepository.validateUser(user);
    } 

}

module.exports = new UserService();