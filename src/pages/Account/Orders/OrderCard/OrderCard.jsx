import classes from "./OrderCard.module.css";
import { useState } from "react";
import cocktail from "../../../../assets/Images/icons8-coconut-cocktail-100.png";
import CheckoutCard from "../../../../components/Cart/CheckoutCard/CheckoutCard";

const OrderCard = ({
	orderName,
	dateCreated,
	date,
	address,
	time,
	total,
	items,
}) => {
	const [detailsOpen, setDetailsOpen] = useState(false);

	const openDetails = () => {
		setDetailsOpen((prev) => !prev);
	};

	return (
		<div className={classes.OrderCard}>
			<span className={classes["top-details"]}>
				<img src={cocktail} />
				<h1>{orderName}</h1>
				<hr />
				<h3>{dateCreated}</h3>
				<hr />
				<p>$ {total}</p>
				<button onClick={openDetails}>Details</button>
			</span>
			<section
				className={`${classes["bottom-details"]} ${
					detailsOpen ? classes.detailsActive : ""
				}`}
			>
				<h1 className={classes.title}>Drinks</h1>
				<div className={classes.itemContainer}>
					{items.map((item) => {
						return (
							<CheckoutCard
								key={item.id}
								name={item.name}
								quantity={item.quantity}
								picture={item.picture}
							/>
						);
					})}
				</div>
				<div className={classes["sub-details"]}>
					<span>
						<h1>Date:</h1>
						<hr />
						<p>{date}</p>
					</span>
					<hr />
					<span>
						<h1>Time:</h1>
						<hr />
						<p>{time}</p>
					</span>
					<hr />
					<span>
						<h1>Address:</h1>
						<hr />
						<p>{address}</p>
					</span>
				</div>
			</section>
		</div>
	);
};

export default OrderCard;
