import { Link } from "react-router-dom";

const Header = () => {
	return (
		<header className="bg-gradient-to-r from-gray-900 to-gray-800 border-b-gray-500/25 border-b sticky top-0 z-10 col-span-4">
			<div className="max-w-7xl mx-auto">
				<nav
					className={`flex justify-between items-center h-14 mx-4 xl:mx-0`}
				>
					<Link to="/">
						<img
							src="/img/react.svg"
							alt="React"
							className="h-8"
						/>
					</Link>

					<ul className="flex gap-4">
						<li>
							<Link
								className="hover:text-cyan-400 duration-300"
								to="/login"
							>
								Sign In
							</Link>
						</li>
					</ul>

					<Link to="/">
						<img
							src="/img/Redux.svg"
							alt="Redux"
							className="h-8"
						/>
					</Link>
				</nav>
			</div>
		</header>
	);
};

export default Header;
