const db = require("../config/db");

exports.getAllUsers = (req, res) => {
  db.all(`SELECT * FROM users`, (err,rows) => {
    if(err) return res.status(500).send({error: "Error al obtener los usuarios"});
    res.json(rows);
  });
};

exports.createUser = (req, res) => {
  const {name, email} = req. body;

  if(!name || !email) {
    return  res.status(400).json({error: "Faltan datos obligatorios"});
  }

  db.run(`INSERT INTO users (name, email) VALUES (?,?)`, [name, email], function(err) {
    if(err) return res.status(500).json({error: err.message});
    res.status(201).json({ success: true, message: "Usuario guardado correctamente", id: this.lastID });
  })
}

exports.updateUser = (req, res) => {
  const {id} = req.params;
  const {name, email} = req.body; 

  db.run(`UPDATE users SET name = ?, email = ? WHERE ID = ?`, [name, email, id], function(err) {
    if(err) return res.status(500).json({error: err.message});
    if(this.changes === 0) return res.status(404).json({error: "Usuario no encontrado"});
    res.json({ success: true, message: "Usuario actualizado correctamente"});
  })
};

exports.deleteUser = (req, res) => {
  const {id} = req.params;

  db.run(`DELETE FROM users WHERE ID = ?`, [id], function(err) {
    if (err) return res.status(500).json({error: err.message});
    if (this.changes === 0) {
      return res.status(404).json({error: "Usuario no encontrado"});
    }
    res.json({ success: true, message: "Usuario eliminado correctamente"});
  })
}