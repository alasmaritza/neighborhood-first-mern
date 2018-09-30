import React from 'react';
import {Link} from 'react-router-dom';
import { Col, Row, Form, FormGroup, FormControl, ControlLabel, InputGroup, ButtonToolbar, Button, Radio} from 'react-bootstrap';
import PropTypes from 'prop-types';

const FilterForm = (props) => {
// props.onChangeCategory(e);
  function changeDropdown() {
       console.log('changed')
   }
    return (
        <Row>
        <Col xs={6} sm={4} md={3} lg={2}>
            <FormGroup>
                <ControlLabel>Category</ControlLabel>
                <FormControl componentClass="select" name="category" onChange={changeDropdown}>
                    <option value="">Any</option>
                    {/* <option value="Graffiti">Graffiti</option>
                    <option value="Aging">Aging</option>
                    <option value="Homeless">Homeless</option> */}
                </FormControl>
            </FormGroup>
        </Col>
        <Col xs={6} sm={4} md={3} lg={2}>
            <FormGroup>
                <ControlLabel>Active</ControlLabel>
                <FormControl componentClass="select" name="isActive" onChange={changeDropdown}>
                    <option value="">All</option>
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                </FormControl>
            </FormGroup>
        </Col>
        <Col xs={6} sm={4} md={3} lg={2}>
            <FormGroup>
                <ControlLabel>&nbsp;</ControlLabel>
                <ButtonToolbar>
                    <Button bsStyle="primary" block onClick={changeDropdown}>Apply</Button>
                </ButtonToolbar>
            </FormGroup>
        </Col>
    </Row>
    )
}

FilterForm.propTypes = {
    onChangeCategory: PropTypes.func.isRequired,
    categories: PropTypes.array.isRequired
}

export default class ResourceFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            category: props.initFilter.category || '',
            isActive: props.initFilter.isActive || '',
            changed: false,
        };
        this.clearFilter = this.clearFilter.bind(this);
        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.onChangeActive = this.onChangeActive.bind(this);
        this.applyFilter = this.applyFilter.bind(this);
        this.resetFilter = this.resetFilter.bind(this);
    }

    componentDidMound() {
        this.loadData();
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            category: this.props.initFilter.category || '',
            isActive: this.props.initFilter.isActive || '',
            changed: false,
        });
    }

    loadData() {
        fetch(`/api/categories${this.props.location.search}`).then(response => {
            if (response.ok) {
                response.json().then(data => {
                    data.records.forEach(category => {
                        category.created = new Date(category.created);
                    });
                    this.setState({ categories: data.records });
                    console.log(data);
                });
            } else {
                response.json().then(error => {
                    alert(`Failed to fetch resource: ${error.message}`);
                });
            }
        }).catch(error => {
            alert(`Error in fetching data from server: ${err.message}`);
        });
    }

    resetFilter() {
        this.setState({
            category: this.props.initFilter.category || '',
            isActive: this.props.initFilter.isActive || '',
            changed:false,
        });
    }

    clearFilter(e) {
        e.preventDefault();
        this.props.setFilter({});
    }

    onChangeCategory(e) {
        this.setState({category: e.target.value, changed:true});
    }

    onChangeActive(e) {
        this.setState({isActive: e.target.value, changed:true});
    }

    applyFilter() {
        const newFilter = {};
        if (this.state.category) newFilter.category = this.state.category;
        if (this.state.isActive) newFilter.isActive = this.state.isActive;
        this.props.setFilter(newFilter);
    }
    
    clearFilter() {
        this.props.setFilter({});
    }

    render() {
        const Separator = () => <span> | </span>;
        return (
            <FilterForm categories={this.state.categories} onChange={this.onChangeCategory} />
            // <Row>
            //     <Col xs={6} sm={4} md={3} lg={2}>
            //         <FormGroup>
            //             <ControlLabel>Category</ControlLabel>
            //             <FormControl componentClass="select" value={this.state.category} onChange={this.onChangeCategory}>
            //                 <option value="">Any</option>
            //                 {/* <option value="Graffiti">Graffiti</option>
            //                 <option value="Aging">Aging</option>
            //                 <option value="Homeless">Homeless</option> */}
            //             </FormControl>
            //         </FormGroup>
            //     </Col>
            //     <Col xs={6} sm={4} md={3} lg={2}>
            //         <FormGroup>
            //             <ControlLabel>Active</ControlLabel>
            //             <FormControl componentClass="select" value={this.state.isActive} onChange={this.onChangeActive}>
            //                 <option value="">All</option>
            //                 <option value="true">Active</option>
            //                 <option value="false">Inactive</option>
            //             </FormControl>
            //         </FormGroup>
            //     </Col>
            //     <Col xs={6} sm={4} md={3} lg={2}>
            //         <FormGroup>
            //             <ControlLabel>&nbsp;</ControlLabel>
            //             <ButtonToolbar>
            //                 <Button bsStyle="primary" block onClick={this.applyFilter}>Apply</Button>
            //             </ButtonToolbar>
            //         </FormGroup>
            //     </Col>
            // </Row>
        )
    }
}

ResourceFilter.propTypes = {
    setFilter: PropTypes.func.isRequired,
    initFilter: PropTypes.object.isRequired,
};