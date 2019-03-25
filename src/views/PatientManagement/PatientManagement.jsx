import React, { Component } from "react";
import Axios from 'axios';
import { Redirect } from 'react-router-dom';
import LoadingOverlay from 'react-loading-overlay';
import {
  Grid,
  Row,
  Col,
} from "react-bootstrap";
import Button from 'elements/CustomButton/CustomButton.jsx';
import alertify from 'alertifyjs';
import { BLOOD_GROUP, RELIGION, GENOTPYE, MARITAL_STATUS, BASE_URL,STATUS } from '../../constants'

class PatientManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: "",
      showModal: false,
      isActive: false,
      first_name: '',
      last_name: '',
      dob: '',
      phone_number: '',
      address: '',
      weight: '',
      height: '',
      blood_group: '',
      hiv: '',
      asthma: '',
      blood_pressure_high: '',
      blood_pressure_low: '',
      genotype: '',
      religion: '',
      marital_status: '',
      known_allergies: '',
      known_ailment: '',
      known_medications: '',
      occupation: ''
    };
  }
  showAlert(title, message) {
    alertify.alert(title, message, function () {
    });
    setTimeout(()=>{
      window.location.reload();
    },100000000)
  }
  onSubmit(e) {
    e.preventDefault();
    const { first_name,
      last_name,
      dob,
      phone_number,
      address,
      weight,
      height,
      blood_group,
      hiv,
      asthma,
      blood_pressure_high,
      blood_pressure_low,
      genotype,
      religion,
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
      hiv,
      asthma,
      blood_pressure_high,
      blood_pressure_low,
      genotype,
      religion,
      marital_status,
      known_allergies,
      known_ailment,
      known_medications,
      occupation
    };

    this.setState({
      isActive: true
    })
    Axios.post(`${BASE_URL}patients`, requestBody)
      .then(resp => {
        this.setState({
          isActive: false
        })
        if (resp.status) {
          this.showAlert('Success', `Patient has been registered successfully.\n Patient No is ${resp.data.patient_no}`)
        }
      })
      .catch(err => {
        this.setState({
          isActive: false,
        })
        this.showAlert('Error', 'Unable to register patient at this time.\n Please try again.')
        window.location.reload();
      })
  }

  render() {
    let details  = JSON.parse(localStorage.getItem('login_token'));
    return (
      details ?
      <LoadingOverlay active={this.state.isActive} spinner text='Registering Patient...'>
        <div className="content">
          <Grid fluid>
            <Col md={9}>
              <strong>Create Patient</strong>
              <div>
                <h5 className={"centre-message"}>{this.state.message}</h5>
                <h5 className="error-message">{this.state.errorMessage}</h5>
                <form onSubmit={this.onSubmit.bind(this)}>
                  <Row>
                    <Col md={6}>
                      <div className={`form-group in-line`} >
                        <label>First Name< strong className='error-message'> *</strong></label >
                        <input required placeholder='First Name'
                          onChange={(e) => { this.setState({ first_name: e.target.value }) }} className="form-control" />
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className={`form-group in-line`} >
                        <label>Last Name< strong className='error-message'> *</strong></label >
                        <input required placeholder='Last name'
                          onChange={(e) => { this.setState({ last_name: e.target.value }) }} className="form-control" />
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <div className={`form-group in-line`} >
                        <label>Date of Birth< strong className='error-message'> *</strong></label >
                        <input required type={'date'} step={'1'} placeholder='24'
                          onChange={(e) => { this.setState({ dob: e.target.value }) }} className="form-control" />
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className={`form-group in-line`} >
                        <label>Phone number< strong className='error-message'> *</strong></label >
                        <input required min='0' type={'number'} placeholder='07011223344'
                          onChange={(e) => { this.setState({ phone_number: e.target.value }) }} className="form-control" />
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <div className={`form-group in-line`} >
                        <label>Address< strong className='error-message'> *</strong></label >
                        <input required placeholder='Address'
                          onChange={(e) => { this.setState({ address: e.target.value }) }} className="form-control" />
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className={`form-group in-line`} >
                        <label>Occupation< strong className='error-message'> *</strong></label >
                        <input required placeholder='Occupation'
                          onChange={(e) => { this.setState({ occupation: e.target.value }) }} className="form-control" />
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <div className={`form-group in-line`} >
                        <label>Weight <sub>kg</sub>< strong className='error-message'> *</strong></label >
                        <input required min='0' type={'number'} placeholder='Enter Weight in KG'
                          onChange={(e) => { this.setState({ weight: e.target.value }) }} className="form-control" />
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className={`form-group in-line`} >
                        <label>Height <sub>cm</sub>< strong className='error-message'> *</strong></label >
                        <input required min='0' type={'number'} placeholder='Enter Height in CM'
                          onChange={(e) => { this.setState({ height: e.target.value }) }} className="form-control" />
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <div className={`form-group in-line`} >
                        <label>Blood Group< strong className='error-message'> *</strong></label >
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
                        <label>Genotype< strong className='error-message'> *</strong></label >
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
                        <label>HIV/AIDS< strong className='error-message'> *</strong></label >
                        <select
                          onChange={(e) => { this.setState({ hiv: e.target.value }) }}
                          className="form-control"
                        >
                          {
                            STATUS.map(status => (
                              <option key={status.id} value={status.status}>{status.status}</option>
                            ))
                          }
                        </select>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className={`form-group in-line`} >
                        <label>Asthma< strong className='error-message'> *</strong></label >
                        <select
                          onChange={(e) => { this.setState({ asthma: e.target.value }) }}
                          className="form-control"
                        >
                          {
                            STATUS.map(status => (
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
                        <label>Blood Pressure (High)< strong className='error-message'> *</strong></label >
                        <input required type={'number'} min='1' placeholder='120'
                          onChange={(e) => { this.setState({ blood_pressure_high: e.target.value }) }} className="form-control" />
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className={`form-group in-line`} >
                        <label>Blood Pressure (Low)< strong className='error-message'> *</strong></label >
                        <input required min='1' type={'number'} placeholder='80'
                          onChange={(e) => { this.setState({ blood_pressure_low: e.target.value }) }} className="form-control" />
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <div className={`form-group in-line`} >
                        <label>Religion< strong className='error-message'> *</strong></label >
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
                        <label>Marital Status< strong className='error-message'> *</strong></label >
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
                        <input  placeholder='Types of allergies'
                          onChange={(e) => { this.setState({ known_allergies: e.target.value }) }} className="form-control" />
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className={`form-group in-line`} >
                        <label>Known  Medications</label >
                        <input  placeholder='Name of medications'
                          onChange={(e) => { this.setState({ known_medications: e.target.value }) }} className="form-control" />
                      </div>
                    </Col>
                  </Row>
                  <Button bsStyle="info" fill type="submit" block>
                    Create Patient
              </Button>
                </form>
              </div>
            </Col>
          </Grid>
          <div />
        </div>
      </LoadingOverlay>
      : <Redirect to='/' />
    );
  }
}

export default PatientManagement;
