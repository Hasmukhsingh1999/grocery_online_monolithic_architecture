const express = require('express')

const cors=require('cors');

module.exports = async(app)=>{
    app.use(express.json());
    app.use(express.urlencoded({extended:true}));
    app.use(cors())
    app.use(express(__dirname + "/public"))
}