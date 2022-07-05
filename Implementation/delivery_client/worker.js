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
      console.log(data);
      processVariables.set(
        `product`,
        `Id: ${data.id}, Unitary price: ${data.price}€, Availability: ${data.availability}`
      );

      // raw response
      console.log("> Swabs availability successfully received ");

      // Complete the task
      taskService.complete(task, processVariables, localVariables);
    }
  );
});

// susbscribe to the topic
client.subscribe("post-order", async function ({ task, taskService }) {
  // Get process variables
  const q1 = task.variables.get("quantity");
  console.log(`Sending raw material order request to Supplierly...`);
  const processVariables = new Variables();
  const localVariables = new Variables();
  var args = {
    data: {
      swabs: {
        id: 0,
        quantity: q1,
      },
    },
    headers: { "Content-Type": "application/json" },
  };

  // direct way
  restclient.post(
    "http://localhost:9090/supplierly/order",
    args,
    function (data, response) {
      // parsed response body as js object
      processVariables.set("deliveryDate", data.deliveryDate);
      processVariables.set("stockCost", data.cost);
      processVariables.set("iban", data.iban);

      // raw response
      console.log("> Swab order request accepted. Total cost: " + data.cost);

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
    `Sending payment request to Bankly... \nBank account details: \n\tIBAN: ${iban}, \n\tAMOUNT:${cost}`
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
  const SSN = task.variables.get("SSN");
  const date = task.variables.get("date");
  const mail = task.variables.get("mail");

  var args = {
    data: {
      name: name,
      surname: surname,
      SSN: SSN,
      date: date,
      mail: mail,
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
      processVariables.set("SSN", data.SSN);
      processVariables.set("date", data.date);
      processVariables.set("mail", data.mail);
      processVariables.set("status", "processing");
      processVariables.set("swabResult", "not analyzed");

      // raw response
      console.log("> Data sent for : " + data.name + " " + data.surname);

      // Complete the task
      taskService.complete(task, processVariables, localVariables);
    }
  );
});

client.subscribe("get-result", async function ({ task, taskService }) {
  const processVariables = new Variables();
  const localVariables = new Variables();
  const SSN = task.variables.get("SSN");
  var args = {
    data: {
      SSN: SSN,
    },
    headers: { "Content-Type": "application/json" },
  };

  // direct way
  restclient.get(
    `http://localhost:9090/analyzely/analyze/"${SSN}"`,
    args,
    function (data, response) {
      processVariables.set("swabResult", data.swabResult);

      // raw response
      console.log("> Swab Result : " + data.swabResult);

      // Complete the task
      taskService.complete(task, processVariables, localVariables);
    }
  );
});
