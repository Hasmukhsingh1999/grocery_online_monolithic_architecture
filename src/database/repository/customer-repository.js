const { APIError, STATUS_CODES } = require("../../utils/app-errors");
const { CustomerModel, AddressModel } = require("../models");

class CustomerRepository {
  async CreateCustomer({ email, password, phone, salt }) {
    try {
      const customer = new CustomerModel({
        email,
        password,
        salt,
        phone,
        address: [],
      });
      const customerResult = await customer.save();
      return customerResult;
    } catch (error) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Create Customer"
      );
    }
  }

  async CreateAddress({}) {
    try {
      const profile = await CustomerModel.findById(_id);
      if (profile) {
        const newAddress = new AddressModel({
          street,
          postalCode,
          city,
          country,
        });
        await newAddress.save();
        profile.address.push(newAddress);
      }
      return await profile.save();
    } catch (error) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Error on Create Address"
      );
    }
  }

  async FindCustomer() {
    try {
      const existingCustomer = await CustomerModel.findOne({ email: email });
    } catch (error) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Find Customer"
      );
    }
  }

  async FindCustomerById({ id }) {
    try {
      const existingCustomer = await CustomerModel.findById(id)
        .populate("address")
        .populate("wishlist")
        .populate("orders")
        .populate("cart.product");
      return existingCustomer;
    } catch (error) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Find Customer"
      );
    }
  }

  async Wishlist(customerId) {
    try {
      const profile = await CustomerModel.findById(customerId).populate(
        "wishlist"
      );
      return profile.wishlist;
    } catch (error) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Get Wishlist"
      );
    }
  }

  async AddWishlistItem(customerId, product) {
    try {
      const profile = await CustomerModel.findById(customerId).populate(
        "wishlist"
      );
      if (profile) {
        let wishlist = profile.wishlist;

        if (wishlist.length > 0) {
          let isExist = false;
          wishlist.map((item) => {
            if (item._id.toString() === product._id.toString()) {
              const index = wishlist.indexOf(item);
              wishlist.splice(index, 1);
              isExist = true;
            }
          });
          if (!isExist) {
            wishlist.push(product);
          }
        } else {
          wishlist.push(product);
        }

        profile.wishlist = wishlist;
      }
    } catch (error) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Create Customer"
      );
    }
  }

  async AddOrderToProfile(customerId, order) {
    try {
      const profile = await CustomerModel.findById(customerId);

      if (profile) {
        if (profile.orders === undefined) {
          profile.orders = [];
        }
        profile.orders.push(order);

        profile.cart = [];

        const profileResult = await profile.save();
        return profileResult;
      }

      throw new Error("Unable to add order");
    } catch (error) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Create Customer"
      );
    }
  }
}

module.exports = CustomerRepository;
