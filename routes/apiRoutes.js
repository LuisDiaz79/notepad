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

router.put("/api/notes/:note", function(req, res){
    console.log(req.body);
    console.log(req.params.id);
    connection.query("UPDATE notes SET ? WHERE id = ?", [req.body, req.body.id], function(err, result) {
        if (err) console.log(err);
    
        console.log(result);
        res.json(result);
      });
});
router.delete("/api/notes/:note", function(req, res){
    console.log(req.body);
    console.log(req.params.id);
    
});

module.exports = router;