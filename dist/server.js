'use strict';

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;

var Resource = require('./resource.js');
var Category = require('./category.js');
module.exports = 'babel-polyfill';
var SourceMapSupport = require('source-map-support');
var ObjectId = require('mongodb').ObjectID;
// import express from 'express';
// import bodyParser from 'body-parser';
// import { MongoClient } from 'mongodb';
// import Resource from './resource.js';
// import SourceMapSupport from 'source-map-support';
SourceMapSupport.install();
var app = express();

app.use(express.static('static'));
app.use(bodyParser.json());
var db;

if (process.env.NODE_ENV !== 'production') {
    var webpack = require('webpack');
    var webpackDevMiddleware = require('webpack-dev-middleware');
    var webpackHotMiddleware = require('webpack-hot-middleware');

    var config = require('../webpack.config');
    config.entry.app.push('webpack-hot-middleware/client', 'webpack/hot/only-dev-server');
    config[new webpack.HotModuleReplacementPlugin()];

    var bundler = webpack(config);
    app.use(webpackDevMiddleware(bundler, { noInfo: true }));
    app.use(webpackHotMiddleware(bundler, { log: console.log }));
}
//commented out because error shown in resourcelist api calls
// app.get('*', (req,res) => {
//     res.sendFile(path.resolve('static/index.html'));
// });

app.get('/api/resources', function (req, res) {
    console.log('resources got.');
    var filter = {};
    if (req.query.category) filter.category = req.query.category;
    if (req.query.isActive) filter.isActive = req.query.isActive;
    db.collection('resources').find(filter).toArray().then(function (resources) {
        var metadata = { total_count: resources.length };
        res.json({ _metadata: metadata, records: resources });
    }).catch(function (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error: ' + error });
    });
});

app.post('/api/resources', function (req, res) {
    var newResource = req.body;
    newResource.created = new Date();
    if (!newResource.status) newResource.status = 'New';
    var err = Resource.validateResource(newResource);
    if (err) {
        res.status(422).json({ message: 'Invalid request: ' + err });
        return;
    }
    db.collection('resources').insertOne(Resource.cleanupResource(newResource)).then(function (result) {
        return db.collection('resources').find({ _id: result.insertedId }).limit(1).next();
    }).then(function (newResource) {
        res.json(newResource);
    }).catch(function (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error: ' + error });
    });
    // resources.push(newResource);
    //  res.json(newResource);
});

app.get('/api/resources/:id', function (req, res) {
    var resourceId = void 0;
    try {
        resourceId = new ObjectId(req.params.id);
    } catch (error) {
        res.status(422).json({ message: 'Invalid resource ID format: ' + error });
        return;
    }

    db.collection('resources').find({ _id: resourceId }).limit(1).next().then(function (resource) {
        if (!resource) res.status(404).json({ message: 'No resource exists: ' + resourceId });else res.json(resource);
    }).catch(function (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error: ' + error });
    });
});

app.put('/api/resources/:id', function (req, res) {
    var resourceId = void 0;
    try {
        resourceId = new ObjectId(req.params.id);
    } catch (error) {
        res.status(422).json({ message: 'Invalid resource ID format: ' + error });
        return;
    }

    var resource = req.body;
    delete resource._id;

    var err = Resource.validateResource(resource);
    if (err) {
        res.status(422).json({ message: 'Invalid request: ' + err });
        return;
    }

    db.collection('resources').update({ _id: resourceId }, Resource.convertResource(resource)).then(function () {
        return db.collection('resources').find({ _id: resourceId }).limit(1).next();
    }).then(function (savedResource) {
        res.json(savedResource);
    }).catch(function (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error: ' + error });
    });
});

app.delete('/api/resources/:id', function (req, res) {
    var resourceId = void 0;
    try {
        resourceId = new ObjectId(req.params.id);
    } catch (error) {
        console.log(error);
        res.status(422).json({ message: 'Invalid resource ID format: ' + error });
        return;
    };

    db.collection('resources').deleteOne({ _id: resourceId }).then(function (deleteResult) {
        if (deleteResult.result.n === 1) res.json({ status: 'OK' });else res.json({ status: 'Warning: object not found.' });
    }).catch(function (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error: ' + error });
    });
});

app.get('/api/categories', function (req, res) {
    console.log('categories got.');
    //const filter = {};
    db.collection('categories').find().toArray().then(function (categories) {
        var metadata = { total_count: categories.length };
        res.json({ _metadata: metadata, records: categories });
    }).catch(function (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error: ' + error });
    });
});

app.post('/api/categories', function (req, res) {
    var newCategory = req.body;
    newCategory.created = new Date();
    if (!newCategory.status) newCategory.status = 'New';
    var err = Category.validateCategory(newCategory);
    if (err) {
        res.status(422).json({ message: 'Invalid request: ' + err });
        return;
    }
    db.collection('categories').insertOne(Category.cleanupCategory(newCategory)).then(function (result) {
        return db.collection('categories').find({ _id: result.insertedId }).limit(1).next();
    }).then(function (newCategory) {
        res.json(newCategory);
    }).catch(function (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error: ' + error });
    });
});

app.delete('/api/categories/:id', function (req, res) {
    var categoryId = void 0;
    try {
        categoryId = new ObjectId(req.params.id);
    } catch (error) {
        console.log(error);
        res.status(422).json({ message: 'Invalid resource ID format: ' + error });
        return;
    };

    db.collection('categories').deleteOne({ _id: categoryId }).then(function (deleteResult) {
        if (deleteResult.result.n === 1) res.json({ status: 'OK' });else res.json({ status: 'Warning: object not found.' });
    }).catch(function (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error: ' + error });
    });
});

MongoClient.connect('mongodb://localhost/fred').then(function (connection) {
    db = connection;
    app.listen(3000, function () {
        console.log('App started on port 3000');
    });
}).catch(function (error) {
    console.log("ERROR", error);
});
//# sourceMappingURL=server.js.map