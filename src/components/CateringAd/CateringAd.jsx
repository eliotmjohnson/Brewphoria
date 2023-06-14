import classes from "./CateringAd.module.css";
import { useInView } from "react-intersection-observer";
import HomeAdText from "../HomeAdText/HomeAdText";
import Button from "../Button/Button";

const CateringAd = ({
	image,
	text,
	textStyles,
	style,
	buttonStyles,
	buttonText,
	buttonClick,
}) => {
	const [ref, inView] = useInView({
		threshold: 0.3,
		triggerOnce: true,
	});

	return (
		<section ref={ref} className={classes["catering-ad"]} style={style}>
			<HomeAdText inView={inView} style={textStyles} text={text} />
			<Button
				onClick={buttonClick}
				style={{
					...buttonStyles,
					opacity: inView ? "1" : "0",
				}}
			>
				{buttonText}
			</Button>
			<img
				className={`${classes.image} ${inView ? classes.active : ""}`}
				src={image}
			/>
		</section>
	);
};

export default CateringAd;
