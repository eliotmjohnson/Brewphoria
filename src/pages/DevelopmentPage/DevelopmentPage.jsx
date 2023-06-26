import classes from "./DevelopmentPage.module.css";
import logo from "../../assets/Images/drinks.svg";

const DevelopmentPage = () => {
	return (
		<main className={classes.DevelopmentPage}>
			<section>
				<div className={classes.title}>
					<h1>Brewphoria</h1>
					<img src={logo} />
				</div>
				<div className={classes.content}>
					<h2>iPad and mobile development is currently in progress</h2>
					<p>
						Please use a larger screen size or request the desktop website to
						explore Brewphoria
					</p>
				</div>
			</section>
		</main>
	);
};

export default DevelopmentPage;
