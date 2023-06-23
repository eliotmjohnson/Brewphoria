import classes from "./Loader.module.css";
import brewLogo from "../../assets/Images/drinks.svg";

const Loader = ({ style }) => {
	return <img className={classes.loader} style={style} src={brewLogo} />;
};

export default Loader;
