import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Row, Form, FormGroup, FormControl, ControlLabel, InputGroup, ButtonToolbar, Button, Radio, ToggleButton, ToggleButtonGroup, Checkbox } from 'react-bootstrap';
import PropTypes from 'prop-types';

const EditForm = (props) => {
   // const address = props.address['address1'];
    return (
        <Form horizontal onSubmit={props.onSubmit}>
            <FormGroup controlId="formHorizontalEmail">
                <Col componentClass={ControlLabel} sm={8}>
                    <span>ID: </span><span>{props.resource._id}</span>
                </Col>
                <Col componentClass={ControlLabel} sm={8}>
                    <span>Created: {props.resource.created ? props.resource.created.toDateString() : ''}</span>
                </Col>
            </FormGroup>

            <FormGroup>
                <Col componentClass={ControlLabel} sm={2}>
                    Category:
                </Col>
                <Col sm={6}>
                    <FormControl componentClass='select' name="category" value={props.resource.category} onChange={props.onChange}>
                        <option value="">Select</option>
                        {props.categories.map((category, i) => <option key={category._id} value={category._id}>{category.name}</option>)}
                    </FormControl>
                </Col>
            </FormGroup>

            <FormGroup>
                <Col componentClass={ControlLabel} sm={2}>
                    Name:
                </Col>
                <Col sm={6}>
                    <FormControl type="text" name="name" value={props.resource.name} onChange={props.onChange} />
                </Col>
            </FormGroup>

            <FormGroup>
                <Col componentClass={ControlLabel} sm={2}>Address:</Col>
                <Col sm={6}>
                    <FormControl type="text" name="address.address1" value={props.address.address1} onChange={props.onChange} />
                </Col>
            </FormGroup>
            <FormGroup>
                <Col componentClass={ControlLabel} sm={2}>Address Line 2:</Col>
                <Col sm={6}>
                    <FormControl type="text" name="address.address2" value={props.address.address2 || ''} onChange={props.onChange} />
                </Col>
            </FormGroup>
            <FormGroup>
                <Col componentClass={ControlLabel} sm={2}>City:</Col>
                <Col sm={6}>
                    <FormControl type="text" name="address.city" value={props.address.city || ''} onChange={props.onChange} />
                </Col>
            </FormGroup>
            <FormGroup>
                <Col componentClass={ControlLabel} sm={2}>State:</Col>
                <Col sm={6}>
                    <FormControl type="text" name="address.state" value={props.address.state} onChange={props.onChange} disabled />
                </Col>
            </FormGroup>
            <FormGroup>
                <Col componentClass={ControlLabel} sm={2}>Zip:</Col>
                <Col sm={6}>
                    <FormControl type="text" name="address.zip" value={props.address.zip || ''} onChange={props.onChange} />
                </Col>
            </FormGroup>
            <FormGroup>
                <Col componentClass={ControlLabel} sm={2}>Phone:</Col>
                <Col sm={6}>
                    <FormControl type="text" name="phone" value={props.resource.phone || ''} onChange={props.onChange} />
                </Col>
            </FormGroup>
            <FormGroup>
                <Col componentClass={ControlLabel} sm={2}>
                    Website:
                </Col>
                <Col sm={6}>
                    <FormControl type="url" name="website" value={props.resource.website || ''} onChange={props.onChange} />
                </Col>
            </FormGroup>

            <FormGroup>
                <Col componentClass={ControlLabel} sm={2}>
                    Enabled:
                </Col>
                <Col sm={6}>
                    <FormGroup>
                        <Radio name="isActive" value='true' checked={props.resource.isActive === 'true'} onChange={props.onChange} inline>
                            Yes
                        </Radio>
                        <Radio name="isActive" value='false' checked={props.resource.isActive === 'false'} onChange={props.onChange} inline>
                            No
                        </Radio>
                    </FormGroup>
                    {/* <ButtonToolbar>
                            <ToggleButtonGroup type="radio" name="isActive" value={resource.isActive} onChange={this.onToggleEnable}>
                                <ToggleButton value={'true'}>True</ToggleButton>
                                <ToggleButton value={'false'}>False</ToggleButton>
                            </ToggleButtonGroup>
                        </ButtonToolbar> */}
                        {/* <label>
                                <input
                                    type="radio"
                                    name="isActive"
                                    value="true"
                                    checked={resource.isActive === 'true'}
                                    onChange={props.onChange} />
                                    Yes
                            </label>
                            </div>
                            <div className="radio">
                                <label>
                                    <input
                                        type="radio"
                                        name="isActive"
                                        value="false"
                                        checked={resource.isActive === 'false'}
                                        onChange={props.onChange} />
                                    No
                                </label> */}
                </Col>
            </FormGroup>

            <FormGroup>
                <Col componentClass={ControlLabel} sm={2}>
                    Comments:
                </Col>
                <Col sm={6}>
                    <FormControl componentClass="textarea" name="comments" value={props.resource.comments || ''} onChange={props.onChange} />
                </Col>
            </FormGroup>
            <FormGroup>
                <Col smOffset={7} sm={1}>
                    <Button type="submit" block>Save</Button>
                </Col>
            </FormGroup>
        </Form>
    )
}

EditForm.propTypes = {
    categories: PropTypes.array.isRequired,
    resource: PropTypes.object.isRequired,
    address: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired
}

export default class ResourceEdit extends React.Component {
    //eslint-disable-line
    constructor() {
        super();
        this.state = {resource: {}, address: {}, categories: []};
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.loadData();
        }
    }

    onChange(event) {
        const resource = Object.assign({}, this.state.resource);
        if (event.target.name == 'address.address2' || event.target.name == 'address.address1' || event.target.name == 'address.city' || event.target.name == 'address.zip') {
            let string = event.target.name;
            let name = string.slice(8, event.target.name.length);
            resource['address'][name] = event.target.value;
        } else {
            resource[event.target.name] = event.target.value;
        }
        this.setState({ resource });
    }

    // onToggleEnable(e) {
    //     const resource = Object.assign({}, this.state.resource);
    //     if (e == 'true') {
    //         resource.isActive = 'true';
    //     } else {
    //        resource.isActive = 'false';
    //     }
    // }

    onSubmit(event) {
        event.preventDefault();
        // if (Object.keys(this.state.invalidFields).length !== 0) {
        //     return;
        // }

        fetch(`/api/resources/${this.props.match.params.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state.resource),
        }).then(response => {
            if (response.ok) {
                response.json().then(updatedResource => {
                    updatedResource.created = new Date(updatedResource.created);
                    this.setState({ resource: updatedResource });
                    alert('Updated resource successfully!');
                });
            } else {
                response.json().then(error => {
                    alert(`Failed to update issue: ${error}`);
                });
            }
        }).catch(err => {
            alert(`Error in sending data to server: ${err}`);
        });
    }

    loadData() {
        let resourceData = {};
        let categoriesData = {};
        fetch(`/api/categories${this.props.location.search}`).then(response => {
            if (response.ok) {
                response.json().then(data => {
                    data.records.forEach(category => {
                        category.created = new Date(category.created);
                    });
                    // this.setState({ categories: data.records });
                    console.log(data);
                    categoriesData = data.records
                    // return categories;
                    //this.setState({ resource: resourceData, categories: categoriesData });
                });
            } else {
                response.json().then(error => {
                    alert(`Failed to fetch resource: ${error.message}`);
                });
            }
        }).catch(error => {
            alert(`Error in fetching data from server: ${err.message}`);
        });

        fetch(`/api/resources/${this.props.match.params.id}`).then(response => {
            if (response.ok) {
                response.json().then(resource => {
                    resource.created = new Date(resource.created);
                    // this.setState({ resource });
                    const address = resource.address
                    this.setState({resource: resource, address: address, categories: categoriesData});
                    console.log(resource);
                    console.log(address);
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

    render() {
        // const resource = this.state.resource;
        return (
            <div>
                {/* <Form horizontal onSubmit={this.onSubmit}>
                    <FormGroup controlId="formHorizontalEmail">
                        <Col componentClass={ControlLabel} sm={8}>
                            <span>ID: </span><span>{resource._id}</span>
                        </Col>
                        <Col componentClass={ControlLabel} sm={8}>
                            <span>Created: {resource.created ? resource.created.toDateString() : ''}</span>
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={2}>
                            Category:
                        </Col>
                        <Col sm={6}>
                            <FormControl componentClass='select' name="category" value={resource.category} onChange={this.onChange}>
                                <option value="">Select</option>
                                <option value="Graffiti">Graffiti</option>
                                <option value="Aging">Aging</option>
                                <option value="Homeless">Homeless</option>
                            </FormControl>
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={2}>
                            Name:
                        </Col>
                        <Col sm={6}>
                            <FormControl type="text" name="name" value={resource.name} onChange={this.onChange} />
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={2}>Address:</Col>
                        <Col sm={6}>
                            <FormControl type="text" name="address.address1" value={resource.address.address1 || ''} onChange={this.onChange} />
                        </Col>

                    </FormGroup>
                    <FormGroup>
                        <Col smOffset={2} sm={6}>
                            <FormControl type="text" name="address.address2" value={resource.address.address2 || ''} onChange={this.onChange} />
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col smOffset={2} sm={6}>
                            <FormControl type="text" name="address.city" value={resource.address.city || ''} onChange={this.onChange} />
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col smOffset={2} sm={6}>
                            <FormControl type="text" name="address.state" value={resource.address.state} onChange={this.onChange} disabled />
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col smOffset={2} sm={6}>
                            <FormControl type="text" name="address.zip" value={resource.address.zip || ''} onChange={this.onChange} />
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={2}>Phone:</Col>
                        <Col sm={6}>
                            <FormControl type="text" name="phone" value={resource.phone || ''} onChange={this.onChange} />
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={2}>
                            Website:
                    </Col>
                        <Col sm={6}>
                            <FormControl type="url" name="website" value={resource.website || ''} onChange={this.onChange} />
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={2}>
                            Enabled:
                    </Col>
                        <Col sm={6}>
                            <FormGroup>
                                <Radio name="isActive" value='true' checked={resource.isActive === 'true'} onChange={this.onChange} inline>
                                    Yes
                            </Radio>
                                <Radio name="isActive" value='false' checked={resource.isActive === 'false'} onChange={this.onChange} inline>
                                    No
                            </Radio>
                            </FormGroup> */}
                            {/* <ButtonToolbar>
                            <ToggleButtonGroup type="radio" name="isActive" value={resource.isActive} onChange={this.onToggleEnable}>
                                <ToggleButton value={'true'}>True</ToggleButton>
                                <ToggleButton value={'false'}>False</ToggleButton>
                            </ToggleButtonGroup>
                        </ButtonToolbar> */}
                            {/* <label>
                            <input
                                type="radio"
                                name="isActive"
                                value="true"
                                checked={resource.isActive === 'true'}
                                onChange={this.onChange} />
                            Yes
                        </label>
                    </div>
                    <div className="radio">
                        <label>
                            <input
                                type="radio"
                                name="isActive"
                                value="false"
                                checked={resource.isActive === 'false'}
                                onChange={this.onChange} />
                            No
                        </label> */}
                        {/* </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={2}>
                            Comments:
                        </Col>
                        <Col sm={6}>
                            <FormControl componentClass="textarea" name="comments" value={resource.comments || ''} onChange={this.onChange} />
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col smOffset={7} sm={1}>
                            <Button type="submit" block>Save</Button>
                        </Col>
                    </FormGroup>
                </Form> */}
                <EditForm resource={this.state.resource} categories={this.state.categories} address={this.state.address} onSubmit={this.onSubmit} onChange={this.onChange} />
                <Link to="/resources">Back to resources list</Link>
            </div>
        );
    }
}

ResourceEdit.propTypes = {
  // params: PropTypes.object.isRequired,
};