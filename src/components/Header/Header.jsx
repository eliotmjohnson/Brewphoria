import classes from "./Header.module.css";
import { useContext } from "react";
import accountLogo from "../../assets/Images/icons8-account-80.png";
import logo from "../../assets/Images/drinks.svg";
import AuthContext from "../../state/authContext";
import { useNavigate } from "react-router-dom";
import NavLinks from "./NavLinks";

const Header = (props) => {
	const { firstName, lastName, username, destination, logout } =
		useContext(AuthContext);
	const navigate = useNavigate();

	const headerClick = () => {
		navigate("/");
	};

	const goToAccount = () => {
		if (username) {
			logout();
			navigate("/");
		} else {
			destination("/");
			navigate("/login");
		}
	};

	return (
		<header className={classes.header}>
			<h1 onClick={headerClick}>
				Brewphoria
				<img className={classes["header-logo"]} src={logo}></img>
			</h1>
			<img className={classes.logo} src={logo}></img>
			<NavLinks onClick={headerClick} />
			<div className={classes["logo-container"]} onClick={goToAccount}>
				<img id={classes["account-logo"]} src={accountLogo} />
				<h4>{username ? `${firstName} ${lastName}` : "Sign In"}</h4>
			</div>
		</header>
	);
};

export default Header;
