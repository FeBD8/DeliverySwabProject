"use strict";

/**
 * Get details of an existing shipping request
 * This API allows to get details about a delivery
 *
 * id Integer Delivery identifier
 * returns Delivery
 **/
exports.getAnalysisDetails = function (ssn) {
  return new Promise(function (resolve, reject) {
    console.log("=====Analyzely=====");
    console.log("> Sending the swab result.");
    console.log("===================");
    var analysis = [
      {
        status: "terminated",
        swabResult: "negative",
      },
    ];
    resolve(analysis[0]);
  });
};

/**
 * Make a shipping request to Deliverly
 * This API allows to submit a request for a new delivery
 *
 * body DeliveryRequest Details of the delivery to be placed
 * returns Delivery
 **/
exports.handleAnalysis = function (data) {
  return new Promise(function (resolve, reject) {
    data.status = "processing";
    data.swabResult = "not analyzed";
    console.log("=====Analyzely=====");
    console.log(
      "> Information received about " + data.name + " " + data.surname + ":"
    );
    console.log(
      "-Name: " +
        data.name +
        "\n-Surname: " +
        data.surname +
        "\n-SSN: " +
        data.ssn +
        "\n-Date: " +
        data.date +
        "\n-Mail: " +
        data.mail +
        "\n-Status: " +
        data.status +
        "\n-Result: " +
        data.swabResult
    );
    console.log("===================");
    resolve(data);
  });
};
