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
    var analysis = {
      MRARSS97H28C933E: {
        name: "Mario",
        surname: "Rossi",
        mail: "mario.rossi@gmail.com",
        date: "28/6/2022",
        status: "terminated",
        swabResult: "negative",
      },
      LVGRSS88Y28F979O: {
        name: "Luigi",
        surname: "Verdi",
        mail: "luigi.verdi@gmail.com",
        date: "5/5/2022",
        status: "terminated",
        swabResult: "positive",
      },
      FGAADR22I68F219D: {
        name: "Francesca",
        surname: "Gialli",
        mail: "francesca.gialli@gmail.com",
        date: "2/3/2022",
        status: "terminated",
        swabResult: "negative",
      },
      error: {
        name: "not defined",
        surname: "not defined",
        mail: "not defined",
        date: "not defined",
        status: "not defined",
        swabResult: "not defined",
      },
    };
    if (analysis[ssn] != undefined) resolve(analysis[ssn]);
    else resolve(analysis["error"]);
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
    resolve(data);
  });
};
