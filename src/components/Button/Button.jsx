import classes from "./Button.module.css";

const Button = (props) => {
	return (
		<button style={props.style} className={classes.Button} onClick={props.onClick}>
			{props.children}
		</button>
	);
};

export default Button;
