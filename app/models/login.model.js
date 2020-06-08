const sql = require("./db.js");
var jwt = require('jsonwebtoken');

const Login = function(user) {
    this.email = user.email;
    this.password = user.password;
  };

  Login.login = (newUser, result) => {
    console.log(newUser.email);

    
    sql.query(`SELECT email,name,phone,active,profileImg FROM users WHERE (parentcontext = "${newUser.parentcontext}" AND activecontext = "${newUser.activecontext}" AND password ="${newUser.activecontext}")`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if(res.length != 0){
        console.log(res) 
        const jwtToken  = jwt.sign({res}, 'shhhhh')
        // console.log("created customer: ", { data:res});
        result(null, { token:jwtToken,status: 200, message:"login successful" });
      }else{
        result(null, { message:"invalid user" });
      }
     
    });
  }

  module.exports = Login;
  