import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
	static init(sequelize) {
		super.init({
			group_id: Sequelize.INTEGER,
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

		return this;
	}

	static associate(models) {
		this.belongsToMany(models.Group, { foreignKey: 'group_id', as: 'group' });
	}

	checkPassword(password) {
		return bcrypt.compare(password, this.password_hash);
	}
}

export default User;