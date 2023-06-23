require("dotenv").config();
const { SECRET } = process.env;

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { User } = require("../models/user");

const createToken = (id, username, firstName, lastName) => {
	return jwt.sign({ id, username, firstName, lastName }, SECRET, {
		expiresIn: "1 day",
	});
};

module.exports = {
	register: async (req, res) => {
		try {
			const { username, password, firstName, lastName } = req.body;

			const foundUser = await User.findOne({ where: { username } });

			if (foundUser) {
				res.status(400).send("Username already exists");
			} else {
				const salt = bcrypt.genSaltSync(10);
				const hash = bcrypt.hashSync(password, salt);

				const newUser = await User.create({
					first_name: firstName,
					last_name: lastName,
					username: username,
					hashed_password: hash,
				});

				await newUser.createCart();
				await newUser.createFavoritesList();

				const token = createToken(newUser.id, username, firstName, lastName);

				const exp = Date.now() + 1000 * 60 * 60 * 24;

				res.status(200).send({
					userId: newUser.id,
					username: newUser.username,
					firstName: newUser["first_name"],
					lastName: newUser["last_name"],
					token,
					exp,
				});
			}
		} catch (error) {
			console.log(error);
			res.status(400).send("Failed to register user");
		}
	},

	login: async (req, res) => {
		try {
			const { username, password } = req.body;

			const foundUser = await User.findOne({ where: { username } });

			if (foundUser) {
				const isAuthenticated = bcrypt.compareSync(
					password,
					foundUser["hashed_password"]
				);

				if (isAuthenticated) {
					const token = createToken(
						foundUser.id,
						foundUser.username,
						foundUser["first_name"],
						foundUser["last_name"]
					);

					const exp = Date.now() + 1000 * 60 * 60 * 24;

					res.status(200).send({
						userId: foundUser.id,
						username: foundUser.username,
						firstName: foundUser["first_name"],
						lastName: foundUser["last_name"],
						token,
						exp,
					});
				} else {
					res.status(400).send("User name or password incorrect");
				}
			} else {
				res.status(400).send("User name or password incorrect");
			}
		} catch (error) {
			res.status(500).send("Login system is having some issues");
		}
	},

	updatePassword: async (req, res) => {
		try {
			const { oldPassword, newPassword } = req.body;
			const { id } = req.params;

			const user = await User.findOne({
				where: {
					id: +id,
				},
			});

			if (user) {
				const passwordMatch = bcrypt.compareSync(
					oldPassword,
					user.hashed_password
				);

				const newPassMatch = bcrypt.compareSync(
					newPassword,
					user.hashed_password
				);

				if (!passwordMatch) {
					return res.status(400).send("Old Password Doesn't Match");
				}

				if (newPassMatch) {
					return res
						.status(400)
						.send("New password can't be the same as old password");
				}

				if (passwordMatch) {
					const salt = bcrypt.genSaltSync(10);
					const hash = bcrypt.hashSync(newPassword, salt);

					await user.update({
						hashed_password: hash,
					});

					res.status(200).send("Updated!!");
				} else {
					res.status(400).send("Old Password Doesn't Match");
				}
			}
		} catch (error) {
			res.status(400).send("Something went wrong!");
		}
	},

	getTokenData: (req, res) => {
		const token = req.body.storedToken;
		const data = jwt.verify(token, SECRET);
		res.status(200).send(data);
	},

	deleteAccount: async (req, res) => {
		const { id } = req.params;

		const user = await User.findOne({
			where: {
				id: id,
			},
		});

		await user.destroy();

		res.sendStatus(200);
	},
};
