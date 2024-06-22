const CustomerService = require("../services/custom-service");
const CustomerService = require("../services/custom-service");
const ProductService = require("../services/product-service");
const UserAuth = require("./middlewares/auth");

module.exports = (app) => {
  const service = new ProductService();
  const CustomerService = new CustomerService();

  app.post("/product/create", async (req, res, next) => {
    try {
      const { name, description, type, unit, price, available, supplier } =
        req.body;

      const { data } = await service.CreateProduct({
        name,
        description,
        type,
        unit,
        price,
        available,
        supplier,
      });

      return res.json(data);
    } catch (error) {
      next(error);
    }
  });

  app.get("/category/:type", async (req, res, next) => {
    const type = req.params.type;
    try {
      const { data } = await service.GetProductByCategory(type);
      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  });

  app.get("/:id", async (req, res, next) => {
    const productId = req.params.id;

    try {
      const { data } = await service.GetProductDescription(productId);
      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  });
  app.get("/ids", async (req, res, next) => {
    try {
      const { ids } = req.body;
      const products = await service.GetProductDescription(ids);
      return res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  });
  app.get("/wishlist", UserAuth, async (req, res, next) => {
    const { _id } = req.body;
    try {
      const products = await service.GetProductById(req.body._id);
      const wishList = await CustomerService.AddToWishlist(_id, products);
      return res.status(200).json(wishList);
    } catch (error) {
      next(error);
    }
  });
  app.delete("/wishlist/:id", UserAuth, async (req, res, next) => {
    const { _id } = req.user;
    const productId = req.params.id;
    try {
      const products = await service.GetProductById(productId);
      const wishList = await CustomerService.AddToWishlist(_id, products);
      return res.status(200).json(wishList);
    } catch (error) {
      next(error);
    }
  });
  app.put("/cart", UserAuth, async (req, res, next) => {
    const { _id, qty } = req.body;
    try {
      const product = await service.GetProductById(_id);
      const result = await CustomerService.ManageCart(
        req.user._id,
        product,
        qty,
        false
      );
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  });

  app.delete("/cart/:id", UserAuth, async (req, res, next) => {
    const { _id } = req.user;

    try {
      const products = await service.GetProductById(req.params.id);
      const result = await CustomerService.ManageCart(_id, products, 0, true);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  });

  app.get("/", async (req, res, next) => {
    try {
      const { data } = await service.GetProducts();
      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  });
};
