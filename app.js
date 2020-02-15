const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cons = require('consolidate')
const dust = require('dustjs-helpers')
const { Pool, Client } = require('pg')

const app = express()

// DB Connect String
const connectionString = "postgres://postgres:admin@localhost/recipebookdb"

// Assign Dust Engine to .dust Files
app.engine('dust', cons.dust)

// Set Default Ext .dust
app.set('view engine', 'dust')
app.set('views', __dirname+'/views')

// Set Public Folder
app.use(express.static(path.join(__dirname, 'public')))

// Body Parser Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))



app.get('/', function(req, res){
    const client = new Client({
        connectionString: connectionString,
    })
    client.connect()

    client.query('SELECT * FROM recipes', (err, result) => {
        res.render('index', { recipes: result.rows})
        client.end()
    })
})

app.post('/add', function(req, res){
    const client = new Client({
        connectionString: connectionString,
    })
    client.connect()

    const text = 'INSERT INTO recipes(name, ingredients, directions) values($1, $2, $3)'
    const values = [req.body.name, req.body.ingredients, req.body.directions]
    client.query(text, values, (err, result) => {
        if (err) {
            console.log(err.stack)
        } else {
            res.redirect('/')
        }
    })
})

app.delete('/delete/:id', function(req, res){
    const client = new Client({
        connectionString: connectionString,
    })
    client.connect()

    const text = 'DELETE FROM recipes WHERE id=$1'
    const values = [req.params.id]
    client.query(text, values, (err, result) => {
        if (err) {
            console.log(err.stack)
        }else{
            res.send(200)
        }
    })
})

app.post('/edit', function(req, res){
    const client = new Client({
        connectionString: connectionString,
    })
    client.connect()

    const text = 'UPDATE recipes SET name=$1, ingredients=$2, directions=$3 WHERE id=$4'
    const values = [req.body.name, req.body.ingredients, req.body.directions, req.body.id]
    client.query(text, values, (err, result) => {
        if (err) {
            console.log(err.stack)
        } else {
            res.redirect('/')
        }
    })
})

// Server
app.listen(3000, function(){
    console.log("Server started on port 3000")
})