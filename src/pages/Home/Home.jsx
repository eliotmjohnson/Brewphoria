import classes from "./Home.module.css";
import drinkOne from "../../assets/Images/paige-ledford-qhfe60zL8-Q-unsplash.jpg";
import drinkTwo from "../../assets/Images/kim-daniels-p6XuDW03YjE-unsplash.jpg";
import drinkThree from "../../assets/Images/adam-jaime-dmkmrNptMpw-unsplash.jpg";
import CateringAd from "../../components/CateringAd/CateringAd";
import AuthContext from "../../state/authContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
	const navigate = useNavigate();
	const { username, destination } = useContext(AuthContext);

	const cateringButton = () => {
		navigate("/catering");
	};

	const craftButton = () => {
		if (username) {
			navigate("/drinks");
		} else {
			navigate("/catering");
		}
	};

	const drinksButton = () => {
		if (username) {
			navigate("/drinks");
		} else {
			destination("/drinks");
			navigate("/login");
		}
	};

	return (
		<main className={classes.Home}>
			<CateringAd
				image={drinkOne}
				text={{
					p: "Drink Catering",
					h1: "just got a whole lot",
					strong: "cooler",
				}}
				buttonStyles={{
					zIndex: "1",
					translate: "-30rem -28rem",
				}}
				textStyles={{}}
				buttonText="Learn More"
				buttonClick={cateringButton}
			/>
			<CateringAd
				style={{ backgroundColor: "aliceblue" }}
				image={drinkTwo}
				text={{
					p: "Cocktail Recipes",
					h1: "that will leave you in",
					strong: "ecstasy",
				}}
				buttonStyles={{
					zIndex: "1",
					translate: "28rem -22rem",
					boxShadow: "0rem .1rem .6rem 0 gray",
				}}
				textStyles={{
					h1Style: { color: "black", textShadow: "0 0 .8rem black" },
					divStyle: { rotate: "0deg", translate: "0 3rem" },
					pStyle: { marginBottom: ".5rem" },
				}}
				buttonText="See More"
				buttonClick={drinksButton}
			/>
			<CateringAd
				style={{ backgroundColor: "#12161f" }}
				image={drinkThree}
				text={{
					p: "Craft",
					h1: "your catering order",
					strong: "today",
				}}
				buttonStyles={{
					zIndex: "1",
					translate: "-20rem -33rem",
					boxShadow: "0rem .1rem .6rem 0 gray",
				}}
				textStyles={{
					divStyle: { rotate: "0deg", translate: "-20rem 3rem" },
					pStyle: { marginBottom: "1rem" },
				}}
				buttonText="Get Started"
				buttonClick={craftButton}
			/>
		</main>
	);
};

export default Home;
