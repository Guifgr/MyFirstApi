const { Router } = require('express');
const PORT = process.env.PORT || 5000
const express = require('express');
const app = express();
const responseRouter = require('./routes/reponse')
const bodyParser = require('body-parser')



app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res)=>{
    res.render("index")
})
app.use("/response", responseRouter);
app.listen(PORT)