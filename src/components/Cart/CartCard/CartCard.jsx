import classes from "./CartCard.module.css";
import axios from "axios";
import AuthContext from "../../../state/authContext";
import { cartActions } from "../../../state/slices/cartSlice";
import { useState, useRef, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const CartCard = ({
	dbId,
	drinkId,
	name,
	picture,
	price,
	quantity,
	setUpdating,
}) => {
	const [newQuantity, setNewQuantity] = useState(quantity);
	const [deleted, setDeleted] = useState(false);
	const dispatch = useDispatch();
	const cartRefresh = useSelector((state) => state.cart.refreshCart);
	const { setCartRefresh } = cartActions;
	const { token } = useContext(AuthContext);
	const timeout = useRef();

	useEffect(() => {
		setNewQuantity(quantity);
	}, [quantity]);

	const updateDb = (newQuantity) => {
		clearTimeout(timeout.current);
		timeout.current = setTimeout(() => {
			setUpdating(true);

			const data = {
				id: dbId,
				quantity: newQuantity,
			};
			axios
				.put("/updateCart", data, {
					headers: {
						Authorization: token,
					},
				})
				.then((res) => {
					dispatch(setCartRefresh(!cartRefresh));
				})
				.catch((error) => console.log(error));
		}, 500);
	};

	const decrement = () => {
		setNewQuantity((prev) => prev - 1);
		if (newQuantity - 1 === 0) {
			setDeleted(true);
		}
		updateDb(newQuantity - 1);
	};

	const increment = () => {
		setNewQuantity((prev) => prev + 1);
		updateDb(newQuantity + 1);
	};

	return (
		<span
			className={classes.CartCard}
			style={{ display: deleted ? "none" : "flex" }}
		>
			<img src={picture} />
			<h1>{name}</h1>
			<p>$ {price}.99</p>
			<div className={classes["counter"]}>
				<button style={{ paddingBottom: ".5rem" }} onClick={increment}>
					<h3>+</h3>
				</button>
				<span>{newQuantity}</span>
				<button onClick={decrement}>
					<h4>-</h4>
				</button>
			</div>
		</span>
	);
};

export default CartCard;
