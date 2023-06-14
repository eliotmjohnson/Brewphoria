import classes from "./DrinkCard.module.css";
import axios from "axios";
import { useState } from "react";

const DrinkCard = ({ name, picture, price, id }) => {
	const [counter, setCounter] = useState(1);
	const [drinkData, setDrinkData] = useState();
	const [ingredients, setingredients] = useState([]);
	const [flip, setFlip] = useState(false);

	const decrement = () => {
		if (counter > 1) {
			setCounter((prev) => prev - 1);
		}
	};

	const increment = () => {
		setCounter((prev) => prev + 1);
	};

	const flipCard = () => {
		if (!drinkData) {
			axios
				.get(`http://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
				.then((res) => {
					let ingArr = [];
					console.log(res.data.drinks[0]);
					const data = res.data.drinks[0];

					for (let i = 1; i <= 15; i++) {
						if (data[`strIngredient${i}`]) {
							const ingObj = {
								ingredient: data[`strIngredient${i}`],
								amount: data[`strMeasure${i}`],
							};
							ingArr.push(ingObj);
						}
					}
					setingredients(ingArr);
					setDrinkData(res.data.drinks[0]);
					setFlip((prev) => !prev);
				})
				.catch((error) => console.log(error));
		} else {
			setFlip((prev) => !prev);
		}
	};

	return (
		<div
			className={
				flip
					? `${classes["DrinkCard"]} ${classes["DrinkCard-flip"]}`
					: classes.DrinkCard
			}
		>
			<div className={classes.inner}>
				<img src={picture} />
				<h1>{name}</h1>
				<p>$ {price}.99</p>
				<div className={classes["counter"]}>
					<button style={{ paddingBottom: ".5rem" }} onClick={decrement}>
						-
					</button>
					<span>{counter}</span>
					<button onClick={increment}>+</button>
				</div>
				<button className={classes["add-button"]}>Add</button>
				<span className={classes.details} onClick={flipCard}>
					<h3>Drink Details</h3>
					<span>&#62;</span>
				</span>
			</div>
			<div className={classes.outer}>
				<button onClick={flipCard} className={classes.closeDetails}>
					X
				</button>
				<h1>{drinkData ? drinkData.strDrink : ""}</h1>
				<div className={classes["recipe-container"]}>
					<section className={classes.ingredients}>
						<h1>Ingredients</h1>
						<ul>
							{ingredients.map((ing, i) => {
								return (
									<li key={i}>
										<strong>-</strong>
										{ing.amount.trim()}
										<p>{ing.ingredient.trim()}</p>
									</li>
								);
							})}
						</ul>
					</section>
					<section className={classes.instructions}>
						<h1>Instructions</h1>
						<p>{drinkData ? drinkData.strInstructions : ""}</p>
					</section>
				</div>
			</div>
		</div>
	);
};

export default DrinkCard;
