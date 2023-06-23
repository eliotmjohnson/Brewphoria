import { useState, useEffect, createContext } from "react";
import axios from "axios";

let logoutTimer;

const AuthContext = createContext({
	token: "",
	userId: null,
	username: "",
	firstName: "",
	lastName: "",
	login: () => {},
	logout: () => {},
	destination: () => {},
});

export const AuthContextProvider = (props) => {
	const [token, setToken] = useState("");
	const [userId, setUserId] = useState();
	const [username, setUsername] = useState();
	const [firstName, setFirstName] = useState();
	const [lastName, setLastName] = useState();
	const [page, setPage] = useState("/");

	const getLocalData = async () => {
		const storedToken = localStorage.getItem("token");
		let id;
		let exp;
		let username;
		let firstName;
		let lastName;

		if (storedToken) {
			await axios
				.post("/getData", { storedToken })
				.then((res) => {
					id = res.data.id;
					exp = res.data.exp;
					username = res.data.username;
					firstName = res.data.firstName;
					lastName = res.data.lastName;
				})
				.catch((error) => console.log(error));

			const remainingTime = calculateRemainingTime(exp);

			if (isNaN(remainingTime)) {
				localStorage.removeItem("token");
				return null;
			}

			logoutTimer = setTimeout(logout, remainingTime);

			setToken(storedToken);
			setUserId(id);
			setUsername(username);
			setFirstName(firstName);
			setLastName(lastName);
		} else {
			setToken((prev) => undefined);
		}
	};

	const calculateRemainingTime = (exp) => {
		const currentTime = new Date().getTime();
		const expTime = exp * 1000;
		const remainingTime = expTime - currentTime;
		return remainingTime;
	};

	useEffect(() => {
		getLocalData();
	}, []);

	const logout = () => {
		setToken(null);
		setUserId(null);
		setUsername(null);
		setFirstName(null);
		setLastName(null);
		localStorage.removeItem("token");
		if (logoutTimer) {
			clearTimeout(logoutTimer);
		}
	};

	const login = (token, userId, username, firstName, lastName, exp) => {
		setToken(token);
		setUserId(userId);
		setUsername(username);
		setFirstName(firstName);
		setLastName(lastName);
		localStorage.setItem("token", token);

		const remainingTime = calculateRemainingTime(exp / 1000);

		logoutTimer = setTimeout(logout, remainingTime);
	};

	const destination = (page) => {
		setPage((prev) => page);
	};

	const contextValue = {
		token,
		userId,
		username,
		firstName,
		lastName,
		login,
		logout,
		destination,
		page,
	};

	return (
		<AuthContext.Provider value={contextValue}>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
