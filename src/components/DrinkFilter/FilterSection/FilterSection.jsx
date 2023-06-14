import classes from "./FilterSection.module.css";
import { useState } from "react";
import FilterCategory from "../FilterCategory/FilterCategory";

const FilterSection = ({ children, title, accHeight, open }) => {
	const [accordian, setAccordian] = useState(open ? true : false);
	const toggleAccordian = (e) => {
		setAccordian((prev) => !prev);
	};

	return (
		<>
			<FilterCategory
				title={title}
				onClick={(e) => toggleAccordian(e)}
				accordian={accordian}
			/>
			<span
				className={classes["filter-content"]}
				style={{ maxHeight: accordian ? `${accHeight}` : "0rem" }}
			>
				{children}
			</span>
		</>
	);
};

export default FilterSection;
