const { connect, disconnect } = require('../config/db.config');
const { User } = require('../model/user.model');
const logger = require('../logger/api.logger');

class UserRepository {

    constructor() {
        connect();
    }

    async createUser(user) {
        let data = {};
        try {
            data = await User.create(user);
        } catch(err) {
            logger.error('Error::' + err);
        }
        return data;
    }

    async validateUser(user) {
        let res = false;
        try {
            const find = await User.findOne({password: user.password, email: user.email});
            if(find) res = find._id;
        } catch(err){
            logger.error('Error::' + err)
        }
        return res;
    }

}

module.exports = new UserRepository();