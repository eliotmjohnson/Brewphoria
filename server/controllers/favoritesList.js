const { FavoritesList } = require("../models/favoritesList");

module.exports = {
	addToFavorites: async (req, res) => {
		const id = req.params.id;
		const data = req.body;

		const favList = await FavoritesList.findOne({
			where: {
				userId: id,
			},
		});

		await favList.createFavoritesListItem({
			drink_id: data.id,
			name: data.name,
			picture: data.picture,
			price: data.price,
		});

		res.sendStatus(200);
	},

	getFavoritesList: async (req, res) => {
		const id = req.params.id;

		const favList = await FavoritesList.findOne({
			where: {
				userId: id,
			},
		});

		const items = await favList.getFavoritesListItems({
			order: [["name", "ASC"]],
		});

		res.status(200).send(items);
	},

	deleteFavorite: async (req, res) => {
		const { id } = req.params;
		const { drinkId } = req.body;

		const favList = await FavoritesList.findOne({
			where: {
				userId: id,
			},
		});

		const items = await favList.getFavoritesListItems();

		const index = items.findIndex((item) => item.drink_id === +drinkId);

		await items[index].destroy();

		res.sendStatus(200);
	},
};
