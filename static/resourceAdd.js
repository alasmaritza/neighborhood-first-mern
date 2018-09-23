'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'form',
                    { name: 'resourceAdd', onSubmit: this.handleSubmit },
                    React.createElement('input', { type: 'text', name: 'category', placeholder: 'Category' }),
                    React.createElement('input', { type: 'text', name: 'name', placeholder: 'Name' }),
                    React.createElement('input', { type: 'text', name: 'address1', placeholder: '123 Fourth St' }),
                    React.createElement('input', { type: 'text', name: 'address2', placeholder: 'Suite 666' }),
                    React.createElement('input', { type: 'text', name: 'city', placeholder: 'Los Angeles' }),
                    React.createElement('input', { type: 'text', name: 'state', placeholder: 'CA', value: 'CA', disabled: true }),
                    React.createElement('input', { type: 'text', name: 'zip', placeholder: '90033' }),
                    React.createElement('input', { type: 'text', name: 'phone', placeholder: '(818) 555-5555' }),
                    React.createElement('input', { type: 'text', name: 'website', placeholder: 'http://website.com' }),
                    React.createElement('input', { type: 'text', name: 'comments', placeholder: 'Enter comment here' }),
                    React.createElement(
                        'button',
                        null,
                        'Add New Resource'
                    )
                )
            );
        }
    }]);

    return ResourceAdd;
}(React.Component);

exports.default = ResourceAdd;