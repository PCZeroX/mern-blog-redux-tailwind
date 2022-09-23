import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

const Layout = () => {
	return (
		<div className="grid grid-cols-3 grid-rows-[min-content_auto_min-content] min-h-screen">
			<Header />
			<main className="col-span-4 self-center place-self-center w-full max-w-7xl py-8">
				<div className="mx-4 xl:mx-auto">
					<Outlet />
				</div>
			</main>
			<Footer />
		</div>
	);
};
export default Layout;
