import React from 'react';
import 'whatwg-fetch';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import qs from 'query-string';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import { Col, Row, Form, FormGroup, FormControl, ControlLabel, InputGroup, ButtonToolbar, Button, Radio, ToggleButton, ToggleButtonGroup} from 'react-bootstrap';

const FindMe = (props) => {
    return (
        <div>
            <Form horizontal>
                <FormGroup>
                    <Col smOffset={2} sm={3}>
                        <Button id="findMe" block>Find My Location</Button>
                    </Col>
                    <Col sm={2} className="text-center">
                        <span>OR</span>
                    </Col>
                    <Col sm={3}>
                        <FormControl type="text" placeholder="Enter city or ZIP"/>
                    </Col>
                </FormGroup>
            </Form>
        </div>
    )
}

const SelectCategory = (props) => {
    return (
        <div>
            <Form onSubmit={props.onSubmit}>
                <Col smOffset={4} sm={4}>
                    <InputGroup>
                        <FormControl componentClass="select" name="category" value={props.category} onChange={props.onSelectCategory}>
                            <option value="">Select</option>
                            {props.categories.map((category, i) => <option key={category._id} value={category._id}>{category.name}</option>)}
                        </FormControl>
                        <InputGroup.Button>
                            <Button type="submit">Find Resource</Button>
                        </InputGroup.Button>
                    </InputGroup>
                </Col>
            </Form>
            <br></br>
            <hr width="100%" />
        </div>
    )
}

SelectCategory.propTypes = {
    categories: PropTypes.array.isRequired,
    onSelectCategory: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
}

const ResourcesList = (props) => {
    return (
        <div>
            <Col smOffset={4} sm={4}>
                <div className="title text-center">
                    <span>
                        <h3 className="orgTitle">{props.resource.name}</h3>
                    </span>
                    <small className="orgArea"></small>
                </div>
                <span>Address:<span id="orgAdd">{props.resource.address.address1 || null} {props.resource.address.address2 || null}</span></span>
                <div>
                    <div>Phone:
                        <a href="" className="orgPhone"><span id="orgPhone">{props.resource.phone}</span></a>
                    </div>
                    <div>Website:
                        <a href="" target="_blank" className="orgSite"><span id="orgSite">{props.resource.website}</span></a>
                    </div>
                    <small id="orgRes"></small>
                </div>
            </Col>
        </div>
    )
}

ResourcesList.propTypes = {
    resources: PropTypes.object.isRequired
}

const Map = withScriptjs(withGoogleMap((props) =>
<GoogleMap
  defaultZoom={10}
  defaultCenter={{ lat: 34.0275594, lng: -118.2469722 }}
>
  {props.isMarkerShown && <Marker position={{ lat: 34.0275594, lng: -118.2469722 }} />}
</GoogleMap>
))
//marker position for ismarkershown will be user's input for their location

const AboutFred = (props) => {
    return (
        <div>
            <Col sm={12}>
                <h3 className="text-center">About Neighborhoods FIRST</h3>
            </Col>
            <Col smOffset={3} sm={6}>
                <p className="text-center">The homelessness crisis in the City of Los Angeles has reached proportions that none of us have previously seen in our lifetimes. 
                    Solving this issue will involve commitment from all possible partners working in coordination on many fronts. 
                    Neighborhoods FIRST (Fully Integrated Resources & Support Team) is a multi-pronged effort that leads with compassion to remove barriers to 
                    housing and employment for people currently experiencing homelessness while working to prevent those on the edges from slipping into the 
                    homeless population and improve the tools available to communities to alleviate the impacts of homelessness on neighborhoods.</p>
            </Col>
        </div>
    )
}

export default class MapsPage extends React.Component {
    constructor() {
        super();
        this.state = {resources: {}, address: {}, categories: [], category: ''};
        this.onSubmit = this.onSubmit.bind(this);
        this.onSelectCategory = this.onSelectCategory.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    onSelectCategory(event) {
        const category = Object.assign({}, this.state.category);
        category.id = event.target.value;
        this.setState({category});
    }

    onSubmit(event) {
        event.preventDefault();
        console.log('going to fetch this category: ', this.state.category);
        var _id = this.state.category.id;
        fetch(`api/resources?category=${_id}`).then(response => {
            if (response.ok) {
                response.json().then(resource => {
                    console.log(resource.records, 'resources');
                    this.setState({resources: resource.records});
                })
            }
        });
    }

    loadData() {
        let resourceData = {};
        let categoriesData = {};
        fetch(`/api/categories`).then(response => {
            if (response.ok) {
                response.json().then(data => {
                    data.records.forEach(category => {
                        category.created = new Date(category.created);
                    });
                    console.log(data);
                    categoriesData = data.records
                    //remove later when other fetch is implemented
                    this.setState({categories: categoriesData});
                });
            } else {
                response.json().then(error => {
                    alert(`Failed to fetch resource: ${error.message}`);
                });
            }
        }).catch(error => {
            alert(`Error in fetching data from server: ${err.message}`);
        });

        // fetch(`/api/resources/${this.props.match.params.id}`).then(response => {
        //     if (response.ok) {
        //         response.json().then(resource => {
        //             resource.created = new Date(resource.created);
        //             const address = resource.address
        //             this.setState({resource: resource, address: address, categories: categoriesData});
        //             console.log(resource);
        //             console.log(address);
        //         });
        //     } else {
        //         response.json().then(error => {
        //             alert(`Failed to fetch resource: ${error.message}`);
        //         });
        //     }
        // }).catch(error => {
        //     alert(`Error in fetching data from server: ${err.message}`);
        // });
    }

    render() {
        return (
            <div>
                <FindMe/>
                <SelectCategory categories={this.state.categories} onSubmit={this.onSubmit} onSelectCategory={this.onSelectCategory} />
                {/* <ResourcesList resources={this.state.resources} /> */}
                <Map googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDNwXQefIZFHE25kjvwHx2ilGuiKt8paQA&v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `400px` }} />}
                    mapElement={<div style={{ height: `100%`, width: `80%`, margin:'auto' }} />} isMarkerShown 
                />
                <AboutFred />
            </div>
        )
    }
}