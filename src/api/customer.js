const CustomerService = require("../services/custom-service");
const UserAuth = require("./middlewares/auth");

module.exports = (app) => {
  const service = new CustomerService();

  const handleRequest = (handler) => async (req, res, next) => {
    try {
      const data = await handler(req);
      return res.json(data);
    } catch (error) {
      next(error);
    }
  };

  app.post("/customer/signup", handleRequest(async (req) => {
    const { email, password, phone } = req.body;
    const { data } = await service.SignUp({ email, password, phone });
    return data;
  }));

  app.post("/customer/login", handleRequest(async (req) => {
    const { email, password } = req.body;
    const { data } = await service.SignIn({ email, password });
    return data;
  }));

  app.post("/customer/address", UserAuth, handleRequest(async (req) => {
    const { _id } = req.user;
    const { street, postalCode, city, country } = req.body;
    const { data } = await service.AddNewAddress(_id, { street, postalCode, city, country });
    return data;
  }));

  app.get("/customer/profile", UserAuth, handleRequest(async (req) => {
    const { _id } = req.user;
    const { data } = await service.GetProfile({ _id });
    return data;
  }));

  app.get("/customer/shopping-details", UserAuth, handleRequest(async (req) => {
    const { _id } = req.user;
    const { data } = await service.GetShoppingDetails(_id);
    return data;
  }));

  app.get("/customer/wishlist", UserAuth, handleRequest(async (req) => {
    const { _id } = req.user;
    const { data } = await service.GetWishList(_id);
    return data;
  }));
};
