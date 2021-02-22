const request = require("request");
const express = require("express");

const app = express();
const port = process.env.PORT || 8080;

const use = (path, uriBase) => {
  app.use(path, (req, res, next) => {
    var method, r;
    method = req.method.toLowerCase().replace(/delete/, "del");
    switch (method) {
      case "get":
      case "post":
      case "del":
      case "put":
        const json = req.body;
        const uri = uriBase + req.baseUrl;
        r = request[method]({
          uri: uri,
          qs: req.query,
          json: json
        });
        console.log(
          req.baseUrl + " -> " + method + ": " + uri + " " + (json ? json : "")
        );
        break;
      default:
        return res.send("invalid method");
    }
    return req.pipe(r).pipe(res);
  });
};

use("/*", "http://127.0.0.1:7505");

app.listen(port, function() {
  console.log("Express at port", port);
});

process.on("uncaughtException", err => {});