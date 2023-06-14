import classes from "./FilterCategory.module.css";
import plusButton from "../../../assets/Images/icons8-plus-button.png";

const FilterCategory = ({title, onClick, accordian}) => {
	return (
		<div className={classes.FilterCategory} onClick={onClick}>
			<p>
				{title}
				<img style={{rotate: accordian ? "135deg" : "0deg"}} src={plusButton} />
			</p>
			<hr />
		</div>
	);
};

export default FilterCategory;
