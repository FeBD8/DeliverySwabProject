"use strict";

var utils = require("../utils/writer.js");
var Analyzely = require("../service/AnalyzelyService");

module.exports.getAnalysisDetails = function getAnalysisDetails(
  req,
  res,
  next,
  id
) {
  Analyzely.getAnalysisDetails(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.handleAnalysis = function handleAnalysis(req, res, next, body) {
  Analyzely.handleAnalysis(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
