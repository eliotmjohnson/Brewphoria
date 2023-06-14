const { User } = require("../models/user");

module.exports = {
	addToCart: async (req, res) => {
        const data = req.body;

        const user = await User.findOne({ where: { id: 1 } });

        const cart = await user.getCart()

        const items = await cart.addCartItem()
        // await cart.createCartItem({
        //     drink_id: data.id,
        //     name: data.name,
        //     picture: data.picture,
        //     price: data.price,
        //     quantity: data.quantity,
        // })
	},
};
