import React from 'react';
import { Col, Row, Form, FormGroup, FormControl, ControlLabel, InputGroup, ButtonToolbar, Button, Radio, ToggleButton, ToggleButtonGroup} from 'react-bootstrap';
import PropTypes from 'prop-types';

const ResourceForm = (props) => {
    function handleSubmit(e) {
        e.preventDefault();
        var form = document.forms.resourceAdd;
        props.createResource({
            category: form.category.value,
            name: form.name.value,
            address: {address1: form.address1.value, address2: form.address2.value, city: form.city.value, state: form.state.value, zip: form.zip.value},
            phone: form.phone.value,
            website: form.website.value,
            comments: form.comments.value,
            isActive: form.isActive.value,
            created: new Date()
        });
        //clear form
        form.category.value = ''; form.name.value = ''; 
        form.address1.value =''; form.address2.value =''; form.city.value =''; form.state.value =''; form.zip.value ='';
        form.phone.value = ''; form.website.value = ''; form.comments.value = '';
    }

    return (
        <Form horizontal name="resourceAdd" onSubmit={handleSubmit}>
                <FormGroup>
                    <Col componentClass={ControlLabel} sm={2}>
                        Category
                    </Col>
                    {/* <ControlLabel >Category</ControlLabel> */}
                    <Col sm={4}>
                        <FormControl componentClass="select" name="category">
                            <option value="">Select</option>
                            {/* {objects.map((object, i) => <ObjectRow obj={object} key={i} />)} */}
                            {props.categories.map((category, i) => <option value={category._id}>{category.name} </option>)}
                        </FormControl>
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col componentClass={ControlLabel} sm={2}>
                        Name
                    </Col>
                    {/* <ControlLabel>Name</ControlLabel> */}
                    <Col sm={4}>
                        <FormControl type="text" name="name" />
                    </Col>
                </FormGroup>
                
                <FormGroup>
                    <Col componentClass={ControlLabel} sm={2}>
                        Address Line 1
                    </Col>
                    <Col sm={3}>
                        <FormControl type="text" name="address1" />
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col componentClass={ControlLabel} sm={2}>
                        Address Line 2
                    </Col>
                    <Col sm={3}>
                        <FormControl type="text" name="address2"  placeholder="Apt #, Suite #"/>
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col componentClass={ControlLabel} sm={2}>
                        City
                    </Col>
                    <Col sm={3}>
                        <FormControl type="text" name="city" />
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col componentClass={ControlLabel} sm={2}>
                        State
                    </Col>
                    <Col sm={3}>
                        <FormControl type="text" value="CA" name="state" disabled/>
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col componentClass={ControlLabel} sm={2}>
                        Zip Code
                    </Col>
                    <Col sm={3}>
                        <FormControl type="text" name="zip"/>
                    </Col>
                </FormGroup>

                <FormGroup>
                    <Col componentClass={ControlLabel} sm={2}>
                        Phone Number
                    </Col>
                    <Col sm={3}>
                        <FormControl type="tel" name="phone"/>
                    </Col>
                </FormGroup>

                <FormGroup>
                    <Col componentClass={ControlLabel} sm={2}>
                        Website
                    </Col>
                    <Col sm={3}>
                        <FormControl type="url" name="website"/>
                    </Col>
                </FormGroup>

                <FormGroup>
                    <Col componentClass={ControlLabel} sm={2}>
                        Enabled
                    </Col>
                    <Col componentClass={ControlLabel} sm={3}>
                        <ButtonToolbar>
                            <ToggleButtonGroup type="radio" name="isActive" defaultValue={true}>
                                <ToggleButton value={true}>True</ToggleButton>
                                <ToggleButton value={false}>False</ToggleButton>
                            </ToggleButtonGroup>
                        </ButtonToolbar>
                    </Col>
                </FormGroup>

                <FormGroup>
                    <Col componentClass={ControlLabel} sm={2}>
                        Comments
                    </Col>
                    <Col sm={4}>
                        <FormControl componentClass="textarea" type="text" name="comments"/>
                    </Col>
                </FormGroup>

                <FormGroup>
                    <Col smOffset={2} sm={10}>
                        <Button type="submit">Add Resource</Button>
                    </Col>
                </FormGroup>
        </Form>
    )
}

ResourceForm.propTypes = {
    categories: PropTypes.array.isRequired,
    createResource: PropTypes.func.isRequired
}

export default class ResourceAdd extends React.Component {
    constructor() {
        super();
        this.state = {categories: []};
        this.createResource = this.createResource.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    _handleRadio(event) {
        const isActive = event.currentTarget.value === 'true' ? true: false;
        console.log('handle', isActive);
        this.setState({ isActive });
      }

    // handleSubmit(e) {
    //     e.preventDefault();
    //     var form = document.forms.resourceAdd;
    //     this.props.createResource({
    //         category: form.category.value,
    //         name: form.name.value,
    //         address: {address1: form.address1.value, address2: form.address2.value, city: form.city.value, state: form.state.value, zip: form.zip.value},
    //         phone: form.phone.value,
    //         website: form.website.value,
    //         comments: form.comments.value,
    //         isActive: form.isActive.value,
    //         created: new Date()
    //     });
    //     //clear form
    //     form.category.value = ''; form.name.value = ''; 
    //     form.address1.value =''; form.address2.value =''; form.city.value =''; form.state.value =''; form.zip.value ='';
    //     form.phone.value = ''; form.website.value = ''; form.comments.value = '';
    // }

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

    createResource(newResource) {
        fetch('/api/resources', {
            method:'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(newResource),
        }).then( response => {
            if (response.ok) {
                response.json().then(updatedResource => {
                    updatedResource.created = new Date(updatedResource.created);
                  //  const newResources = this.state.resources.concat(updatedResource)
                  //  this.setState({resources: newResources});
                });
            } else {
                response.json().then(error => {
                    alert ("Failed to add resource: " + error.message);
                });
            }
        }).catch (err => {
            alert('Error in sending data to the server: '+ err.message);
        });
     }

    render() {
        return (
            <ResourceForm categories={this.state.categories} createResource={this.createResource} />
        )
    }
}