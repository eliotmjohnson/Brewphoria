require("dotenv").config();
const { SECRET } = process.env;

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { Users } = require("../models/users");

const createToken = (id, username, firstName, lastName) => {
	return jwt.sign({ id, username, firstName, lastName }, SECRET, {
		expiresIn: "1 day",
	});
};

module.exports = {
	register: async (req, res) => {
		try {
			const { username, password, firstName, lastName } = req.body;

			const foundUser = await Users.findOne({ where: { username } });

			if (foundUser) {
				res.status(400).send("Username already exists");
			} else {
				const salt = bcrypt.genSaltSync(10);
				const hash = bcrypt.hashSync(password, salt);

				const newUser = await Users.create({
					first_name: firstName,
					last_name: lastName,
					username: username,
					hashed_password: hash,
				});

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

			const foundUser = await Users.findOne({ where: { username } });

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
			console.log(error);
			res.status(500).send("Login system is having some issues");
		}
	},

	getTokenData: (req, res) => {
		const token = req.body.storedToken;
		const data = jwt.verify(token, SECRET);
		res.status(200).send(data);
	},
};
