import classes from "./Input.module.css";
import searchIcon from "../../../assets/Images/icons8-search-500.png";

const Input = ({ field }) => {
	return (
		<span className={classes.Input}>
			<img src={searchIcon} />
			<input
				type="text"
				{...field}
				autoComplete="off"
				placeholder="Drink Name"
			/>
		</span>
	);
};

export default Input;
