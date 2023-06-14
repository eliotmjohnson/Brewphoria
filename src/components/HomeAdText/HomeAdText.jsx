import classes from "./HomeAdText.module.css";

const HomeAdText = ({ inView, text, style }) => {
	return (
		<div className={classes.HomeAdText} style={style.divStyle}>
			<p className={`${inView ? classes.active : ""}`} style={style.pStyle}>{text.p}</p>
			<h1 className={`${inView ? classes.active : ""}`} style={style.h1Style}>
				{text.h1}
			</h1>
			<strong className={`${inView ? classes.active : ""}`}>
				{text.strong}
			</strong>
		</div>
	);
};

export default HomeAdText;
