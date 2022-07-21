"use strict";

/**
 * Emit a payment
 * This API allows to emit a payment
 *
 * body PaymentRequest Details of the payment to be placed
 * no response value expected for this operation
 **/
exports.emitPayment = function (data) {
  return new Promise(function (resolve, reject) {
    console.log("=======Bankly=======");
    console.log("> Payment issued: " + data.amount + "€");
    resolve();
  });
};
