"use strict";

/**
 * Get the catalogue of the available raw materials
 * This API allows to get the catalogue of the available raw materials
 *
 * returns Catalogue
 **/
exports.getSwabs = function () {
  return new Promise(function (resolve, reject) {
    var swabStock = {
      id: 0,
      price: 10,
      availability: 100,
    };
    console.log("=====Supplierly=====");
    console.log("> Swabs inventory status sent ");
    resolve(swabStock);
  });
};

/**
 * Place a raw material order to Supplierly
 * This API allows to submit a raw material order
 *
 * body OrderRequest Details of the order to be placed
 * returns Order
 **/
exports.orderSwabs = function ({ swabs }) {
  return new Promise(function (resolve, reject) {
    var computedPrice = 0;
    const price = 10;
    computedPrice += price * swabs.quantity;
    var order = {
      deliveryDate: "01/09/2022",
      cost: computedPrice,
      iban: "IT78-F569-3411-1000-0000-0145-123",
      swabs: swabs,
    };
    console.log("=====Supplierly=====");
    console.log("> Swab order request received.");
    console.log("> Ordered swabs: " + swabs.quantity);
    resolve(order);
  });
};
