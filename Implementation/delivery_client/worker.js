const {
  Client,
  logger,
  Variables,
} = require("camunda-external-task-client-js");
//const open = require('open');
const config = {
  baseUrl: "http://localhost:8080/engine-rest",
  use: logger,
  asyncResponseTimeout: 10000,
};
// create a Client instance with custom configuration
const client = new Client(config);
var RESTClient = require("node-rest-client").Client;
var restclient = new RESTClient();

// susbscribe to the topic
client.subscribe("get-swabs", async function ({ task, taskService }) {
  console.log(`Sending swabs request to Supplierly...`);
  const processVariables = new Variables();
  const localVariables = new Variables();
  var args = {
    headers: { "Content-Type": "application/json" },
  };

  // direct way
  restclient.get(
    "http://localhost:9090/supplierly/swabs",
    args,
    function (data, response) {
      // parsed response body as js object
      processVariables.set(
        `product`,
        `Id: ${data.id}, Unitary price: ${data.price}€, Availability: ${data.availability}`
      );

      // raw response
      console.log("> Swabs availability successfully received ");
      console.log(
        "> Supplierly swabs:\n-Id: " +
          data.id +
          "\n-Price: " +
          data.price +
          "\n-Availability: " +
          data.availability
      );
      // Complete the task
      taskService.complete(task, processVariables, localVariables);
    }
  );
});

// susbscribe to the topic
client.subscribe("post-order", async function ({ task, taskService }) {
  // Get process variables
  const q1 = task.variables.get("quantity");
  const iban = task.variables.get("iban");
  const cost = task.variables.get("cost");
  const date = task.variables.get("date");
  console.log(`Sending raw material order request to Supplierly...`);
  const processVariables = new Variables();
  const localVariables = new Variables();
  var args = {
    data: {
      swabs: {
        id: 0,
        quantity: q1,
      },
      iban: iban,
      cost: cost,
      deliveryDate: date,
    },

    headers: { "Content-Type": "application/json" },
  };

  // direct way
  restclient.post(
    "http://localhost:9090/supplierly/order",
    args,
    function (data, response) {
      // parsed response body as js object
      processVariables.set("deliveryDate", date);
      processVariables.set("stockCost", data.cost);
      processVariables.set("iban", iban);

      // raw response
      console.log(
        "> Swab order request accepted. \n-Total cost: " +
          data.cost +
          "\n-Delivery date: " +
          date
      );

      // Complete the task
      taskService.complete(task, processVariables, localVariables);
    }
  );
});

// susbscribe to the topic
client.subscribe("post-payment", async function ({ task, taskService }) {
  // Get process variables
  const cost = task.variables.get("stockCost");
  const iban = task.variables.get("iban");
  console.log(
    `Sending payment request to Bankly... \n> Bank account details: \n-IBAN: ${iban}, \n-Amount: ${cost}`
  );
  const processVariables = new Variables();
  const localVariables = new Variables();
  var args = {
    data: { iban: iban, amount: cost },
    headers: { "Content-Type": "application/json" },
  };
  // direct way
  restclient.post(
    "http://localhost:9090/bankly/payment",
    args,
    function (data, response) {
      // raw response
      console.log("> Payment successfully issued.");
      // Complete the task
      taskService.complete(task, processVariables, localVariables);
    }
  );
});

// susbscribe to the topic
client.subscribe("post-analysis", async function ({ task, taskService }) {
  const processVariables = new Variables();
  const localVariables = new Variables();
  const name = task.variables.get("name");
  const surname = task.variables.get("surname");
  const ssn = task.variables.get("ssn");
  const date = task.variables.get("date");
  const deliveryDate = task.variables.get("deliveryDate");
  const mail = task.variables.get("mail");

  var args = {
    data: {
      name: name,
      surname: surname,
      ssn: ssn,
      date: date,
      mail: mail,
      deliveryDate: deliveryDate,
    },
    headers: { "Content-Type": "application/json" },
  };

  // direct way
  restclient.post(
    "http://localhost:9090/analyzely/analyze",
    args,
    function (data, response) {
      // parsed response body as js object
      processVariables.set("name", data.name);
      processVariables.set("surname", data.surname);
      processVariables.set("ssn", data.ssn);
      processVariables.set("deliveryDate", data.date);
      processVariables.set("mail", data.mail);
      processVariables.set("status", "processing");
      processVariables.set("swabResult", "not analyzed");

      // raw response
      console.log("> Data sent for: " + data.name + " " + data.surname);
      console.log(
        "> Data:\n-SSN: " +
          data.ssn +
          "\n-Date: " +
          data.date +
          "\n-Mail: " +
          data.mail
      );

      // Complete the task
      taskService.complete(task, processVariables, localVariables);
    }
  );
});

client.subscribe("get-result", async function ({ task, taskService }) {
  const processVariables = new Variables();
  const localVariables = new Variables();
  const ssn = task.variables.get("ssn");
  var args = {
    data: {
      ssn: ssn,
    },
    headers: { "Content-Type": "application/json" },
  };

  // direct way
  restclient.get(
    `http://localhost:9090/analyzely/analyze/"${ssn}"`,
    args,
    function (data, response) {
      processVariables.set("swabResult", data.swabResult);

      // raw response
      console.log("> Swab Result: " + data.swabResult);

      // Complete the task
      taskService.complete(task, processVariables, localVariables);
    }
  );
});
