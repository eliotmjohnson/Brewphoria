import classes from "./HiddenHeader.module.css";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import accountLogo from "../../../assets/Images/icons8-account-80.png";
import logo from "../../../assets/Images/drinks.svg";
import AuthContext from "../../../state/authContext";
import NavLinks from "../NavLinks";

const HiddenHeader = ({ activeClass, inView }) => {
	const { firstName, lastName, username, destination, logout } =
		useContext(AuthContext);
	const navigate = useNavigate();

	const headerClick = () => {
		navigate("/");
	};

	const goToAccount = () => {
		if (username) {
			navigate(`/account/${username}/profile`);
		} else {
			destination("/");
			navigate("/login");
		}
	};

	return (
		<header className={`${classes.HiddenHeader} ${classes[activeClass]}`}>
			<h1 onClick={headerClick}>
				Brewphoria
				<img className={classes["header-logo"]} src={logo}></img>
			</h1>
			<img className={classes.logo} src={logo}></img>
			<NavLinks onClick={headerClick} inView={inView} />
			<div className={classes["logo-container"]} onClick={goToAccount}>
				<img id={classes["account-logo"]} src={accountLogo} />
				<h4>{username ? `${firstName} ${lastName}` : "Sign In"}</h4>
			</div>
		</header>
	);
};

export default HiddenHeader;
