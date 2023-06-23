import classes from "./DrinkFilter.module.css";
import axios from "axios";
import { useEffect, useContext } from "react";
import { useDispatch } from "react-redux";
import { Formik, Form, Field } from "formik";
import { drinksActions } from "../../state/slices/drinksSlice";
import { favoritesActions } from "../../state/slices/favoritesSlice";
import FilterSection from "./FilterSection/FilterSection";
import AuthContext from "../../state/authContext";
import RadioButton from "../../components/DrinkFilter/RadioButton/RadioButton";
import Input from "./Input/Input";

const DrinkFilter = ({ style, startPage, setOptimize }) => {
	const dispatch = useDispatch();
	const { token, userId } = useContext(AuthContext);

	const initialValues = {
		category: "",
		drinkBase: "",
		search: "",
	};

	const getInitialDrinks = () => {
		axios
			.get(`/getDrinks/${userId}`, {
				headers: {
					Authorization: token,
				},
			})
			.then((res) => {
				dispatch(favoritesActions.setFavorites(res.data.items));
				dispatch(drinksActions.setDrinksArr(res.data.randomArr));
				dispatch(drinksActions.setLoading(false));
				setTimeout(() => {
					setOptimize((prev) => true);
				}, 1000);
			})
			.catch((error) => console.log(error));
	};

	useEffect(() => {
		dispatch(drinksActions.setDrinksArr([]));
		if (token) {
			dispatch(drinksActions.setLoading(true));
			getInitialDrinks();
		}
	}, [token]);

	const handleSubmit = (values) => {
		dispatch(drinksActions.setLoading(true));

		setTimeout(() => {
			startPage();
			axios
				.post("/filterDrinks", values, {
					headers: {
						Authorization: token,
					},
				})
				.then((res) => {
					dispatch(drinksActions.setDrinksArr(res.data));
					dispatch(drinksActions.setLoading(false));
					values.search = "";
				})
				.catch((error) => console.log(error));
		}, 750);
	};

	return (
		<div className={classes["DrinkFilter"]} style={style}>
			<h1>Filter</h1>
			<div className={classes.border}></div>
			<Formik initialValues={initialValues} onSubmit={handleSubmit}>
				{({ resetForm, values }) => (
					<Form className={classes["form"]}>
						<button
							className={classes.resetForm}
							type="reset"
							onClick={() => resetForm()}
						>
							Reset Filters
						</button>
						<FilterSection title="Category" accHeight="20rem" open>
							<Field
								component={RadioButton}
								name="category"
								type="radio"
								value="Cocktail"
								label="Cocktail"
							/>
							<Field
								component={RadioButton}
								type="radio"
								name="category"
								value="Ordinary Drink"
								label="Ordinary Drink"
							/>
							<Field
								component={RadioButton}
								type="radio"
								name="category"
								value="Shake"
								label="Shake"
							/>
							<Field
								component={RadioButton}
								type="radio"
								name="category"
								value="Homemade Liqueur"
								label="Homemade Liqueur"
							/>
							<Field
								component={RadioButton}
								type="radio"
								name="category"
								value="Beer"
								label="Beer"
							/>
							<Field
								component={RadioButton}
								type="radio"
								name="category"
								value="Soft Drink"
								label="Soft Drink"
							/>
						</FilterSection>
						<FilterSection title="Drink Base" accHeight="13.5rem">
							<Field
								component={RadioButton}
								name="drinkBase"
								type="radio"
								value="Vodka"
								label="Vodka"
							/>
							<Field
								component={RadioButton}
								name="drinkBase"
								type="radio"
								value="Gin"
								label="Gin"
							/>
							<Field
								component={RadioButton}
								name="drinkBase"
								type="radio"
								value="Champagne"
								label="Champagne"
							/>
							<Field
								component={RadioButton}
								name="drinkBase"
								type="radio"
								value="Tequila"
								label="Tequila"
							/>
							<Field
								component={RadioButton}
								name="drinkBase"
								type="radio"
								value="Rum"
								label="Rum"
							/>
						</FilterSection>
						<FilterSection title="Search by drink name" accHeight="5rem" open>
							<Field component={Input} name="search" type="text" />
						</FilterSection>
						<button
							type="submit"
							className={classes["filter-button"]}
							disabled={
								values.category === "" &&
								values.drinkBase === "" &&
								values.search.trim() === ""
							}
						>
							Filter
						</button>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default DrinkFilter;
