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
    var analysis = [
      {
        name: "Mario",
        surname: "Rossi",
        mail: "mario.rossi100@gmail.com",
        ssn: "MRARSS97H28C933E",
        date: "28/6/2022",
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
exports.handleAnalysis = function (body) {
  return new Promise(function (resolve, reject) {
    resolve({
      name: body.name,
      surname: body.surname,
      mail: body.mail,
      ssn: body.ssn,
      date: body.date,
      status: "processing",
      swabResult: "not analyzed",
    });
  });
};