import classes from "./DrinkCard.module.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../state/slices/cartSlice";
import AuthContext from "../../state/authContext";
import { useState, useContext, useEffect } from "react";
import outlineHeart from "../../assets/Images/icons8-heart-redOutline.png";
import filledHeart from "../../assets/Images/icons8-heart-redFilled.png";

const DrinkCard = ({ name, picture, price, id, style, inList }) => {
	const dispatch = useDispatch();
	const { userId, token } = useContext(AuthContext);
	const { setCartRefresh } = cartActions;
	const favoritesList = useSelector((state) => state.favorites.favoritesList);
	const cartRefresh = useSelector((state) => state.cart.refreshCart);
	const [counter, setCounter] = useState(1);
	const [added, setAdded] = useState(false);
	const [drinkData, setDrinkData] = useState();
	const [display, setDisplay] = useState(true);
	const [favorite, setFavorite] = useState(false);
	const [ingredients, setingredients] = useState([]);
	const [flip, setFlip] = useState(false);
	const [heartAnimate, setHeartAnimate] = useState();
	const [animation, setAnimation] = useState(false);

	const markFavs = () => {
		const isFav = favoritesList.some((favorite) => {
			return favorite.drink_id === +id;
		});

		if (isFav) {
			setFavorite((prev) => true);
		}
	};

	useEffect(() => {
		markFavs();
	}, [favoritesList]);

	const decrement = (e) => {
		e.stopPropagation();
		if (counter > 1) {
			setCounter((prev) => prev - 1);
		}
	};

	const increment = (e) => {
		e.stopPropagation();
		setCounter((prev) => prev + 1);
	};

	const flipCard = (e) => {
		e.stopPropagation();
		if (!drinkData) {
			axios
				.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
				.then((res) => {
					let ingArr = [];

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
					setAnimation(true);
					setingredients(ingArr);
					setDrinkData(res.data.drinks[0]);
					setFlip((prev) => !prev);
					setTimeout(() => setAnimation(false), 800);
				})
				.catch((error) => console.log(error));
		} else {
			setAnimation(true);
			setTimeout(() => setAnimation(false), 800);
			setFlip((prev) => !prev);
		}
	};

	const addToCart = (e) => {
		e.stopPropagation();
		setAdded(true);

		const data = {
			id: id,
			name: name,
			picture: picture,
			price: price,
			quantity: counter,
		};

		axios
			.post(`/addToCart/${userId}`, data, {
				headers: {
					authorization: token,
				},
			})
			.then((res) => {
				dispatch(setCartRefresh(!cartRefresh));
				setAdded(false);
			})
			.catch((error) => console.log(error));
	};

	const addToFavs = (e) => {
		e.stopPropagation();

		setFavorite((prev) => true);
		setHeartAnimate((prev) => false);

		const data = {
			id: id,
			name: name,
			picture: picture,
			price: price,
		};

		axios
			.post(`/addToFavorites/${userId}`, data, {
				headers: {
					authorization: token,
				},
			})
			.then((res) => {})
			.catch((error) => console.log(error));
	};

	const removeFromFavs = (e) => {
		e.stopPropagation();

		setFavorite((prev) => false);
		setHeartAnimate((prev) => false);

		if (inList) {
			setDisplay((prev) => false);
		}

		axios
			.put(
				`/deleteFavorite/${userId}`,
				{ drinkId: id },
				{
					headers: {
						authorization: token,
					},
				}
			)
			.then((res) => {})
			.catch((error) => console.log(error));
	};

	useEffect(() => {
		if (heartAnimate !== undefined) {
			setHeartAnimate((prev) => true);
		}
	}, [heartAnimate]);

	return (
		<div
			className={
				flip
					? `${classes["DrinkCard"]} ${classes["DrinkCard-flip"]} ${
							animation ? classes["card-flip-animation"] : ""
					  }`
					: `${classes.DrinkCard} ${
							animation ? classes["card-flip-animation"] : ""
					  }`
			}
			onClick={(e) => flipCard(e)}
			id="card"
			style={{ ...style, display: display ? "initial" : "none" }}
		>
			<div
				className={classes.inner}
				style={{ boxShadow: inList ? "none" : "" }}
			>
				<img src={picture} />
				<h1>{name}</h1>
				<p>$ {price}.99</p>
				<div className={classes["counter"]}>
					<button
						style={{ paddingBottom: ".5rem" }}
						onClick={(e) => decrement(e)}
					>
						-
					</button>
					<span>{counter}</span>
					<button onClick={(e) => increment(e)}>+</button>
				</div>
				<button className={classes["add-button"]} onClick={(e) => addToCart(e)}>
					{added ? "Added!!" : "Add to Order"}
				</button>
				<span className={classes.details} onClick={(e) => flipCard(e)}>
					<h3>Drink Recipe</h3>
					<span>&#62;</span>
				</span>
				<div className={classes.favButton}>
					<img
						src={favorite ? filledHeart : outlineHeart}
						className={`${classes.heart} ${
							heartAnimate ? classes.heartAnimation : ""
						}`}
						onClick={favorite ? removeFromFavs : addToFavs}
					/>
					<h1 className={classes.favText} onClick={(e) => e.stopPropagation()}>
						{favorite ? "Remove from Favorites" : "Add to Favorites"}
					</h1>
				</div>
			</div>
			<div
				className={classes.outer}
				style={{ boxShadow: inList ? "none" : "" }}
			>
				<h1>{drinkData ? drinkData.strDrink : ""}</h1>
				<div className={classes["recipe-container"]}>
					<section className={classes.ingredients}>
						<h1>Ingredients</h1>
						<ul>
							{ingredients.map((ing, i) => {
								return (
									<li key={i}>
										<strong>-</strong>
										{ing.amount ? ing.amount.trim() : ""}
										<p>{ing.ingredient ? ing.ingredient.trim() : ""}</p>
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
				<span
					className={classes.details}
					style={{ justifyContent: "center" }}
					onClick={(e) => flipCard(e)}
				>
					<h3>Back</h3>
					<span>&#62;</span>
				</span>
			</div>
		</div>
	);
};

export default DrinkCard;
