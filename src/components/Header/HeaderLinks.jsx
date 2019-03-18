import React, {Component} from 'react';
import { NavItem, Nav } from 'react-bootstrap';
import PropTypes from "prop-types";


class HeaderLinks extends Component{

    static contextTypes = {
        router: PropTypes.object
    };
    render(){
        return (
            <div>
                <Nav>
                </Nav>
                <Nav pullRight>
                    <NavItem eventKey={3} href="#" onClick={()=>this.props.history.push('/')}>Log out</NavItem>
                </Nav>
            </div>
        );
    }
}

export default HeaderLinks;
