var express = require('express');

var router = express.Router();

var burger = require('../models/burger.js')

router.get("/", function(req, res) {
    burger.selectWhere(function(data) {
        var burgerObject = {
            burger: data
        };
        console.log(burgerObject);
        res.render("index", burgerObject);
    });
});

router.post("/", function(req, res) {
    burger.insertOne([
        "burger_name", "devoured"
    ], [
        req.body.burger_name, req.body.devoured
    ], function() {
        res.redirect("/");
    });
});

router.put("/:id", function(req, res) {
    var devoured = "id = " + req.params.id;

    console.log("Devoured", devoured);

    burger.updateOne({
        devoured: req.body.devoured
    }, devoured, function() {
        res.redirect("/");
    });
});

module.exports = router;