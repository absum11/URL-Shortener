const mongoose = require("mongoose");

//schema for user collection
const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
		trim: true
	},
	password: { type: String, required: true },
	createdAt: { type: Date, default: Date.now }
});

// schema for urls collection
const urlSchema = new mongoose.Schema({
	shortId: { type: String, required: true, unique: true },
	longUrl: { type: String, required: true },
	userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model("User", userSchema);
const UrlStore = mongoose.model("UrlStore", urlSchema);

module.exports = { UrlStore, User };
