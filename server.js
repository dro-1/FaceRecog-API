const express = require('express');
const bodyParser  = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const signin = require('./controllers/handleSignIn');
const register = require('./controllers/handleRegister');
const profile = require('./controllers/handleProfile');
const image = require('./controllers/handleImage');
const clarifaiEndpoint = require('./controllers/handleClarifaiCall');

const db = knex({
    client: 'pg',
    connection:{
        connectionString: process.env.DATABASE_URL,
        ssl: true
    }
})

const app = express();



app.use(bodyParser.json());
app.use(cors());

app.get('/',(req,res)=> res.json('Connected to server'));

app.post('/signin',(req,res)=>{ signin.handleSignIn(req,res,db,bcrypt)});

app.post('/register',(req,res)=>{ register.handleRegister(req,res,db,bcrypt)});

app.get('/profile/:id',(req,res)=>{ profile.handleProfile(req,res,db)});

app.put('/image',(req,res)=>{ image.handleImage(req,res,db)});

app.put('/imageDetection',(req,res)=>{ console.log(req.body);clarifaiEndpoint.handleClarifaiCall(req,res) })

app.listen(process.env.PORT || 3000,()=>{
    console.log(`App running on port ${process.env.PORT}`)
});