import useAuth from "../hooks/useAuth";

const Footer = () => {
	const { status, username } = useAuth();

	return (
		<footer className="bg-gradient-to-r from-gray-900 to-gray-800 border-t-gray-500/25 border-t col-span-4 h-14 flex justify-center items-center gap-4">
			{username && (
				<>
					<p className="text-center">
						Username:
						<span className="text-green-400">{` ${username}`}</span>
					</p>

					<span>|</span>
				</>
			)}
			<a
				className="text-center"
				href="https://reactjs.org/"
				target="_blank"
				rel="noopener noreferrer"
			>
				Powered by React - {new Date().getFullYear()}
			</a>

			{status && (
				<>
					<span>|</span>

					<p className="text-center">
						Status:
						<span className="text-green-400">{` ${status}`}</span>
					</p>
				</>
			)}
		</footer>
	);
};

export default Footer;
