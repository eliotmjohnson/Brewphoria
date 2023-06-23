import classes from "./CheckoutCard.module.css";

const CheckoutCard = ({ dbId, drinkId, name, picture, quantity }) => {
	return (
		<span className={classes.CartCard}>
			<img src={picture} />
			<h1>{name}</h1>
			<div className={classes["counter"]}>
				<span>X {quantity}</span>
			</div>
		</span>
	);
};

export default CheckoutCard;
