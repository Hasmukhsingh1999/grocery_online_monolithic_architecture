const { CustomerRepository } = require("../database");
const {
  FormateData,
  GeneratePassword,
  GenerateSalt,
  GenerateSignature,
  ValidPassword,
} = require("../utils");
const { APIError } = require("../utils/app-errors");

class CustomerService {
  constructor() {
    this.repository = new CustomerRepository();
  }

  async SignIn(userInputs) {
    const { email, password } = userInputs;
    try {
        // const existingUser = await this.repository.
    } catch (error) {
        
    }
  }
}
