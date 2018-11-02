var router = require("express").Router();
var connection = require("../db/connection");

router.get("/api/notes", function (req, res) {

    connection.query("SELECT * FROM notes", function (err, dbTables) {1 
        if (err) {
            console.log(err);
            return res.status(500).end();
        }
        res.json(dbTables);
    });
});

router.post("/api/notes", function(req, res){
    connection.query("INSERT INTO notes SET ?", [req.body], function(err, result) {
        if (err) throw err;
    
        res.json(result);
      });
});

module.exports = router;