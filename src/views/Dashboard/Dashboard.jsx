import React, { Component } from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import PropTypes from "prop-types";

import {Card} from 'components/Card/Card.jsx';
import './dashboard.css'

class Dashboard extends Component {

    static contextTypes = {
        router: PropTypes.object
    };
   
    render() {
        return (
            <div className="content">
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                            <Card
                                statsIcon="fa fa-history"
                                id="chartHours"
                                title={`hospital name`}
                                category={`hospital location`}
                                content={
                                    <div className="ct-chart center">
                                    <div>
                                        <h1>Welcome!</h1>
                                        <h4>Please select an option below
                                        <h5>Add a new patient record or view record of an existing patient</h5>
                                        </h4>
                                    </div>
                                    <div>
                                        <Button bsStyle="primary" className="button" onClick={()=>this.context.router.history.push('/admin/new-patient')}>New Patient</Button>
                                        <Button bsStyle="success" className="button" onClick={()=>this.context.router.history.push('/admin/existing-patient')}>Existing Patient</Button>
                                    </div>
                                    </div>
                                    }
                            />
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default Dashboard;
