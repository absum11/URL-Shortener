const {User} = require("../database/mongodb/url-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config");

const newUserService = async (email, password) => {
	if (!email || !password) throw new Error("both fields required");

	const existingUser = await User.findOne({ email });
	if (existingUser) throw new Error("user already exists");

	//hash password and store user creds
	const hashedPass = await bcrypt.hash(password, 10);
	return await User.create({ email, password : hashedPass });
};

const loginService = async (email, password) => {
	if (!email || !password) throw new Error("both fields required");

	const user = await User.findOne({ email });
	if (!user) throw new Error("user not found");

	const matchPassword = await bcrypt.compare(password, user.password);
	if (!matchPassword) throw new Error("invalid creds");

	const token = jwt.sign(
		{ userId: user._id, email: user.email },
		config.server.jwt.secret,
		{ expiresIn: "1d" }
	);
	return { user, token };
};

module.exports = { newUserService, loginService };
