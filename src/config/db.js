const sqlite = require("sqlite3").verbose();
const db = new sqlite.Database("./database.db")

db.run(`
    CREATE TABLE IF NOT EXISTS users (
    ID INTEGER PRIMARY KEY AUTOINCREMENT
    ,name TEXT,
     email TEXT UNIQUE)`);



module.exports = db;