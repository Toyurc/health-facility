import React, { Component } from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import PropTypes from "prop-types";
import { Redirect } from 'react-router-dom';
import Axios from 'axios';
import LoadingOverlay from 'react-loading-overlay';
import alertify from 'alertifyjs';

import {Card} from 'components/Card/Card.jsx';
import '../Dashboard/dashboard.css'
import { BLOOD_GROUP, RELIGION, GENOTPYE, MARITAL_STATUS,BASE_URL, GetDate } from '../../constants'



class ExistingPatient extends Component {

    static contextTypes = {
        router: PropTypes.object
    };
    state = {
        patient_no: '',
        isActive: false,
        patient_details: null,
        commentOverlay:false,
        doctorComment: '',
        dob_date: '',
        first_name:'',
        last_name:'',
        dob:'',
        phone_number:'',
        address:'',
        weight:'',
        height:'',
        blood_group:'',
        genotype:'',
        religion:'',
        marital_status:'',
        known_allergies:'',
        known_ailment:'',
        known_medications:'',
        occupation:''
    }

showAlert(title, message) {
    alertify.alert(title, message, function () {
    });
}

onSubmit(e) {
    e.preventDefault();
    this.setState({
        isActive: true,
        patient_details: ''
    })
    Axios.get(`${BASE_URL}patients/${this.state.patient_no}`)
        .then(resp => {
            this.setState({
                isActive: false,
                patient_details: resp.data,
            })            
        })
        .catch(err => {
            this.setState({
                isActive: false,
            })
            this.showAlert('Error', 'Unable to fetch patient at this time.\n Please try again.')
            window.location.reload();
        })
}

addComment(e) {
    e.preventDefault();
    this.setState({
        commentOverlay: true
    })
    let requestBody = {
        comment_desc: this.state.doctorComment,
        patient_no: this.state.patient_no
    }
    Axios.post(`${BASE_URL}comment`, requestBody)
        .then(resp => {
            this.setState({
                commentOverlay: false,
            })
            if (resp.status) {
                this.showAlert('Success', `Comment Has been added`)
            }
        })
        .catch(err => {
            this.setState({
                commentOverlay: false,
            })
            this.showAlert('Error', 'Unable to add comment at this time.\n Please try again.')
        })
}

formSubmit(e) {
    e.preventDefault();
    console.log(this.state)
    const { 
        first_name,
        last_name,
        dob,
        phone_number,
        address,
        weight,
        height,
        blood_group,
        genotype,
        religion,
        patient_no,
        marital_status,
        known_allergies,
        known_ailment,
        known_medications,
        occupation }
        = this.state;
      let requestBody = {
        first_name,
        last_name,
        dob,
        phone_number,
        address,
        weight,
        height,
        blood_group,
        genotype,
        religion,
        patient_no,
        marital_status,
        known_allergies,
        known_ailment,
        known_medications,
        occupation
      };
  
      this.setState({
        commentOverlay: true
      })
      Axios.put(`${BASE_URL}patients`, requestBody)
        .then(resp => {
          this.setState({
            commentOverlay: false
          })
          if (resp.status) {
            this.showAlert('Success', `Patient was updated successfully.\n Patient No is ${resp.data.patient_no}`)
          }
        })
        .catch(err => {
          this.setState({
            commentOverlay: false,
          })
          this.showAlert('Error', 'Unable to update patient details at this time.\n Please try again.')
          window.location.reload();
        })
}

    render() {
        let details  = JSON.parse(localStorage.getItem('login_token'));
        return (
            details ?
            <LoadingOverlay active={this.state.isActive} spinner text='Fetching  Patient...'>
            <div className="content">
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                            <Card
                                statsIcon="fa fa-history"
                                id="chartHours"
                                title={`${details.name}`}
                                category={`${details.location}`}
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
                    {this.state.patient_details &&
                    <LoadingOverlay active={this.state.commentOverlay} spinner text='Fetching  Patient...'>
                    <Row>
                        <Col md={12}>
                            <Card 
                                title={`${this.state.patient_details.first_name} ${this.state.patient_details.last_name}`}
                                category={`${this.state.patient_details.patient_no}`}
                                content={
                                        <div>
                                    <form onSubmit={this.formSubmit.bind(this)}>
                                    <Row>
                                        <Col md={6}>
                                        <div className={`form-group in-line`} >
                                            <label>First Name< strong className='error-message'> *</strong></label >
                                            <input required placeholder='First Name' value={this.state.patient_details.first_name}
                                            onChange={(e) => { this.setState({ first_name: e.target.value }) }} className="form-control" />
                                        </div>
                                        </Col>
                                        <Col md={6}>
                                        <div className={`form-group in-line`} >
                                            <label>Last Name< strong className='error-message'> *</strong></label >
                                            <input required placeholder='Last name' value={this.state.patient_details.last_name}
                                            onChange={(e) => { this.setState({ last_name: e.target.value }) }} className="form-control" />
                                        </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6}>
                                        <div className={`form-group in-line`} >
                                            <label>Date of Birth< strong className='error-message'> *</strong>  <em><strong className='bold-text'>{GetDate(this.state.patient_details.dob)}</strong></em></label>
                                            <input required type={'date'} step={'1'} placeholder='24'
                                            onChange={(e) => { this.setState({ dob: e.target.value }) }} className="form-control" />
                                        </div>
                                        </Col>
                                        <Col md={6}>
                                        <div className={`form-group in-line`} >
                                            <label>Phone number< strong className='error-message'> *</strong></label >
                                            <input required min='0' type={'number'} placeholder='07011223344' value={this.state.patient_details.phone_number}
                                            onChange={(e) => { this.setState({ phone_number: e.target.value }) }} className="form-control" />
                                        </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6}>
                                        <div className={`form-group in-line`} >
                                            <label>Address< strong className='error-message'> *</strong></label >
                                            <input required placeholder='Address' value={this.state.patient_details.address}
                                            onChange={(e) => { this.setState({ address: e.target.value }) }} className="form-control" />
                                        </div>
                                        </Col>
                                        <Col md={6}>
                                        <div className={`form-group in-line`} >
                                            <label>Occupation< strong className='error-message'> *</strong></label >
                                            <input required placeholder='Occupation' value={this.state.patient_details.occupation}
                                            onChange={(e) => { this.setState({ occupation: e.target.value }) }} className="form-control" />
                                        </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6}>
                                        <div className={`form-group in-line`} >
                                            <label>Weight <sub>kg</sub>< strong className='error-message'> *</strong></label >
                                            <input required min='0' type={'number'} placeholder='Enter Weight in KG' value={this.state.patient_details.weight}
                                            onChange={(e) => { this.setState({ weight: e.target.value }) }} className="form-control" />
                                        </div>
                                        </Col>
                                        <Col md={6}>
                                        <div className={`form-group in-line`} >
                                            <label>Height <sub>cm</sub>< strong className='error-message'> *</strong></label >
                                            <input required min='0' type={'number'} placeholder='Enter Height in CM' value={this.state.patient_details.height}
                                            onChange={(e) => { this.setState({ height: e.target.value }) }} className="form-control" />
                                        </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6}>
                                        <div className={`form-group in-line`} >
                                            <label>Blood Group< strong className='error-message'> *</strong>  <em><strong className='bold-text'>{this.state.patient_details.blood_group}</strong></em></label>
                                            <select
                                            onChange={(e) => { this.setState({ blood_group: e.target.value }) }}
                                            className="form-control"
                                            >
                                            {
                                                BLOOD_GROUP.map(blood => (
                                                <option key={blood.id} value={blood.blood_group}>{blood.blood_group}</option>
                                                ))
                                            }
                                            </select>
                                        </div>
                                        </Col>
                                        <Col md={6}>
                                        <div className={`form-group in-line`} >
                                            <label>Genotype< strong className='error-message'> *</strong>  <em><strong className='bold-text'>{this.state.patient_details.genotype}</strong></em></label>
                                            <select
                                            onChange={(e) => { this.setState({ genotype: e.target.value }) }}
                                            className="form-control"
                                            >
                                            {
                                                GENOTPYE.map(gene => (
                                                <option key={gene.id} value={gene.genotype}>{gene.genotype}</option>
                                                ))
                                            }
                                            </select>
                                        </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6}>
                                        <div className={`form-group in-line`} >
                                            <label>Religion< strong className='error-message'> *</strong>  <em><strong className='bold-text'>{this.state.patient_details.religion}</strong></em></label >
                                            <select
                                            onChange={(e) => { this.setState({ religion: e.target.value }) }}
                                            className="form-control"
                                            >
                                            {
                                                RELIGION.map(religion => (
                                                <option key={religion.id} value={religion.religion}>{religion.religion}</option>
                                                ))
                                            }
                                            </select>
                                        </div>
                                        </Col>
                                        <Col md={6}>
                                        <div className={`form-group in-line`} >
                                            <label>Marital Status< strong className='error-message'> *</strong>  <em><strong className='bold-text'>{this.state.patient_details.marital_status}</strong></em></label>
                                            <select
                                            onChange={(e) => { this.setState({ marital_status: e.target.value }) }}
                                            className="form-control"
                                            >
                                            {
                                                MARITAL_STATUS.map(status => (
                                                <option key={status.id} value={status.status}>{status.status}</option>
                                                ))
                                            }
                                            </select>
                                        </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6}>
                                        <div className={`form-group in-line`} >
                                            <label>Known Allergies</label >
                                            <input  placeholder='Types of allergies' value={this.state.patient_details.known_allergies}
                                            onChange={(e) => { this.setState({ known_allergies: e.target.value }) }} className="form-control" />
                                        </div>
                                        </Col>
                                        <Col md={6}>
                                        <div className={`form-group in-line`} >
                                            <label>Known  Medications</label >
                                            <input  placeholder='Name of medications' value={this.state.patient_details.known_medications}
                                            onChange={(e) => { this.setState({ known_medications: e.target.value }) }} className="form-control" />
                                        </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={12}>
                                            <Col md={12}>
                                                {
                                                    this.state.patient_details.comment.length > 0 ?
                                                    <div>
                                                        <h3>Doctor's Comments</h3>
                                                    {
                                                        this.state.patient_details.comment.map(
                                                        comment =>
                                                            <div key={comment.id}>
                                                                <span>{GetDate(comment.createdAt)}</span><p>{comment.comment_desc}</p>
                                                            </div>) 
                                                    }
                                                </div>
                                                :
                                                <div><h4>No Comment yet.</h4></div>
                                                }
                                            </Col>
                                            <Col md={12}>
                                                <form onSubmit={this.addComment.bind(this)}>
                                                <div className={`form-group in-line`} >
                                                    <label>Add Comment</label >
                                                    <textarea  placeholder='Add Comment'
                                                    onChange={(e) => { this.setState({ doctorComment: e.target.value }) }} className="form-control" />
                                                </div>
                                                <Button bsStyle="info" fill type="submit" block>
                                                    Add Comments
                                                </Button>
                                                </form>
                                            </Col>
                                        </Col>
                                    </Row>
                                    <Button bsStyle="info" fill type="submit" block>
                                        Update Patient Details
                                    </Button>
                                    </form>
                                </div>
                                }
                            />
                        </Col>
                    </Row>
                    </LoadingOverlay>
                    }
                </Grid>
            </div>
            </LoadingOverlay>
            : <Redirect to='/'/>
        );
    }
}

export default ExistingPatient;
