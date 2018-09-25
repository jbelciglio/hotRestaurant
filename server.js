var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/add", function (req, res) {
    res.sendFile(path.join(__dirname, "add.html"));
});
app.get("/view", function (req, res) {
    res.sendFile(path.join(__dirname, "view.html"));
});



var tables = [
    {
        name: "table1",
        res_name: "Vernie",
        email: "test@gmail.com",
        phone: "123-456-7890"
    },
    {
        name: "table2",
        res_name: "Marko",
        email: "test2@gmail.com",
        phone: "867-534-0923"
    }
]
var waitlist = [];
app.get("/api/tables", function (req, res) {
    return res.json(tables);
});

app.get("/api/tables/:table", function (req, res) {
    var chosen = req.params.table;

    console.log(chosen);

    for (var i = 0; i < tables.length; i++) {
        if (chosen === tables[i].name) {
            return res.json(tables[i]);
        }
    }

    return res.json(false);
});

app.post("/api/tables", function (req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body-parser middleware
    var newtable = req.body;

    // Using a RegEx Pattern to remove spaces from newCharacter
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    // newtable.res_name.replace(/\s+/g, "").toLowerCase();

    console.log(newtable);
    if (tables.length < 3) {
        tables.push(newtable);
        console.log("pushed into tables");
        console.log(tables);
    }
    else {
        waitlist.push(newtable);
        console.log("pushed into waitlist");
        console.log(waitlist);
    }

    res.json(newtable);
});

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});