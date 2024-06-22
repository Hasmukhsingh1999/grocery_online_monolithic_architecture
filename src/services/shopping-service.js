const { ShoppingRepository } = require("../database");
const { FormateData } = require("../utils");

class ShoppingService {
  constructor() {
    this.repository = new ShoppingRepository();
  }

  async PlaceOrder(userInput) {
    const { _id, txnNumber } = userInput;
    try {
      const orderResult = await this.repository.CreateNewOrder(_id, txnNumber);
      return FormateData(orderResult);
    } catch (error) {
      throw new APIError("Date Not found", error);
    }
  }

  async GetOrders(customId) {
    try {
      const orders = await this.repository.Orders(customId);
    } catch (error) {
      throw new APIError("Data Not found", error);
    }
  }
}


module.exports = ShoppingService