'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ResourceAdd = require('./ResourceAdd.jsx');

var _ResourceAdd2 = _interopRequireDefault(_ResourceAdd);

var _ResourceFilter = require('./ResourceFilter.jsx');

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
                return React.createElement(ResourceRow, { key: resource._id, resource: resource });
            });
            // const borderedStyle = {border: "1px solid #e6e6e6", padding: 4};
            return React.createElement(
                'table',
                null,
                React.createElement(
                    'thead',
                    { className: 'border-bottom' },
                    React.createElement(
                        'tr',
                        null,
                        React.createElement(
                            'th',
                            null,
                            'Id'
                        ),
                        React.createElement(
                            'th',
                            null,
                            'Category'
                        ),
                        React.createElement(
                            'th',
                            null,
                            'Resource Name'
                        ),
                        React.createElement(
                            'th',
                            null,
                            'Address'
                        ),
                        React.createElement(
                            'th',
                            null,
                            'Phone'
                        ),
                        React.createElement(
                            'th',
                            null,
                            'Website'
                        ),
                        React.createElement(
                            'th',
                            null,
                            'Comments'
                        ),
                        React.createElement(
                            'th',
                            null,
                            'Created'
                        )
                    )
                ),
                React.createElement(
                    'tbody',
                    null,
                    resourceRows
                )
            );
        }
    }]);

    return ResourceTable;
}(React.Component);

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
            return React.createElement(
                'tr',
                { className: 'border-bottom' },
                React.createElement(
                    'th',
                    null,
                    resource._id
                ),
                React.createElement(
                    'td',
                    null,
                    resource.category
                ),
                React.createElement(
                    'td',
                    null,
                    resource.name
                ),
                React.createElement(
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
                React.createElement(
                    'td',
                    null,
                    resource.phone
                ),
                React.createElement(
                    'td',
                    null,
                    resource.website
                ),
                React.createElement(
                    'td',
                    null,
                    resource.comments
                ),
                React.createElement(
                    'td',
                    null,
                    resource.created ? resource.created.toDateString() : ''
                )
            );
        }
    }]);

    return ResourceRow;
}(React.Component);

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
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'h1',
                    null,
                    'Reources'
                ),
                React.createElement(_ResourceFilter2.default, null),
                React.createElement('hr', null),
                React.createElement(ResourceTable, { resources: this.state.resources }),
                React.createElement('hr', null),
                React.createElement(_ResourceAdd2.default, { createResource: this.createResource })
            );
        }
    }]);

    return ResourceList;
}(React.Component);

exports.default = ResourceList;