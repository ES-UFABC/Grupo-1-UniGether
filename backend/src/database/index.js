import { Sequelize } from 'sequelize';
import databaseConfig from '../config/database';
import User from '../app/models/Users';
import Group from '../app/models/Groups';
import Swipe from '../app/models/Swipes';

const models = [User, Group, Swipe];

class Database {
    constructor() {
        this.init();
    }

    init() {
        this.connection = new Sequelize(databaseConfig);

        models.map(model => model.init(this.connection))
            .map(model => model.associate && model.associate(this.connection.models));

    }
}

export default new Database();  