const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.get("/",function(req,res){
    res.sendFile(__dirname + "/signup.html");

});

app.post("/", function(req, res){
    var firstname =  req.body.fName;
    var lastname = req.body.lName;
    var email = req.body.email;

    var data = {
        members:[
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstname,
                    LNAME: lastname
                }
            }
        ]
    };
    const jsdonData = JSON.stringify(data);
    const url = "https://us11.api.mailchimp.com/3.0/lists/a0f453a210";
    const options = {
        method: "POST",
        auth: "dhruv1:eddf510c5e0351e438cd92bed6733c4c-us11"
    }


    const request = https.request(url, options, function(response){

        if(response.statusCode=== 200){
            console.log("success");
            res.sendFile(__dirname + "/success.html");

        }
        else{
            res.sendFile(__dirname + "/failure.html");
            
        }
        console.log("dawjkbdkbawdkwak");
            response.on("data",function(data){
                console.log(JSON.parse(data));
            });
    });

    request.write(jsdonData);
    request.end();
});

app.post("/failure", function(req,res){

    res.redirect("/");
});



app.listen(process.env.PORT || 3000, function(){
    console.log("helllo world");
});


//list id- a0f453a210

// 