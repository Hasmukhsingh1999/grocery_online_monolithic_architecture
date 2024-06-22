const { ProductRepository } = require("../database");
const { FormateData } = require("../utils");
const { APIError } = require("../utils/app-errors");

class ProductService {
  constructor() {
    this.repository = new ProductRepository();
  }

  async CreateProduct(productInputs) {
    try {
      const productResult = await this.repository.CreateProduct(productInputs);
      return FormateData(productResult);
    } catch (error) {
      throw new APIError("Data Not Found", error);
    }
  }

  async GetProducts() {
    try {
      const products = await this.repository.Products();

      let categories = {};

      products.map(({ type }) => {
        categories[type] = type;
      });

      return FormateData({
        products,
        categories: Object.keys(categories),
      });
    } catch (error) {
      throw new APIError("Data Not Found", error);
    }
  }

  async GetProductDescription(productId) {
    try {
      const product = await this.repository.FindById(productId);
      return FormateData(product);
    } catch (error) {
      throw new APIError("Data Not Found");
    }
  }
  async GetProductByCategory(category) {
    try {
      const product = await this.repository.FindById(category);
      return FormateData(product);
    } catch (error) {
      throw new APIError("Data Not Found");
    }
  }
  async GetProductDescription(selectedIds) {
    try {
      const product = await this.repository.FindById(selectedIds);
      return FormateData(product);
    } catch (error) {
      throw new APIError("Data Not Found");
    }
  }
  async GetProductById(productId) {
    try {
      const product = await this.repository.FindById(productId);
      return FormateData(product);
    } catch (error) {
      throw new APIError("Data Not Found");
    }
  }
}


module.exports = ProductService