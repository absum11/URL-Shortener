const {newUserService, loginService} = require("../services/user.service")
const newUserController = async (req, res) => {
	try {
		const { email, password } = req.body;
		await newUserService(email, password);
		res.status(201).json({
			msg: "successfully registered"
		});
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

const loginController = async (req, res) => {
	try {
		const { email, password } = req.body;

		const { user, token } = await loginService(email, password);

		// Send token in HTTP-only cookie
		res.cookie("authToken", token, {
			httpOnly: true, // XSS safe, not js accessible
			sameSite: "strict",
			maxAge: 24 * 60 * 60 * 1000 // 1 day
		});

		res.status(200).json({ message: "Login successful", userId: user._id });
	} catch (err) {
		res.status(401).json({ error: err.message });
	}
};

module.exports = { newUserController, loginController };
