const sql = require("./db.js");

// constructor
const user = function(user) {
  this.ID = user.ID;
  this.first_name = user.first_name;
  this.last_name = user.last_name;
  this.gender = user.gender;
  this.email = user.email;
  this.phone = user.phone;
};

user.create = async(newuser) => {
  try{
    let result= await sql.query("INSERT INTO users SET ?", newuser)
    return result
  }catch(error){
    console.log("error: ", err);
    throw new Error(`Error : ${err}`)
  }
};

user.getAll = (result) => {
  let query = "SELECT * FROM users";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, res);
  });
};

user.removeAll = result => {
  sql.query("DELETE FROM users", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} users`);
    result(null, res);
  });
};

module.exports = user;
