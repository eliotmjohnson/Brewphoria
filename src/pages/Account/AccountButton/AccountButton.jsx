import classes from "./AccountButton.module.css";
import { NavLink } from "react-router-dom";

const AccountButton = ({ icon, title, style, destination }) => {
	return (
		<NavLink
			preventScrollReset={true}
			to={destination}
			className={({ isActive }) => {
				return isActive
					? `${classes.AccountButton} ${classes["button-active"]}`
					: classes.AccountButton;
			}}
			style={style}
		>
			<img src={icon} />
			<h1>{title}</h1>
		</NavLink>
	);
};

export default AccountButton;
