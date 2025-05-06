import React from "react";
import ShortenForm from "../components/ShortenForm";
import { Link } from "react-router-dom";

const Home = () => {
	return (
		<div className="min-h-screen bg-gray-100 p-6">
			{/* Top-right auth links */}
			<div className="absolute top-4 right-4 flex space-x-4">
				<Link
					to="/register"
					className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
				>
					Register
				</Link>
				<Link
					to="/login"
					className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
				>
					Login
				</Link>
			</div>

			{/* Centered shorten form */}
			<div className="flex justify-center items-center min-h-[70vh]">
				<ShortenForm />
			</div>
		</div>
	);
};

export default Home;
