const { Sequelize, Model } = require('sequelize');
const bcrypt = require('bcryptjs');

class User extends Model {
	static init(sequelize) {
		super.init({
			name: Sequelize.STRING,
			age: Sequelize.INTEGER,
			initial_year: Sequelize.INTEGER,
			university: Sequelize.STRING,
			course: Sequelize.STRING,
			gender: Sequelize.STRING,
			shift: Sequelize.ENUM("Matutino", "Noturno"),
			bio: Sequelize.TEXT,
			search_for: Sequelize.STRING,
			email: Sequelize.STRING,
			password: Sequelize.VIRTUAL,
			password_hash: Sequelize.STRING,
			image_url: Sequelize.STRING
		},
			{
				sequelize,
			}
		);

		this.addHook('beforeSave', async (user) => {
			if (user.password) {
				user.password_hash = await bcrypt.hash(user.password, 8);
			}
		});

		this.tableName = "users";
		return this;
	}

	static associate(models) {
		this.belongsToMany(models.Group,
			{ foreignKey: 'user_id', through: 'users-groups', as: 'groups' });
		this.belongsToMany(models.Event,
			{ foreignKey: 'user_id', through: 'users-events', as: 'events' });
	}

	checkPassword(password) {
		return bcrypt.compare(password, this.password_hash);
	}
}

module.exports = User;