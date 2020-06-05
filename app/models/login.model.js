const sql = require("./db.js");

const Login = function(user) {
    this.email = user.email;
    this.password = user.password;
  };

  Login.login = (newUser, result) => {
    console.log(newUser.email);

    
    sql.query(`SELECT * FROM users WHERE (email = "${newUser.email}" AND password ="${newUser.password}")`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created customer: ", { data:res,status: 200, message:"login successful" });
      result(null, { data:res,status: 200, message:"login successful" });
    });
  }

  module.exports = Login;
  