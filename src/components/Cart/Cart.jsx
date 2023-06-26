import classes from "./Cart.module.css";
import drinks from "../../assets/Images/drinks.svg";
import CartCard from "./CartCard/CartCard";
import CheckoutCard from "./CheckoutCard/CheckoutCard";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import * as Yup from "yup";
import AuthContext from "../../state/authContext";
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../../state/slices/cartSlice";
import { useEffect, useContext, useState } from "react";

const Cart = ({ active, setActive }) => {
	const cartRefresh = useSelector((state) => state.cart.refreshCart);
	const dispatch = useDispatch();
	const { setCartOpen, setCartRefresh } = cartActions;
	const { token, userId } = useContext(AuthContext);
	const [updating, setUpdating] = useState(false);
	const [cartItems, setCartItems] = useState([]);
	const [checkout, setCheckout] = useState(false);
	const [checkingOut, setCheckingOut] = useState(false);

	const closeSlideout = () => {
		setActive(false);
		dispatch(setCartOpen(false));
	};

	useEffect(() => {
		if (userId) {
			axios
				.get(`/getCart/${userId}`, {
					headers: {
						Authorization: token,
					},
				})
				.then((res) => {
					setCartItems(res.data);
					setUpdating(false);
				})
				.catch((error) => console.log(error));
		}
	}, [userId, cartRefresh]);

	const subTotal = cartItems.reduce((total, item) => {
		const multipliedPrice = (item.price + 0.99) * item.quantity;
		return total + multipliedPrice;
	}, 0);

	const fees = subTotal * 0.05;

	const finalTotal = subTotal + fees;

	const goToCheckout = () => {
		setCheckout((prev) => true);
	};

	const editCart = () => {
		setCheckout((prev) => false);
	};

	const initialValues = {
		orderName: "",
		date: "",
		time: "",
		address: "",
	};

	const cartValidationSchema = Yup.object().shape({
		orderName: Yup.string().trim().required("Order name required"),
		date: Yup.string().trim().required("Date required"),
		time: Yup.string().trim().required("Time required"),
		address: Yup.string().trim().required("address required"),
	});

	const handleSubmit = (values, { resetForm }) => {
		setCheckingOut((prev) => true);

		const data = {
			orderName: values.orderName.trim(),
			date: values.date,
			time: values.time,
			address: values.address.trim(),
			items: cartItems,
			total: +finalTotal.toFixed(2),
		};

		axios
			.post(
				`/addToOrders/${userId}`,
				{ data },
				{
					headers: {
						Authorization: token,
					},
				}
			)
			.then((res) => {
				setCheckout((prev) => false);
				setCheckingOut((prev) => false);
				dispatch(setCartRefresh(!cartRefresh));
				resetForm();
			})
			.catch((error) => console.log(error));
	};

	const date = () => {
		let yourDate = new Date();
		const offset = yourDate.getTimezoneOffset();
		yourDate = new Date(yourDate.getTime() - offset * 60 * 1000);
		return yourDate.toISOString().split("T")[0];
	};

	return (
		<div
			className={classes.Cart}
			style={{ translate: active ? "0 0" : "35rem 0" }}
		>
			<section
				className={`${classes.cartContainer} ${
					checkout ? classes.checkoutActive : ""
				}`}
			>
				<div className={classes.checkoutOne}>
					<h1>Your Cart</h1>
					<div className={classes["card-container"]}>
						{cartItems.length === 0 ? (
							<h1
								style={{
									color: "rgb(104, 135, 250)",
									fontSize: "3rem",
									textAlign: "center",
									translate: "0 5rem",
									padding: "1rem",
								}}
							>
								You have nothing in the cart!
							</h1>
						) : (
							cartItems.map((item) => {
								return (
									<CartCard
										key={item.drink_id}
										dbId={item.id}
										drinkId={item.drink_id}
										name={item.name}
										picture={item.picture}
										price={item.price}
										quantity={item.quantity}
										setUpdating={setUpdating}
									/>
								);
							})
						)}
					</div>
					<div className={classes["total"]}>
						<span>
							<h2>Sub-Total</h2>
							<p>
								${" "}
								{subTotal
									.toFixed(2)
									.toString()
									.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
							</p>
						</span>
						<span>
							<h3>Catering Fees</h3>
							<p>
								${" "}
								{fees
									.toFixed(2)
									.toString()
									.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
							</p>
						</span>
						<span>
							<h1>Total</h1>
							<p>
								${" "}
								{finalTotal
									.toFixed(2)
									.toString()
									.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
							</p>
						</span>
						<button
							className={classes["add-button"]}
							onClick={goToCheckout}
							disabled={cartItems.length === 0}
						>
							{updating ? "Updating..." : "Checkout"}
						</button>
					</div>
				</div>
				<button className={classes["edit-cart"]} onClick={editCart}>
					<p>&#8250;</p>
					<h1>Edit Cart</h1>
				</button>
				<div className={classes.checkout}>
					<div className={classes["card-container2"]}>
						{cartItems.map((item) => {
							return (
								<CheckoutCard
									key={item.drink_id}
									dbId={item.id}
									drinkId={item.drink_id}
									name={item.name}
									picture={item.picture}
									quantity={item.quantity}
								/>
							);
						})}
					</div>
					<Formik
						initialValues={initialValues}
						onSubmit={handleSubmit}
						validationSchema={cartValidationSchema}
						validateOnMount
					>
						{({ isValid }) => {
							return (
								<Form className={classes["form-container"]}>
									<h1 className={classes["checkout-title"]}>
										Order Information
									</h1>
									<div className={classes["checkout-form"]}>
										<label>Name for Order</label>
										<Field type="text" name="orderName" autoComplete="off" />
										<label>Date</label>
										<Field
											type="date"
											name="date"
											min={`${date()}`}
											style={{ cursor: "pointer" }}
										/>
										<label>Time</label>
										<Field
											type="time"
											name="time"
											style={{ cursor: "pointer" }}
										/>
										<label>Address</label>
										<Field type="text" name="address" autoComplete="off" />
									</div>
									<div className={classes["total"]} style={{ width: "90%" }}>
										<span>
											<h2>Sub-Total</h2>
											<p>
												${" "}
												{subTotal
													.toFixed(2)
													.toString()
													.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
											</p>
										</span>
										<span>
											<h3>Catering Fees</h3>
											<p>
												${" "}
												{fees
													.toFixed(2)
													.toString()
													.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
											</p>
										</span>
										<span>
											<h1>Total</h1>
											<p>
												${" "}
												{finalTotal
													.toFixed(2)
													.toString()
													.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
											</p>
										</span>
										<button
											type="submit"
											className={`${classes["add-button"]} ${
												!isValid ? classes.invalidButton : ""
											}`}
										>
											{checkingOut ? "Booking..." : "Book Order"}
										</button>
									</div>
								</Form>
							);
						}}
					</Formik>
				</div>
			</section>
			<span className="x-btn" onClick={closeSlideout}>
				&#10005;
			</span>
			<img className={classes["logo-overlay"]} src={drinks} />
		</div>
	);
};

export default Cart;
