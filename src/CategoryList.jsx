import React from 'react';
import 'whatwg-fetch';
import PropTypes from 'prop-types';
import qs from 'query-string';
import {Link} from 'react-router-dom';
import {Buttton, Glyphicon, Table, Panel} from 'react-bootstrap';
import CategoryAdd from './CategoryAdd.jsx';

function CategoryTable(props) {
    const categoryRows = props.categories.map(category => <CategoryRow key={category._id} category={category} deleteCategory={props.deleteCategory} />)
    return(
        <Table hover responsive>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {categoryRows}
            </tbody>
        </Table>
    )   
}

CategoryTable.propTypes = {
    categories: PropTypes.array.isRequired,
    deleteCategory: PropTypes.func.isRequired
}

const CategoryRow = (props) => {
    function onDeleteClick() {
        props.deleteCategory(props.category._id);
    }

    function editCategory() {
        console.log('work in progress.');
    }

    return(
        <tr className="border-bottom">
            <td><Link onClick={editCategory} to={`#${props.category._id}`}>{props.category._id}</Link></td>
            <td>{props.category.name}</td>
            <td><Glyphicon glyph="trash" className="red-text" onClick={onDeleteClick}></Glyphicon></td>
        </tr>
    )
};

CategoryRow.propTypes = {
    category: PropTypes.object.isRequired,
    deleteCategory: PropTypes.func.isRequired
}

export default class CategoryList extends React.Component {
    constructor() {
        super();
        this.state = {categories:[]};
        this.createCategory = this.createCategory.bind(this);
        this.deleteCategory = this.deleteCategory.bind(this);
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
        fetch(`api/categories${this.props.location.search}`).then(response => {
            if (response.ok) {
                response.json().then(data => {
                    console.log('Total count of records:', data._metadata.total_count);
                    data.records.forEach(category => {
                        category.created = new Date(category.created);
                    });
                    this.setState({categories: data.records});
                })
            } else {
                response.json().then(error => {
                    alert("Failed to fetch issues:" + error.message);
                });
            }
        }).catch(err => {
            alert("Error in fetching the data from server:", err);
        });
    }

    createCategory(newCategory) {
        fetch('/api/categories', {
            method:'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(newCategory),
        }).then( response => {
            if (response.ok) {
                response.json().then(updatedCategory => {
                    updatedCategory.created = new Date(updatedCategory.created);
                    const newCategories = this.state.categories.concat(updatedCategory)
                    this.setState({categories: newCategories});
                });
            } else {
                response.json().then(error => {
                    alert ("Failed to add resource: " + error.message);
                });
            }
        }).catch (err => {
            alert('Error in sending data to the server: '+ err.message);
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
     
     deleteCategory(id) {
         fetch(`/api/categories/${id}`, {method: 'DELETE'}).then(response => {
             if (!response.ok) alert('Failed to delete category.');
             else this.loadData();
         });
     }

     render() {
         return (
             <div>
                 <CategoryTable categories={this.state.categories} deleteCategory={this.deleteCategory} />
                 <CategoryAdd createCategory={this.createCategory} />
             </div>
         )
     }

}

CategoryList.propTypes = {
    location:PropTypes.object.isRequired,
    router: PropTypes.object,
}