"use strict";

var utils = require("../utils/writer.js");
var Supplierly = require("../service/SupplierlyService");

module.exports.getSwabs = function getSwabs(req, res, next) {
  Supplierly.getSwabs()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.orderSwabs = function orderSwabs(req, res, next, body) {
  Supplierly.orderSwabs(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
