const express = require('express');
const app = express();

//Settings
require('./settings')(app);

//Routes
app.get('/',(req,res)=>{
    res.redirect('http://anthonybotello.com');
});
app.get('/pokedex',(req,res)=>{
    res.render('pokedex');
});
app.get('/trivia',(req,res)=>{
    res.render('trivia');
});
app.get('/blackjack',(req,res)=>{
    res.render('blackjack');
});
app.get('/bubbles/', (req, res) => {
    res.render('bubbles');
});

//Port Number
app.listen(5005);
