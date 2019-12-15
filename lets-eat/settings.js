const express = require('express');
const session = require('express-session');

module.exports = app => {
    app.use(express.static( __dirname + '/public/dist/public' ));
    app.use(express.urlencoded({extended:true}));
    app.use(express.json());
    app.use(session({
        cookie:{maxAge:60000},
        resave: false,
        saveUninitialized: true,
        secret: "no secrets"
    }));
}