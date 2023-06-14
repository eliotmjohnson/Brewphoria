import "./reset.css";
import "./App.css";
import { AuthContextProvider } from "../state/authContext";
import { Provider } from "react-redux";
import store from "../state/store";
import {
	createBrowserRouter,
	RouterProvider,
	Outlet,
	ScrollRestoration,
} from "react-router-dom";
import Header from "../components/Header/Header";
import Home from "../pages/Home/Home";
import Catering from "../pages/Catering/Catering";
import Login from "../pages/Login/Login";
import DrinksPage from "../pages/DrinksPage/DrinksPage";

const router = createBrowserRouter([
	{
		path: "/",
		element: (
			<>
				<Header />
				<Outlet />
				<ScrollRestoration
					getKey={(location, matches) => {
						return location.pathname;
					}}
				/>
			</>
		),
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: "/catering",
				element: <Catering />,
			},
			{
				path: "/drinks",
				element: <DrinksPage />,
			},
			{
				path: "*",
				element: <Home />,
			},
		],
	},
	{
		path: "/login",
		element: <Login />,
	},
]);

const App = () => {
	return (
		<AuthContextProvider>
			<Provider store={store}>
				<RouterProvider router={router} />
			</Provider>
		</AuthContextProvider>
	);
};

export default App;
