var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var fs = require('fs')
var app = express()

app.use('/static', express.static(path.join(__dirname, "public")))

app.use('/', express.static(path.join(__dirname, "alex_site")))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/comments.json', function(req, res) {
    fs.readFile('_comments.json', function(err, data){
        res.setHeader('Content-Type', 'application/json');
        res.send(data)
    })
})

app.get('/facts.json', function(req, res){
    console.log('trying to get facts')
    fs.readFile('alex_site/databases/_facts.json', function(err, data){
        res.setHeader('Content-Type', 'application/json');
        res.send(data)
    })
})

app.post('/comments.json', function(req, res){
    fs.readFile('_comments.json', function(err,data){
        var comments = JSON.parse(data)
        comments.push(req.body)
        fs.writeFile('_comments.json', JSON.stringify(comments, null, 4), function(err){
            res.setHeader('Content-Type', 'application/json')
            res.send(JSON.stringify(comments))
        })
    })
})


var server = app.listen(3000, function(){
    var host = server.address().address
    var port = server.address().port
    console.log('Example app listening on http://%s:%s', host, port)
})
