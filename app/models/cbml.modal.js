
const sql = require("./db.js");
const { base64encode, base64decode } = require('nodejs-base64');

const cbml = function(selection) {
    this.selectedvalue = selection.selectedvalue;
    this.pid = selection.pid;
    this.activecontext = selection.activecontext;
    this.cbmltoken = selection.cbmltoken;
  };

  cbml.cbmlfn = (data, result) => {


    if(data.cbmltoken != ""){
        var responseData = JSON.parse(base64decode(data.cbmltoken));
    }else {
        console.log("ankur")
        var responseData = {
            parentcontext:"order-pizza",
            nextcontext:"order-pizza"
        }
        data.selectedvalue = "";
    }
    
   
    console.log(responseData);
    console.log(responseData.parentcontext,responseData.activecontext,data.selectedvalue)
    sql.query(`SELECT * FROM cbmltable WHERE (parentcontext = "${responseData.parentcontext}" AND activecontext = "${responseData.nextcontext}" AND subcontext ="${data.selectedvalue}")`, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
        console.log(res)
        const responseQuery = JSON.parse(JSON.stringify(res))[0];
        var btnOptions = responseQuery.flowanswers.split(' | ');
        var btnOptionsCode = responseQuery.childcontexts.split(' | ');
        var mediaFiles = responseQuery.multimedialinks.split(' | ');
        mainArrySend=[];
    

        btnOptions.forEach(function (value, i) {
            let reply = {
                label : btnOptions[i] ? btnOptions[i].trim():"",
                code : btnOptionsCode[i] ? btnOptionsCode[i].trim():"",
                mediaLink: mediaFiles[i]? mediaFiles[i].trim():""
            }
            mainArrySend.push(reply)
            
        });
        // console.log(mainArrySend);
        // for(let btn of btnOptions) {
        //     let reply = {
        //         label : btn,
        //         code : code
        //     }
        //     console.log(reply);
        // }
        var bse64Raw =base64encode(JSON.stringify(responseQuery));
        result(null, { reply:responseQuery.reply,botactions: mainArrySend,cbmltoken :bse64Raw
    });
      });  
  }

  module.exports = cbml;

  