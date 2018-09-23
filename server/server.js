const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
import path from 'path';
const Resource = require('./resource.js');
const Category = require('./category.js');
module.exports = 'babel-polyfill';
const SourceMapSupport = require('source-map-support');
const ObjectId = require('mongodb').ObjectID;
// import express from 'express';
// import bodyParser from 'body-parser';
// import { MongoClient } from 'mongodb';
// import Resource from './resource.js';
// import SourceMapSupport from 'source-map-support';
SourceMapSupport.install();
const app = express();

app.use(express.static('static'));
app.use(bodyParser.json());
var db;

if(process.env.NODE_ENV !== 'production') {
    const webpack = require('webpack');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');

    const config = require('../webpack.config');
    config.entry.app.push('webpack-hot-middleware/client', 'webpack/hot/only-dev-server');
    config[new webpack.HotModuleReplacementPlugin()];

    const bundler = webpack(config);
    app.use(webpackDevMiddleware(bundler, {noInfo:true}));
    app.use(webpackHotMiddleware(bundler, {log:console.log}));
}
//commented out because error shown in resourcelist api calls
// app.get('*', (req,res) => {
//     res.sendFile(path.resolve('static/index.html'));
// });

app.get('/api/resources', (req, res) => {
    console.log('resources got.');
    const filter = {};
    if (req.query.category) filter.category = req.query.category;
    if(req.query.isActive) filter.isActive = req.query.isActive;
    db.collection('resources').find(filter).toArray().then(resources => {
        const metadata = { total_count: resources.length };
        res.json({_metadata: metadata, records: resources});
    }).catch(error => {
        console.log(error);
        res.status(500).json({message:`Internal Server Error: ${error}`});
    });
});

app.post('/api/resources', (req, res) => {
    const newResource = req.body;
    newResource.created = new Date();
    if (!newResource.status) newResource.status = 'New';
    const err = Resource.validateResource(newResource);
    if (err) {
        res.status(422).json({message:`Invalid request: ${err}`});
        return;
    }
    db.collection('resources').insertOne(Resource.cleanupResource(newResource))
    .then(result => db.collection('resources').find({_id: result.insertedId}).limit(1).next()
).then(newResource => {
    res.json(newResource);
}).catch(error => {
    console.log(error);
    res.status(500).json({message: `Internal Server Error: ${error}`});
});
   // resources.push(newResource);
  //  res.json(newResource);
});

app.get('/api/resources/:id', (req,res) => {
    let resourceId;
    try {
        resourceId = new ObjectId(req.params.id);
    } catch (error) {
        res.status(422).json({ message: `Invalid resource ID format: ${error }`});
        return;
    }

    db.collection('resources').find({_id: resourceId}).limit(1)
    .next()
    .then(resource => {
        if (!resource) res.status(404).json({message: `No resource exists: ${resourceId}`});
        else res.json(resource);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({message:`Internal Server Error: ${error}`});
    });
});

app.put('/api/resources/:id', (req, res) => {
    let resourceId;
    try {
        resourceId = new ObjectId(req.params.id);
    } catch (error) {
        res.status(422).json({message: `Invalid resource ID format: ${error}`});
        return;
    }

    const resource = req.body;
    delete resource._id;

    const err = Resource.validateResource(resource);
    if (err) {
        res.status(422).json({message:`Invalid request: ${err}`});
        return;
    }

    db.collection('resources').update({_id: resourceId},
    Resource.convertResource(resource)).then(() => 
        db.collection('resources').find({_id: resourceId}).limit(1)
        .next()
    )
    .then(savedResource => {
        res.json(savedResource);
    })
    .catch (error => {
        console.log(error);
        res.status(500).json({message: `Internal Server Error: ${error}`});
    });
});

app.delete('/api/resources/:id', (req,res) => {
    let resourceId;
    try {
        resourceId = new ObjectId(req.params.id);
    } catch (error) {
        console.log(error);
        res.status(422).json({message: `Invalid resource ID format: ${error}`});
        return;
    };

    db.collection('resources').deleteOne({_id: resourceId}).then((deleteResult) => {
        if (deleteResult.result.n === 1) res.json({status: 'OK'});
        else res.json({status: 'Warning: object not found.'});
    })
    .catch( error => {
        console.log(error);
        res.status(500).json({message: `Internal Server Error: ${error}`});
    });
});

app.get('/api/categories', (req, res) => {
    console.log('categories got.');
    //const filter = {};
    db.collection('categories').find().toArray().then(categories => {
        const metadata = {total_count: categories.length};
        res.json({_metadata: metadata, records: categories});
    }).catch(error => {
        console.log(error);
        res.status(500).json({message: `Internal Server Error: ${error}`});
    });
});

app.post('/api/categories', (req, res) => {
    const newCategory = req.body;
    newCategory.created = new Date();
    if (!newCategory.status) newCategory.status = 'New';
    const err = Category.validateCategory(newCategory);
    if (err) {
        res.status(422).json({message: `Invalid request: ${err}`});
        return;
    }
    db.collection('categories').insertOne(Category.cleanupCategory(newCategory))
    .then(result => db.collection('categories').find({_id: result.insertedId}).limit(1).next()
).then(newCategory => {
    res.json(newCategory);
}).catch(error => {
    console.log(error);
    res.status(500).json({message: `Internal Server Error: ${error}`});
});
});

app.delete('/api/categories/:id', (req, res) => {
    let categoryId;
    try {
        categoryId = new ObjectId(req.params.id);
    } catch (error) {
        console.log(error);
        res.status(422).json({message: `Invalid resource ID format: ${error}`});
        return;
    };

    db.collection('categories').deleteOne({_id: categoryId}).then((deleteResult) => {
        if (deleteResult.result.n === 1) res.json({status: 'OK'});
        else res.json({status: 'Warning: object not found.'});
    })
    .catch( error => {
        console.log(error);
        res.status(500).json({message: `Internal Server Error: ${error}`});
    });
});

MongoClient.connect('mongodb://localhost/fred').then(connection => {
    db = connection;
    app.listen(3000, function(){
    console.log('App started on port 3000');
    });
}).catch(error => {
    console.log("ERROR", error);
});