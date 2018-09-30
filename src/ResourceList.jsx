import React from 'react';
import 'whatwg-fetch';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import qs from 'query-string';
import {Button, Glyphicon, Table, Panel } from 'react-bootstrap';
import ResourceFilter from './ResourceFilter.jsx';
//class ResourceTable extends React.Component {
function ResourceTable(props) {
    
    const resourceRows = props.resources.map(
        function(resource) {
        let category = props.categories.find(category => category._id == resource.category) || {name:'Uncategorized'};

        return <ResourceRow key={resource._id} resource={resource} categories={category} deleteResource={props.deleteResource} />
    }
)
    return (
        <Table hover responsive>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Category</th>
                    <th>Resource Name</th>
                    <th>Address</th>
                    <th>Phone</th>
                    <th>Website</th>
                    <th>Comments</th>
                    <th>Created</th>
                    <th>Enabled</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {resourceRows}
            </tbody>
        </Table>
    )
}

ResourceTable.propTypes = {
    categories: PropTypes.array.isRequired,
    resources: PropTypes.array.isRequired,
    deleteResource: PropTypes.func.isRequired,
}

//class ResourceRow extends React.Component {
    const ResourceRow = (props) => {
        function onDeleteClick() {
        props.deleteResource(props.resource._id);
    }
        //const resource = this.props.resource;
        //const address = this.props.resource.address;
        return (
            <tr className="border-bottom">
                <th><Link to={`/resources/${props.resource._id}`}>{props.resource._id.substr(-4)}</Link></th>
                <td>{props.categories.name}</td>
                {/* <td></td> */}
                <td>{props.resource.name}</td>
                <td>{props.resource.address.address1 || null} {props.resource.address.address2 || null}<br></br>{props.resource.address.city} {props.resource.address.state} {props.resource.address.zip}</td>
                <td>{props.resource.phone}</td>
                <td>{props.resource.website}</td>
                <td>{props.resource.comments}</td>
                <td>{props.resource.created ? props.resource.created.toDateString(): ''}</td>
                <td>{props.resource.isActive}</td>
                <td><Glyphicon glyph="trash" className="red-text" onClick={onDeleteClick}></Glyphicon></td>
            </tr>
        )
};

ResourceRow.propTypes = {
    resource: PropTypes.object.isRequired,
    categories: PropTypes.object.isRequired,
    deleteResource: PropTypes.func.isRequired,
}

export default class ResourceList extends React.Component {
    constructor() {
        super();
        this.state = {resources:[], categories:[]};
        this.createResource = this.createResource.bind(this);
        this.setFilter = this.setFilter.bind(this);
        this.deleteResource = this.deleteResource.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    componentDidUpdate(prevProps) {
        const oldQuery = qs.parse(prevProps.location.search);
        const newQuery = qs.parse(this.props.location.search);
        if (oldQuery.category === newQuery.category 
            && oldQuery.isActive === newQuery.isActive) {
            return;
        }
        this.loadData();
    }

    loadData()  {
        let resourcesData = {};
        let categoriesData = {};
        fetch(`api/resources${this.props.location.search}`).then(response => {
            if (response.ok) {
                response.json().then(data => {
                    console.log('Total count of records:', data._metadata.total_count);
                    data.records.forEach(resource => {
                        resource.created = new Date(resource.created);
                    });
                  //  this.setState({resources: data.records});
                    resourcesData = data.records;
                  //return resources;
                })
            } else {
                response.json().then(error => {
                    alert("Failed to fetch issues:" + error.message);
                });
            }
        }).catch(err => {
            alert("Error in fetching the data from server:", err);
        });

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
                   this.setState({resources: resourcesData, categories: categoriesData});
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
                   const newResources = this.state.resources.concat(updatedResource)
                   this.setState({resources: newResources});
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

    deleteResource(id) {
        fetch(`/api/resources/${id}`, {method: 'DELETE'}).then(response => {
            if (!response.ok) alert('Failed to delete resource.');
            else this.loadData();
        });
    }

    setFilter(query){
        let search = qs.stringify(query);
        this.props.history.push({ pathname: this.props.location.pathname, search: search});
        }

       render() {
        return (
            <div>
                <Panel id="collapsible-filter">
                    <Panel.Heading>
                        <Panel.Title toggle>Filter</Panel.Title>
                    </Panel.Heading>
                    <Panel.Collapse>
                        {/* <Panel.Body><ResourceFilter setFilter={this.setFilter} initFilter={this.props.location.search} /></Panel.Body> */}
                    </Panel.Collapse>
                </Panel>
                <ResourceTable resources={this.state.resources} categories={this.state.categories} deleteResource={this.deleteResource} />
                {/* <ResourceAdd createResource={this.createResource} /> */}
            </div>
        )
    }
}
ResourceList.propTypes = {
        location:PropTypes.object.isRequired,
        router: PropTypes.object,
    }