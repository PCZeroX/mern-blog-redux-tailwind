const Footer = () => {
	return (
		<footer className="bg-gradient-to-r from-gray-900 to-gray-800 border-t-gray-500/25 border-t col-span-4 h-14 flex justify-center">
			<a
				className="flex items-center gap-2"
				href="https://reactjs.org/"
				target="_blank"
				rel="noopener noreferrer"
			>
				Powered by React - {new Date().getFullYear()}
			</a>
		</footer>
	);
};

export default Footer;
