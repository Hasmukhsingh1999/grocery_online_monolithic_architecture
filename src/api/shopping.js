const CustomerService = require("../services/custom-service");
const ShoppingService = require("../services/shopping-service");

const UserAuth = require("./middlewares/auth");

module.exports = (app) => {
  const service = new ShoppingService();
  const userService = new CustomerService();

  app.post("/shopping/order", UserAuth, async (req, res, next) => {
    const { _id } = req.user;
    const { txnNumber } = req.body;

    try {
      const { data } = await service.PlaceOrder({
        _id,
        txnNumber,
      });
      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  });
  app.post("/shopping/orders", UserAuth, async (req, res, next) => {
    const { _id } = req.user;

    try {
      const { data } = await CustomerService.GetShoppingDetails({
        _id,
      });
      return res.status(200).json(data.orders);
    } catch (error) {
      next(error);
    }
  });
  app.post("/shopping/cart", UserAuth, async (req, res, next) => {
    const { _id } = req.user;

    try {
      const { data } = await CustomerService.GetShoppingDetails({
        _id,
      });
      return res.status(200).json(data.cart);
    } catch (error) {
      next(error);
    }
  });
};
