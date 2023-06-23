import classes from "./Catering.module.css";
import drinkBg from "../../assets/Images/stanislav-ivanitskiy-j5SwUbcgeyA-unsplash.jpg";
import expBg from "../../assets/Images/richard-horvath-is8jWT-mvng-unsplash.jpg";
import secondBg from "../../assets/Images/johann-trasch-b-3uxA93zUc-unsplash.jpg";
import AuthContext from "../../state/authContext";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";
import { useRef, useContext } from "react";

const Catering = () => {
	const { userId, token, destination } = useContext(AuthContext);
	const navigate = useNavigate();
	const expRef = useRef();
	const [titleRef, inView] = useInView({
		threshold: 0.3,
		triggerOnce: true,
	});
	const [titleRefTwo, inViewTwo] = useInView({
		threshold: 0.3,
		triggerOnce: true,
	});
	const [titleRefThree, inViewThree] = useInView({
		threshold: 0.3,
		triggerOnce: true,
	});

	const scrollDown = () => {
		expRef.current.scrollIntoView({
			behavior: "smooth",
			block: "center",
		});
	};

	const goToDrinks = () => {
		if (userId && token) {
			navigate("/drinks");
		} else {
			destination("/drinks");
			navigate("/login");
		}
	};

	return (
		<main className={classes.Catering}>
			<div ref={titleRef} className={classes["title-block"]}>
				<div
					className={`${classes["background-container"]} ${
						inView ? classes["title-active"] : undefined
					}`}
				>
					<div className={classes.blackGradient}></div>
					<img className={classes.background} src={drinkBg} />
				</div>
				<h1
					className={`${classes.title} ${
						inView ? classes["title-active"] : undefined
					}`}
				>
					Catering
				</h1>
				<h3
					className={`${classes.subtitle} ${
						inView ? classes["title-active"] : undefined
					}`}
				>
					We do all the mixing so you don't have to
				</h3>
				<div
					className={`${classes["see-more"]} ${
						inView ? classes["title-active"] : undefined
					}`}
					onClick={scrollDown}
				>
					<p>See how to get started</p>
					<p id={classes.arrow}>&#8642;</p>
				</div>
			</div>
			<div className={classes["exp-block"]} ref={titleRefTwo}>
				<div
					className={`${classes["background-container"]} ${
						inViewTwo ? classes["title-active"] : undefined
					}`}
					style={{
						transition: "opacity 1s 0s",
					}}
					ref={expRef}
				>
					<div className={classes.blackGradient}></div>
					<img className={classes.expBackground} src={expBg} />
				</div>
				<section>
					<span
						style={{
							translate: inViewTwo ? "3rem 0" : "-40rem 0",
						}}
					>
						<h1>Craft your order with ease</h1>
						<p>
							Choose from a variety of unique drink filters, and when you are
							ready to add a drink to your order, choose the quantity you would
							like and click "Add to Order".
							<br />
							<br />
							If you would like to search by drink name, you can as well!
						</p>
					</span>
					<div
						className={classes.screenshot}
						style={{
							translate: inViewTwo ? "6rem 0" : "90rem 0",
						}}
					></div>
				</section>
			</div>
			<div className={classes["exp-block"]} ref={titleRefThree}>
				<div
					className={`${classes["background-container"]} ${
						inViewThree ? classes["title-active"] : undefined
					}`}
					style={{
						transition: "opacity 1s 0s",
					}}
				>
					<div className={classes.blackGradient}></div>
					<img
						className={classes.expBackground}
						src={secondBg}
						style={{
							transform: "scaleX(-1)",
						}}
					/>
				</div>
				<section>
					<div
						className={classes.screenshot2}
						style={{
							translate: inViewThree ? "-8rem 0" : "-90rem 0",
						}}
					></div>
					<span
						style={{
							translate: inViewThree ? "-10rem 0" : "50rem 0",
						}}
					>
						<h1>Send your order, we'll take care of the rest</h1>
						<p>
							Once you have all the drinks you want in your cart, fill out your
							info, and book your order!
							<br />
							<br />
							Go to your account at the top of the page to see your pending
							orders!
						</p>
						<button onClick={goToDrinks} className={classes.goButton}>
							Try it Out
						</button>
					</span>
				</section>
			</div>
		</main>
	);
};

export default Catering;
