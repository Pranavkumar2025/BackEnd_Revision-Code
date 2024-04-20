"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var app = (0, express_1.default)();
var server = require('./MOCK_DATA.json'); // Assuming you have defined types for your server data
app.get('/', function (req, res) {
    return res.json(server);
});
app.listen(3000, function () {
    console.log("Server is running at port 3000");
});
