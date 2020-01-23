const express = require('express');

module.exports = app => {
    app.use(express.static(__dirname + "/static"));
    app.set('view engine','ejs');
    app.set('views',__dirname + "/views");
    app.use(express.urlencoded({extended:true}));
    app.use(express.json());
}

