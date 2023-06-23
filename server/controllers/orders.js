const { User } = require("../models/user");
const { CartItem } = require("../models/cartItem");

module.exports = {
	addToOrders: async (req, res) => {
		const { id } = req.params;

		const { data } = req.body;

		const user = await User.findOne({
			where: {
				id: id,
			},
		});

		await user.createOrder({
			order_name: data.orderName,
			date: data.date,
			time: data.time,
			address: data.address,
			items: JSON.stringify(data.items),
			total: data.total,
		});

		const cart = await user.getCart();

		await CartItem.destroy({
			where: {
				cartId: cart.id,
			},
		});

		res.sendStatus(200);
	},

	getOrders: async (req, res) => {
		const { id } = req.params;

		const user = await User.findOne({
			where: {
				id: id,
			},
		});

		const orders = await user.getOrders();

		res.status(200).send(orders);
	},
};
