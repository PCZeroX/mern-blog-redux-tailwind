import { Link } from "react-router-dom";

const Profile = () => {
	const date = new Date();
	const today = new Intl.DateTimeFormat("en-US", {
		dateStyle: "full",
		timeStyle: "long",
	}).format(date);

	return (
		<section className="max-w-xl mx-auto space-y-4 md:space-y-8">
			<h1 className="text-4xl font-bold text-center">
				Welcome 🦄!
			</h1>

			<p className="text-center">{today}</p>

			<div className="flex items-center justify-center gap-8">
				<img
					src="/img/react.svg"
					alt="React"
					className="h-16 md:h-32 animate-spin-slow"
				/>
				<span className="text-4xl md:text-8xl font-bold">
					+
				</span>
				<img
					src="/img/redux.svg"
					alt="Redux"
					className="h-16 md:h-32 animate-pulse-slow"
				/>
			</div>

			<div className="flex flex-col md:flex-row justify-center gap-12">
				<div className="flex flex-col gap-4 items-center">
					<h2 className="text-center text-2xl font-medium">
						View List of
					</h2>
					<div className="space-x-4">
						<Link
							className="bg-blue-600 hover:bg-blue-800 rounded-full py-2 px-8 text-white duration-300"
							to="/users"
						>
							Users
						</Link>

						<Link
							className="bg-blue-600 hover:bg-blue-800 rounded-full py-2 px-8 text-white duration-300"
							to="/posts"
						>
							Posts
						</Link>
					</div>
				</div>

				<div className="flex flex-col gap-4 items-center">
					<h2 className="text-center text-2xl font-medium">
						Add a New
					</h2>
					<div className="space-x-4">
						<Link
							className="bg-blue-600 hover:bg-blue-800 rounded-full py-2 px-8 text-white duration-300"
							to="/users/new"
						>
							User
						</Link>

						<Link
							className="bg-blue-600 hover:bg-blue-800 rounded-full py-2 px-8 text-white duration-300"
							to="/posts/new"
						>
							Post
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Profile;
