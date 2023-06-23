import classes from "./Orders.module.css";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import OrderCard from "./OrderCard/OrderCard";
import AuthContext from "../../../state/authContext";
import Loader from "../../../components/Loader/Loader";

const Orders = () => {
	const { userId, token } = useContext(AuthContext);
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(true);

	const getOrders = () => {
		axios
			.get(`/getOrders/${userId}`, {
				headers: {
					Authorization: token,
				},
			})
			.then((res) => {
				setLoading((prev) => false);
				setOrders(res.data);
			})
			.catch((error) => console.log(error));
	};

	useEffect(() => {
		if (token) {
			getOrders();
		}
	}, [token]);

	return (
		<main className={classes.Orders}>
			<h1>Orders</h1>
			{loading ? <Loader style={{ translate: "0 1rem" }} /> : undefined}
			<section
				className={`${classes["orders-container"]} ${
					loading ? undefined : classes["orders-active"]
				}`}
			>
				{orders.length === 0 ? (
					<h1 className={classes.noOrders}>You don't have any Orders yet!</h1>
				) : (
					orders.map((order) => {
						let newDate = [];
						const dateCreated = order.createdAt.slice(0, 10).split("-");

						newDate.push(dateCreated[1]);
						newDate.push(dateCreated[2]);
						newDate.push(dateCreated[0]);
						newDate = newDate.join("/");

						let newOrderDate = [];
						const orderDate = order.date.split("-");

						newOrderDate.push(orderDate[1]);
						newOrderDate.push(orderDate[2]);
						newOrderDate.push(orderDate[0]);
						newOrderDate = newOrderDate.join("/");

						const time = order.time.slice(0, 2);
						const minutes = order.time.slice(3, 5);

						const timeCheck = +time - 12;

						let newTime;

						if (timeCheck === 12) {
							newTime = `${timeCheck}:${minutes} AM`;
						} else if (+time === 0) {
							newTime = `${12}:${minutes} AM`;
						} else if (timeCheck < 0) {
							newTime = `${time}:${minutes} AM`;
						} else if (timeCheck === 0) {
							newTime = `${time}:${minutes} PM`;
						} else if (timeCheck > 0) {
							newTime = `${timeCheck}:${minutes} PM`;
						}

						return (
							<OrderCard
								key={order.id}
								orderName={order.order_name}
								dateCreated={newDate}
								date={newOrderDate}
								address={order.address}
								time={newTime}
								total={order.total}
								items={JSON.parse(order.items)}
							/>
						);
					})
				)}
			</section>
		</main>
	);
};

export default Orders;
