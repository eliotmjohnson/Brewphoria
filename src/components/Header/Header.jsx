import classes from "./Header.module.css";
import { useContext } from "react";
import accountLogo from "../../assets/Images/icons8-account-80.png";
import logo from "../../assets/Images/drinks.svg";
import AuthContext from "../../state/authContext";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import NavLinks from "./NavLinks";
import HiddenHeader from "./HiddenHeader/HiddenHeader";
import { useSelector } from "react-redux";

const Header = () => {
	const cartState = useSelector((state) => state.cart.cartOpen);
	const [ref, inView] = useInView({
		threshold: 0.2,
		initialInView: true,
	});
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
		<header className={classes.header} ref={ref}>
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
			<HiddenHeader
				inView={inView}
				activeClass={inView | cartState ? "" : "header-active"}
			/>
		</header>
	);
};

export default Header;
