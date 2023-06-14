import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../state/authContext";
import drinks from "../../assets/Images/drinks.svg";
import "./NavLinks.css";

const NavLinks = (props) => {
	const { username, destination } = useContext(AuthContext);
	const navigate = useNavigate();
	const [topBurgerActive, setTopBurgerActive] = useState("");
	const [bottomBurgerActive, setBottomBurgerActive] = useState("");
	const [middleBurgerActive, setMiddleBurgerActive] = useState("");
	const [navBarActive, setNavBarActive] = useState("");

	const animateBurger = () => {
		if (topBurgerActive === "") {
			setTopBurgerActive("top-burger-active");
			setBottomBurgerActive("bottom-burger-active");
			setMiddleBurgerActive("middle-burger-active");
			setNavBarActive("nav-bar-active");
		} else {
			setTopBurgerActive("");
			setBottomBurgerActive("");
			setMiddleBurgerActive("");
			setNavBarActive("");
		}
	};

	const closeSlideout = () => {
		setNavBarActive("");
		setTopBurgerActive("");
		setBottomBurgerActive("");
		setMiddleBurgerActive("");
	};

	const handleClick = (e) => {
		if (e.target.text === "Catering") {
			navigate("/catering");
			setTopBurgerActive("");
			setBottomBurgerActive("");
			setMiddleBurgerActive("");
			setNavBarActive("");
		} else if (e.target.text === "Drinks/Recipes") {
			if (username) {
				navigate("/drinks");
				setTopBurgerActive("");
				setBottomBurgerActive("");
				setMiddleBurgerActive("");
				setNavBarActive("");
			} else {
				destination("/drinks");
				navigate("/login");
			}
		}
	};

	return (
		<div className="nav">
			<nav className={`nav-bar ` + navBarActive}>
				<a onClick={(e) => handleClick(e)}>Catering</a>
				<a onClick={(e) => handleClick(e)}>Drinks/Recipes</a>
			</nav>
			<span className="burger" onClick={animateBurger}>
				<div className={`burger-slice ` + topBurgerActive}></div>
				<div className={`burger-slice ` + middleBurgerActive}></div>
				<div className={`burger-slice ` + bottomBurgerActive}></div>
			</span>
			<div
				className={
					navBarActive === "nav-bar-active"
						? "nav-slideout slideout-active"
						: "nav-slideout"
				}
			>
				<span className="x-btn" onClick={closeSlideout}>
					&#10005;
				</span>
				<h1>
					Brewphoria
					<img src={drinks} />
				</h1>
				<nav>
					<a href="">Drinks</a>
					<a href="">Recipes</a>
					<a href="">Catering</a>
				</nav>
				<img className="logo-overlay" src={drinks} />
			</div>
		</div>
	);
};

export default NavLinks;
