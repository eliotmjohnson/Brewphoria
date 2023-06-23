const { Cart } = require("../models/cart");
const { CartItem } = require("../models/cartItem");

module.exports = {
	addToCart: async (req, res) => {
		const id = req.params.id;
		const data = req.body;

		const cart = await Cart.findOne({
			where: {
				userId: id,
			},
		});

		const [item] = await cart.getCartItems({
			where: {
				drink_id: +data.id,
			},
		});

		if (!item) {
			await cart.createCartItem({
				drink_id: data.id,
				name: data.name,
				picture: data.picture,
				price: data.price,
				quantity: data.quantity,
			});
		} else {
			await item.update({
				quantity: item.quantity + data.quantity,
			});
		}
		res.sendStatus(200);
	},

	getCart: async (req, res) => {
		const id = req.params.id;

		const cart = await Cart.findOne({
			where: {
				userId: id,
			},
		});

		const items = await cart.getCartItems({
			order: [["name", "ASC"]],
		});

		res.status(200).send(items);
	},

	updateCart: async (req, res) => {
		const { id, quantity } = req.body;

		const item = await CartItem.findOne({
			where: {
				id: id,
			},
		});

		if (quantity === 0) {
			await item.destroy();
		}

		item.update({
			quantity: quantity,
		});

		res.sendStatus(200);
	},
};
