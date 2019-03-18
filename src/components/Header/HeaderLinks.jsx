import React, {Component} from 'react';
import { NavItem, Nav } from 'react-bootstrap';
import PropTypes from "prop-types";


const HeaderLinks = (context) => {
        return (
            <div>
                <Nav>
                </Nav>
                <Nav pullRight>
                    <NavItem eventKey={3} href="#" onClick={()=>context.context.props.history.push('/')}>Log out</NavItem>
                </Nav>
            </div>
        );
    }

export default HeaderLinks;
