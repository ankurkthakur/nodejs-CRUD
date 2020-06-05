module.exports = app => {
  const customers = require("../controllers/customer.controller.js");

  app.post("/login",customers.login);
  // Create a new Customer
  app.post("/register", customers.create);

  // Retrieve all Customers
  app.get("/users", customers.findAll);

  // Retrieve a single Customer with customerId
  app.get("/users/:customerEmail", customers.findOne);

  // Update a Customer with customerId
  app.put("/customers/:customerId", customers.update);

  // Delete a Customer with customerId
  app.delete("/customers/:customerId", customers.delete);

  // Create a new Customer
  app.delete("/customers", customers.deleteAll);
};
