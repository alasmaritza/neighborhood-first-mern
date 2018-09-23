/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		0: 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,1]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),

/***/ 1:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(2);

var _react = __webpack_require__(329);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(338);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouter = __webpack_require__(350);

var _ResourceList = __webpack_require__(379);

var _ResourceList2 = _interopRequireDefault(_ResourceList);

var _ResourceEdit = __webpack_require__(383);

var _ResourceEdit2 = _interopRequireDefault(_ResourceEdit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var contentNode = document.getElementById('contents');
var NoMatch = function NoMatch() {
    return _react2.default.createElement(
        'p',
        null,
        'Page Not Found'
    );
};

var RoutedApp = function RoutedApp() {
    return _react2.default.createElement(
        _reactRouter.Router,
        { history: _reactRouter.hashHistory },
        _react2.default.createElement(_reactRouter.Route, { path: '/', component: _ResourceList2.default }),
        _react2.default.createElement(_reactRouter.Route, { path: '/Edit', component: _ResourceEdit2.default }),
        _react2.default.createElement(_reactRouter.Route, { path: '*', component: NoMatch })
    );
};
_reactDom2.default.render(_react2.default.createElement(RoutedApp, null), contentNode);

if (false) {}

/***/ }),

/***/ 379:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(329);

var _react2 = _interopRequireDefault(_react);

__webpack_require__(380);

var _ResourceAdd = __webpack_require__(381);

var _ResourceAdd2 = _interopRequireDefault(_ResourceAdd);

var _ResourceFilter = __webpack_require__(382);

var _ResourceFilter2 = _interopRequireDefault(_ResourceFilter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ResourceTable = function (_React$Component) {
    _inherits(ResourceTable, _React$Component);

    function ResourceTable() {
        _classCallCheck(this, ResourceTable);

        return _possibleConstructorReturn(this, (ResourceTable.__proto__ || Object.getPrototypeOf(ResourceTable)).apply(this, arguments));
    }

    _createClass(ResourceTable, [{
        key: 'render',
        value: function render() {
            var resourceRows = this.props.resources.map(function (resource) {
                return _react2.default.createElement(ResourceRow, { key: resource._id, resource: resource });
            });
            // const borderedStyle = {border: "1px solid #e6e6e6", padding: 4};
            return _react2.default.createElement(
                'table',
                null,
                _react2.default.createElement(
                    'thead',
                    { className: 'border-bottom' },
                    _react2.default.createElement(
                        'tr',
                        null,
                        _react2.default.createElement(
                            'th',
                            null,
                            'Id'
                        ),
                        _react2.default.createElement(
                            'th',
                            null,
                            'Category'
                        ),
                        _react2.default.createElement(
                            'th',
                            null,
                            'Resource Name'
                        ),
                        _react2.default.createElement(
                            'th',
                            null,
                            'Address'
                        ),
                        _react2.default.createElement(
                            'th',
                            null,
                            'Phone'
                        ),
                        _react2.default.createElement(
                            'th',
                            null,
                            'Website'
                        ),
                        _react2.default.createElement(
                            'th',
                            null,
                            'Comments'
                        ),
                        _react2.default.createElement(
                            'th',
                            null,
                            'Created'
                        )
                    )
                ),
                _react2.default.createElement(
                    'tbody',
                    null,
                    resourceRows
                )
            );
        }
    }]);

    return ResourceTable;
}(_react2.default.Component);

var ResourceRow = function (_React$Component2) {
    _inherits(ResourceRow, _React$Component2);

    function ResourceRow() {
        _classCallCheck(this, ResourceRow);

        return _possibleConstructorReturn(this, (ResourceRow.__proto__ || Object.getPrototypeOf(ResourceRow)).apply(this, arguments));
    }

    _createClass(ResourceRow, [{
        key: 'render',
        value: function render() {
            var resource = this.props.resource;
            var address = this.props.resource.address;
            return _react2.default.createElement(
                'tr',
                { className: 'border-bottom' },
                _react2.default.createElement(
                    'th',
                    null,
                    resource._id
                ),
                _react2.default.createElement(
                    'td',
                    null,
                    resource.category
                ),
                _react2.default.createElement(
                    'td',
                    null,
                    resource.name
                ),
                _react2.default.createElement(
                    'td',
                    null,
                    address.address1,
                    ' ',
                    address.address2,
                    ' ',
                    address.city,
                    ', ',
                    address.state,
                    ' ',
                    address.zip
                ),
                _react2.default.createElement(
                    'td',
                    null,
                    resource.phone
                ),
                _react2.default.createElement(
                    'td',
                    null,
                    resource.website
                ),
                _react2.default.createElement(
                    'td',
                    null,
                    resource.comments
                ),
                _react2.default.createElement(
                    'td',
                    null,
                    resource.created ? resource.created.toDateString() : ''
                )
            );
        }
    }]);

    return ResourceRow;
}(_react2.default.Component);

var ResourceList = function (_React$Component3) {
    _inherits(ResourceList, _React$Component3);

    function ResourceList() {
        _classCallCheck(this, ResourceList);

        var _this3 = _possibleConstructorReturn(this, (ResourceList.__proto__ || Object.getPrototypeOf(ResourceList)).call(this));

        _this3.state = { resources: [] };
        _this3.createResource = _this3.createResource.bind(_this3);
        return _this3;
    }

    _createClass(ResourceList, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.loadData();
        }
    }, {
        key: 'loadData',
        value: function loadData() {
            var _this4 = this;

            fetch('api/resources').then(function (response) {
                if (response.ok) {
                    response.json().then(function (data) {
                        console.log('Total count of records:', data._metadata.total_count);
                        data.records.forEach(function (resource) {
                            resource.created = new Date(resource.created);
                        });
                        _this4.setState({ resources: data.records });
                    });
                } else {
                    response.json().then(function (error) {
                        alert("Failed to fetch issues:" + error.message);
                    });
                }
            }).catch(function (err) {
                alert("Error in fetching the data from server:", err);
            });
        }
    }, {
        key: 'createResource',
        value: function createResource(newResource) {
            var _this5 = this;

            fetch('/api/resources', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newResource)
            }).then(function (response) {
                if (response.ok) {
                    response.json().then(function (updatedResource) {
                        updatedResource.created = new Date(updatedResource.created);
                        var newResources = _this5.state.resources.concat(updatedResource);
                        _this5.setState({ resources: newResources });
                    });
                } else {
                    response.json().then(function (error) {
                        alert("Failed to add resource: " + error.message);
                    });
                }
            }).catch(function (err) {
                alert('Error in sending data to the server: ' + err.message);
            });

            // response.json()
            // ).then(updatedResource => {
            //     updatedResource.created = new Date(updatedResource.created);
            //     const newResources = this.state.resources.concat(updatedResource);
            //     this.setState({ resources: newResources});
            // }).catch(err => {
            //     alert("error in sending data to server: " + err.message);
            // });
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'h1',
                    null,
                    'Reources'
                ),
                _react2.default.createElement(_ResourceFilter2.default, null),
                _react2.default.createElement('hr', null),
                _react2.default.createElement(ResourceTable, { resources: this.state.resources }),
                _react2.default.createElement('hr', null),
                _react2.default.createElement(_ResourceAdd2.default, { createResource: this.createResource })
            );
        }
    }]);

    return ResourceList;
}(_react2.default.Component);

exports.default = ResourceList;

/***/ }),

/***/ 381:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(329);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ResourceAdd = function (_React$Component) {
    _inherits(ResourceAdd, _React$Component);

    function ResourceAdd() {
        _classCallCheck(this, ResourceAdd);

        var _this = _possibleConstructorReturn(this, (ResourceAdd.__proto__ || Object.getPrototypeOf(ResourceAdd)).call(this));

        _this.handleSubmit = _this.handleSubmit.bind(_this);
        return _this;
    }

    _createClass(ResourceAdd, [{
        key: 'handleSubmit',
        value: function handleSubmit(e) {
            e.preventDefault();
            var form = document.forms.resourceAdd;
            this.props.createResource({
                category: form.category.value,
                name: form.name.value,
                address: { address1: form.address1.value, address2: form.address2.value, city: form.city.value, state: form.state.value, zip: form.zip.value },
                phone: form.phone.value,
                website: form.website.value,
                comments: form.comments.value,
                created: new Date()
            });
            //clear form
            form.category.value = '';form.name.value = '';
            form.address1.value = '';form.address2.value = '';form.city.value = '';form.state.value = '';form.zip.value = '';
            form.phone.value = '';form.website.value = '';form.comments.value = '';
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'form',
                    { name: 'resourceAdd', onSubmit: this.handleSubmit },
                    _react2.default.createElement('input', { type: 'text', name: 'category', placeholder: 'Category' }),
                    _react2.default.createElement('input', { type: 'text', name: 'name', placeholder: 'Name' }),
                    _react2.default.createElement('input', { type: 'text', name: 'address1', placeholder: '123 Fourth St' }),
                    _react2.default.createElement('input', { type: 'text', name: 'address2', placeholder: 'Suite 666' }),
                    _react2.default.createElement('input', { type: 'text', name: 'city', placeholder: 'Los Angeles' }),
                    _react2.default.createElement('input', { type: 'text', name: 'state', placeholder: 'CA', value: 'CA', disabled: true }),
                    _react2.default.createElement('input', { type: 'text', name: 'zip', placeholder: '90033' }),
                    _react2.default.createElement('input', { type: 'text', name: 'phone', placeholder: '(818) 555-5555' }),
                    _react2.default.createElement('input', { type: 'text', name: 'website', placeholder: 'http://website.com' }),
                    _react2.default.createElement('input', { type: 'text', name: 'comments', placeholder: 'Enter comment here' }),
                    _react2.default.createElement(
                        'button',
                        null,
                        'Add New Resource'
                    )
                )
            );
        }
    }]);

    return ResourceAdd;
}(_react2.default.Component);

exports.default = ResourceAdd;

/***/ }),

/***/ 382:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(329);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ResourceFilter = function (_React$Component) {
    _inherits(ResourceFilter, _React$Component);

    function ResourceFilter() {
        _classCallCheck(this, ResourceFilter);

        return _possibleConstructorReturn(this, (ResourceFilter.__proto__ || Object.getPrototypeOf(ResourceFilter)).apply(this, arguments));
    }

    _createClass(ResourceFilter, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                'This is a placeholder for the resource filter.'
            );
        }
    }]);

    return ResourceFilter;
}(_react2.default.Component);

exports.default = ResourceFilter;

/***/ }),

/***/ 383:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ResourceEdit = function (_React$Component) {
    _inherits(ResourceEdit, _React$Component);

    function ResourceEdit() {
        _classCallCheck(this, ResourceEdit);

        return _possibleConstructorReturn(this, (ResourceEdit.__proto__ || Object.getPrototypeOf(ResourceEdit)).apply(this, arguments));
    }

    _createClass(ResourceEdit, [{
        key: "render",

        //eslint-disable-line
        value: function render() {
            return React.createElement(
                "div",
                null,
                "This is a placeholder for the edit page."
            );
        }
    }]);

    return ResourceEdit;
}(React.Component);

exports.default = ResourceEdit;

/***/ })

/******/ });
//# sourceMappingURL=app.bundle.js.map