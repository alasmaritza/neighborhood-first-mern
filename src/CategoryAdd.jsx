import React from 'react';
import { Col, Row, Form, FormGroup, FormControl, ControlLabel, InputGroup, ButtonToolbar, Button, Radio, ToggleButton, ToggleButtonGroup} from 'react-bootstrap';
export default class CategoryAdd extends React.Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        var form = document.forms.categoryAdd;
        this.props.createCategory({
            name: form.name.value,
            created: new Date()
        });
        form.name.value = '';
    }

    render() {
        return (
            <Form horizontal name="categoryAdd" onSubmit={this.handleSubmit}>
                <FormGroup>
                    <Col componentClass={ControlLabel} sm={2}>
                        Name
                    </Col>
                    <Col sm={6}>
                        <FormControl type="text" name="name" />
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col smOffset={6} sm={2}>
                        <Button type="submit" block>Add Category</Button>
                    </Col>
                </FormGroup>
            </Form>
        )
    } 
}