import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch, Router, Redirect, BrowserRouter, withRouter, IndexRoute} from 'react-router-dom';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Glyphicon } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import PropTypes from 'prop-types';
import ResourceList from './ResourceList.jsx';
import ResourceEdit from './ResourceEdit.jsx';
import ResourceAdd from './ResourceAdd.jsx';
import CategoryList from './CategoryList.jsx';
import MapsPage from './MapsPage.jsx';
const contentNode = document.getElementById('contents');
const NoMatch = () => <p>Page Not Found</p>;

const App = (props) => (
    <div>
        <Header />
        <div className="container-fluid">
            {props.children}
        </div>
        <div className="footer">
        <hr />
            <small>Neighborhood First: Unnamed Project, Developed by Maritza Alas</small>
        </div>
    </div>
);

const Header = () => (
    <Navbar fluid>
        <Navbar.Header>
            <Navbar.Brand>Neighborhood First: Unnamed Project</Navbar.Brand>
        </Navbar.Header>
        <Nav>
            <LinkContainer to="/resources">
                <NavItem>Resources</NavItem>
            </LinkContainer>
            <LinkContainer to="/map">
                <NavItem>Map</NavItem>
            </LinkContainer>
        </Nav>
        <Nav pullRight>
            {/* <NavItem><Glyphicon glyph="plus" /> Create Resource</NavItem> */}
            <NavDropdown id="add-dropdown" title={<Glyphicon glyph="plus" />} noCaret>
                <MenuItem href="/add-resource">Add Resource</MenuItem>
                <MenuItem href="/add-category">Add Category</MenuItem>
            </NavDropdown>
            <NavDropdown id="user-dropdown" title={<Glyphicon glyph="option-horizontal" />} noCaret>
                <MenuItem>Logout</MenuItem>
            </NavDropdown>
        </Nav>
    </Navbar>
);

const Dashboard = () => (
    <div>
        <p>This is a placeholder for the Dashboard or Map page.</p>
    </div>
);

App.propTypes = {
    children: PropTypes.object.isRequired,
};

const RoutedApp = () => (
    <BrowserRouter>
        <div>
            {/* <Redirect from="/" to="/home" /> */}
            <App>
                {/* need to fix nesting here */}
                <Switch path="/" component={App}>
                    {/* <Route path="/home" component={Dashboard} /> */}
                    <Route exact path="/resources" component={withRouter(ResourceList)} />
                    <Route exact path="/resources/:id" component={ResourceEdit} />
                    <Route exact path="/add-resource" component={ResourceAdd} />
                    <Route exact path="/add-category" component={CategoryList} />
                    <Route exact path="/map" component={MapsPage} />
                    {/* <Route component={NoMatch} /> */}
                </Switch>
            </App>
        </div>
    </BrowserRouter>
);
ReactDOM.render(<RoutedApp />, contentNode);

if (module.hot) {
    module.hot.accept();
}