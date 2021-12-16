var express = require('express');
var app = express();

//serve static files from public directory
app.use(express.static('public'));

app.get('/', function (req, res) {
    res.send('Hello World!')
})

app.listen(3000, function(){
    console.log('running on port 3000')
})