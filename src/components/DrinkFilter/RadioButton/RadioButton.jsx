import classes from "./RadioButton.module.css";

const RadioButton = ({ label, field }) => {
	return (
		<div className={classes.RadioButton}>
			<input type="radio" {...field} />
            <label>{label}</label>
		</div>
	);
};

export default RadioButton;
