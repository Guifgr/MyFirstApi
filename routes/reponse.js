const express = require("express")
const router = express.Router();
var https = require("https");

router.post('/' , (req, res)=>{
    var userName= req.body.userName;
    var options = {

        host:'api.github.com',
        path: '/users/' + userName,
        method: 'GET',
        headers: {'user-agent':'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0)'}
    };
    var request = https.request(options, function(response){
    var body = '';
    response.on('data',function(chunk){
        body+=chunk;
    });
    response.on('end',function(){
        var json = JSON.parse(body);
        console.log(json)
        res.render("response", {json})
    });

    });
    request.on('error', function(e) {
    console.error('and the error is '+e);
    });
    request.end();

})

module.exports = router