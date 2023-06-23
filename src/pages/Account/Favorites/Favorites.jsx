import classes from "./Favorites.module.css";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../../../state/authContext";
import { favoritesActions } from "../../../state/slices/favoritesSlice";
import { useDispatch } from "react-redux";
import DrinkCard from "../../../components/DrinkCard/DrinkCard";
import Loader from "../../../components/Loader/Loader";

const Favorites = () => {
	const dispatch = useDispatch();
	const { setFavorites: setFavs } = favoritesActions;
	const { userId, token } = useContext(AuthContext);
	const [favorites, setFavorites] = useState([]);
	const [loading, setLoading] = useState(true);

	const getFavorites = () => {
		axios
			.get(`/getFavoritesList/${userId}`, {
				headers: {
					Authorization: token,
				},
			})
			.then((res) => {
				dispatch(setFavs(res.data));
				setFavorites((prev) => res.data);
				setLoading(false);
			})
			.catch((error) => console.log(error));
	};

	useEffect(() => {
		if (token) {
			getFavorites();
		}
	}, [token]);

	return (
		<main className={classes.Favorites}>
			<h1>Favorites</h1>
			{loading ? <Loader /> : undefined}
			<section
				className={classes["drinks"]}
				style={{
					opacity: loading ? "0" : "1",
					translate: loading ? "0 5rem" : "0 0",
				}}
			>
				{favorites.length === 0 ? (
					<h1 className={classes.noFavs}>You don't have any favorites yet!</h1>
				) : (
					favorites.map((favorite, index) => {
						return (
							<DrinkCard
								style={{
									margin: "0",
									marginBottom: "0",
									boxShadow: "0 0 3rem 0 rgb(0, 0, 0, .4)",
									marginTop: "0",
								}}
								key={index}
								id={favorite.drink_id}
								picture={favorite.picture}
								price={favorite.price}
								name={favorite.name}
								inList={true}
							/>
						);
					})
				)}
			</section>
		</main>
	);
};

export default Favorites;
