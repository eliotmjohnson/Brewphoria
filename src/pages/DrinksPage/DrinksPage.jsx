import classes from "./DrinksPage.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import DrinkFilter from "../../components/DrinkFilter/DrinkFilter";
import drinkBackground from "../../assets/Images/moritz-mentges-Z40sav8IYqQ-unsplash.jpg";
import DrinkCard from "../../components/DrinkCard/DrinkCard";

const DrinksPage = () => {
	const [isVisible, setIsVisible] = useState(false);
	const [pageLocation, setPageLocation] = useState(0);
	const drinks = useSelector((state) => state.drinks.drinksArr);
	const loading = useSelector((state) => state.drinks.loading);
	const navigate = useNavigate();

	useEffect(() => {
		const getLoggedInStatus = async () => {
			const storedToken = localStorage.getItem("token");

			let valid;

			await axios
				.post("/getData", { storedToken })
				.then((res) => {
					valid = res.data.username;
				})
				.catch((error) => console.log(error));
			if (!valid) {
				navigate("/login");
				return;
			} else {
				setTimeout(() => setIsVisible(true), 50);
			}
		};
		getLoggedInStatus();
	}, []);

	const goNext = () => {
		if (Math.ceil(drinks.length / 6) * 78 > pageLocation + 78) {
			setPageLocation((prev) => {
				return prev + 78;
			});
		}
	};

	const goBack = () => {
		if (pageLocation !== 0) {
			setPageLocation((prev) => {
				return prev - 78;
			});
		}
	};

	const startPage = () => {
		setPageLocation((prev) => {
			return 0;
		});
	};

	return (
		<main
			className={classes["Drinks-Page"]}
			style={{ opacity: isVisible ? 1 : 0 }}
		>
			<div className={classes.wrapper}>
				<img className={classes.background} src={drinkBackground} />
			</div>
			<h1 className={classes["page-title"]}>
				<p>Check out</p>
				our
				<strong>Drinks</strong>
			</h1>
			<section>
				<DrinkFilter
					style={{
						translate: isVisible ? "0 0" : "0 4rem",
						transition: "translate 1s",
						position: "sticky",
						top: "3rem",
					}}
					startPage={startPage}
				/>
				<div
					className={classes["drinks-container"]}
					style={{ backdropFilter: isVisible ? "blur(6px)" : "blur(0px)" }}
				>
					<div
						className={classes.pagination}
						style={{
							opacity: loading ? 0 : 1,
						}}
					>
						<button
							id={classes.back}
							onClick={goBack}
							style={{
								transform:
									pageLocation === 0
										? "translateY(-10rem)"
										: "translateY(0rem)",
								transition:
									"color .15s linear, background-color .15s linear, transform .5s",
							}}
						>
							Back
						</button>
						<button
							id={classes.next}
							onClick={goNext}
							style={{
								transform:
									loading |
									!(Math.ceil(drinks.length / 6) * 78 > pageLocation + 78)
										? "translateY(-10rem)"
										: "translateY(0rem)",
								transition: !(
									Math.ceil(drinks.length / 6) * 78 >
									pageLocation + 78
								)
									? "transform .5s 0s, color .15s linear, background-color .15s linear"
									: "transform .5s .5s, color .15s linear, background-color .15s linear",
							}}
						>
							Next
						</button>
					</div>
					<section
						className={
							loading
								? `${classes.drinks} ${classes.drinksActive}`
								: classes.drinks
						}
						style={{
							opacity: loading ? 0 : 1,
							translate: loading ? "0 4rem" : "0 0",
							transform: `translate3d(-${pageLocation}rem, 0, 0 )`,
							perspectiveOrigin: `${pageLocation}rem`,
						}}
					>
						{(() => {
							if (drinks.length === 0) {
								return (
									<h1 className={classes["no-drinks"]}>
										There are no drinks to show{" "}
										<p>Try another filter combination or drink name</p>
									</h1>
								);
							} else if (drinks[0].name) {
								return drinks.map((drink) => {
									return (
										<DrinkCard
											key={drink.id}
											id={drink.id}
											picture={drink.picture}
											name={drink.name}
											price={drink.price}
										/>
									);
								});
							} else
								return drinks.map((drink) => {
									return (
										<DrinkCard
											key={drink.idDrink}
											id={drink.idDrink}
											picture={drink.strDrinkThumb}
											name={drink.strDrink}
											price={drink.price}
										/>
									);
								});
						})()}
					</section>
				</div>
			</section>
		</main>
	);
};

export default DrinksPage;
