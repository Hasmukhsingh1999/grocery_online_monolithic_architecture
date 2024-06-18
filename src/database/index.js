module.exports = {
    databaseConnections : require('./connection'),
    ProductRepository:require('./repository/product-repository'),
    CustomerRepository:require("./repository/customer-repository"),
    ShoppingRepository:require("./repository/shopping-repository")
}