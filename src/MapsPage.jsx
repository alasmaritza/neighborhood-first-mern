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

const SelectCateogry = (props) => {
    return (
        <div>
            <Form>
                <Col smOffset={4} sm={4}>
                    <InputGroup>
                        <FormControl componentClass="select">
                            <option value="">Select</option>
                        </FormControl>
                        <InputGroup.Button>
                            <Button>Find Resource</Button>
                        </InputGroup.Button>
                    </InputGroup>
                </Col>
            </Form>
            <br></br>
            <hr width="100%" />
        </div>
    )
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
    }

    render() {
        return (
            <div>
                <FindMe/>
                <SelectCateogry />
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