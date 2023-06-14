const { DrinkCategories } = require("../models/drinkCategories");
const { DrinkBases } = require("../models/drinkBases");
const { Drinks } = require("../models/drinks");

module.exports = {
	filterDrinks: async (req, res) => {
		const values = req.body;

		let categoryDrinksArr = [];
		let drinkBaseArr = [];
		let sortedArr = [];
		const priceArr = await Drinks.findOne({
			where: { id: 3 },
		});
		const priceArrParsed = JSON.parse(priceArr.drinks);

		if (values.search.trim() !== "") {
			const firstArr = await Drinks.findOne({
				where: { id: 2 },
			});

			const secondArr = await Drinks.findOne({
				where: { id: 1 },
			});

			const thirdArr = await Drinks.findOne({
				where: { id: 3 },
			});

			const firstParsed = JSON.parse(firstArr.drinks);
			const secondParsed = JSON.parse(secondArr.drinks);
			const thirdParsed = JSON.parse(thirdArr.drinks);

			const fullArr = [...firstParsed, ...secondParsed];

			fullArr.forEach((drink) => {
				if (
					drink.strDrink.toLowerCase().includes(values.search.toLowerCase())
				) {
					sortedArr.push(drink);
				}
			});

			let newArr = [];

			for (let i = 0; i < sortedArr.length; i++) {
				const index = thirdParsed.findIndex(
					(drink) => drink.id === sortedArr[i].idDrink
				);
				newArr.push({
					...sortedArr[i],
					price: index < 0 ? 8 : priceArrParsed[index].price,
				});
			}

			res.status(200).send(newArr);
		} else if (values.category !== "") {
			const catagoriesItem = await DrinkCategories.findOne({
				where: { category: values.category },
			});

			categoryDrinksArr = JSON.parse(catagoriesItem.array);

			if (values.drinkBase !== "") {
				const basesItem = await DrinkBases.findOne({
					where: { base: values.drinkBase },
				});

				drinkBaseArr = JSON.parse(basesItem.array);

				for (let i = 0; i < categoryDrinksArr.length; i++) {
					for (let j = 0; j < drinkBaseArr.length; j++) {
						if (drinkBaseArr[j].idDrink === categoryDrinksArr[i].idDrink) {
							sortedArr.push(categoryDrinksArr[i]);
						}
					}
				}

				let newArr = [];

				for (let i = 0; i < sortedArr.length; i++) {
					const index = priceArrParsed.findIndex(
						(drink) => drink.id === sortedArr[i].idDrink
					);
					newArr.push({
						...sortedArr[i],
						price: index < 0 ? 8 : priceArrParsed[index].price,
					});
				}
				res.status(200).send(newArr);
			} else {
				let newArr = [];
				for (let i = 0; i < categoryDrinksArr.length; i++) {
					const index = priceArrParsed.findIndex(
						(drink) => drink.id === categoryDrinksArr[i].idDrink
					);

					newArr.push({
						...categoryDrinksArr[i],
						price: index < 0 ? 8 : priceArrParsed[index].price,
					});
				}

				res.status(200).send(newArr);
			}
		} else if (values.drinkBase !== "") {
			const basesItem = await DrinkBases.findOne({
				where: { base: values.drinkBase },
			});

			let parsed = JSON.parse(basesItem.array);

			let newArr = [];

			for (let i = 0; i < parsed.length; i++) {
				const index = priceArrParsed.findIndex(
					(drink) => drink.id === parsed[i].idDrink
				);

				newArr.push({
					...parsed[i],
					price: index < 0 ? 8 : priceArrParsed[index].price,
				});
			}
			res.status(200).send(newArr);
		} else console.log("Nothing to filter!");
	},

	getDrinks: async (req, res) => {
		let randomArr = [];

		const firstArr = await Drinks.findOne({
			where: { id: 2 },
		});

		const secondArr = await Drinks.findOne({
			where: { id: 1 },
		});

		const thirdArr = await Drinks.findOne({
			where: { id: 3 },
		});

		const firstParsed = JSON.parse(firstArr.drinks);
		const secondParsed = JSON.parse(secondArr.drinks);
		const thirdParsed = JSON.parse(thirdArr.drinks);

		const fullArr = [...firstParsed, ...secondParsed];

		for (let i = 0; i < fullArr.length; i++) {
			const index = thirdParsed.findIndex(
				(drink) => drink.id === fullArr[i].idDrink
			);
			const drink = fullArr[i];
			const drinkObj = {
				id: drink.idDrink,
				name: drink.strDrink,
				picture: drink.strDrinkThumb,
				price: thirdParsed[index].price,
			};

			randomArr.push(drinkObj);
		}

		res.status(200).send(randomArr);
	},
};
