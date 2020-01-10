var mysql_obj = require('mysql');
var config = require('../config/config');

class Adherents {
    constructor() {
        this.mysql = mysql_obj.createConnection(config.adherents_mysql);
        this.connect();
    }

    connect = () => {
        this.mysql.connect((error) => {
            if (error) throw error;
            console.log("[Adherents]: Connected to bask_frequency database.");
        });
    }

    disconnect = () => {
        this.mysql.end(error => {
            if (error) throw error;
            console.log("[Adherents]: Disconnected from bask_frequency database.");
        });
    }

    get = (pushBack) => {
        console.log("[Adherents]: Selecting all...")
        this.mysql.query("SELECT * FROM adherents ORDER BY id DESC", (error, result, fields) => {
            if (error) throw error;
            console.log("[Adherents]: Select success.");
            pushBack(result);
        })
    }

    getById = (adherentId, onError, onSuccess) => {
        console.log("[Adherents]: Selecting adherent with id: ", adherentId);
        this.mysql.query("SELECT * FROM adherents WHERE id=?", adherentId, (error, result, fields) => {
            if (error) throw error;
            if (result.length === 0) {
                onError({"error": "No adherent with id: " + adherentId});
                console.log("[Adherents]: Select error: No adherent with id: ", adherentId);
            } else {
                console.log("[Adherents]: Select success.");
                onSuccess(result);
            }
        });
    }

    insert = (adherent, pushBack) => {
        console.log("[Adherents]: Inserting adherent:", adherent);
        const values = [[adherent.firstname, adherent.lastname, adherent.email, adherent.phone, adherent.donation, adherent.date]];
        const query = "INSERT INTO adherents (firstname, lastname, email, phone, donation, date) VALUES ?";
        this.mysql.query(query, [values], (error, result) => {
            if (error) throw error;
            console.log("[Adherents]: Insert success");
            pushBack({"id": result.insertId});
        });
    }

    update = (adherentId, pushBack) => {
        pushBack({"message": "Adherent update not yet supported."});
    }

    delete = (adherentId, pushBack) => {
        this.getById(adherentId, (error) => {pushBack(error)}, () => {
            console.log("[Adherent]: Deleting adherent with id: ", adherentId);
            this.mysql.query("DELETE FROM adherents WHERE id=?", adherentId, (error) => {
                if (error) throw error;
                console.log("[Adherents]: Delete success");
                pushBack({"message": "Adherent deleted."});
            })
        })
    }
}

module.exports = Adherents;