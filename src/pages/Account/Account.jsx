import classes from "./Account.module.css";
import { Outlet, NavLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../state/authContext";
import AccountButton from "./AccountButton/AccountButton";
import drinksLogo from "../../assets/Images/drinks.svg";
import ordersIcon from "../../assets/Images/icons8-catering-96.png";
import accountIcon from "../../assets/Images/icons8-account-80.png";
import heartIcon from "../../assets/Images/icons8-heart-100.png";

const Account = () => {
	const [visible, setVisible] = useState(false);
	const { firstName, lastName } = useContext(AuthContext);

	useEffect(() => {
		setTimeout(() => setVisible((prev) => true), 100);
	}, []);

	return (
		<main className={classes.Account} style={{ opacity: visible ? "1" : "0" }}>
			<main
				className={classes.interface}
				style={{ translate: visible ? "0 0" : "0 5rem" }}
			>
				<section className={classes.sidebar}>
					<NavLink
						preventScrollReset={true}
						to="profile"
						className={({ isActive }) =>
							`${classes.profile} ${isActive ? classes["button-active"] : ""}`
						}
					>
						<img src={accountIcon} />
						<h1>{`${firstName} ${lastName}`}</h1>
					</NavLink>
					<AccountButton
						title="Orders"
						icon={ordersIcon}
						destination="orders"
					/>
					<AccountButton
						title="Favorites"
						icon={heartIcon}
						destination="favorites"
					/>
					<img className={classes["sidebar-logo"]} src={drinksLogo} />
				</section>
				<section className={classes.content}>
					<div className={classes.logoCont}>
						<img className={classes.backgroundLogo} src={drinksLogo} />
					</div>
					<Outlet />
				</section>
			</main>
		</main>
	);
};

export default Account;
