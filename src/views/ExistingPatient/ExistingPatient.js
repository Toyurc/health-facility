import React, { Component } from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import PropTypes from "prop-types";

import {Card} from 'components/Card/Card.jsx';
import '../Dashboard/dashboard.css'


class ExistingPatient extends Component {

    static contextTypes = {
        router: PropTypes.object
    };
    state = {
        patient_no: ''
    }

    onSubmit(e) {
        e.preventDefault();
    }
   
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
                                        <h4>Please enter the Patient No: below</h4>
                                        <form  onSubmit={this.onSubmit.bind(this)}>
                                            <input required placeholder = 'Patient No:'
                onChange = {(e) => {this.setState({patient_no: e.target.value})}} className = "form-control" />
                                            <Button className='button' bsStyle='primary' type='submit'>Submit</Button>
                                        </form>
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

export default ExistingPatient;
