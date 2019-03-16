import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
} from "react-bootstrap";
import { connect } from "react-redux";
import Button from 'elements/CustomButton/CustomButton.jsx';
import alertify from 'alertifyjs';
import { BLOOD_GROUP, RELIGION, GENOTPYE, MARITAL_STATUS} from '../../constants'

const Loading = require("react-loading-animation");
const currencyFormatter = require("currency-formatter");

class PatientManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: "",
      showModal: false,
      first_name: '',
      last_name: '',
      dob: '',
      occupation: '',
      phone_number: '',
      address: '',
    };
  }
  // componentWillMount() {
  // }
  open() {
    this.setState({ showModal: true })
  }
  close() {
    this.setState({ showModal: false })
  }
  open2() {
    this.setState({ showModal2: true })
  }
  close2() {
    this.setState({ showModal2: false })
  }
  showAlert(title, message) {
    alertify.alert(title, message, function () {
    });
  }
  onSubmit(e) {
    // e.preventDefault();
    // const {first_name, last_name, dob, phone_number, address, occupation,
    // next_of_kin_address, next_of_kin_occupation, next_of_kin_phone_number, next_of_kin_name, next_of_kin_relationship}
    //  = this.state;
    // let requestBody = {
    //   first_name,
    //   last_name,
    //   dob,
    //   phone_number,
    //   address,
    //   occupation,
    // };
    // this.setState({isLoadingCreatePatient: true});
    //     this.props.createPatient(requestBody)
    //     .then(res => {
    //       this.setState({isLoadingCreate: false});
    //       if(res.payload.status === 201){
    //         this.setState({isLoadingCreatePatient: false, patients: null, patientId: res.payload.data.patient_id});
    //         this.showAlert('Success', `Patient has been created successfully.\nPatient ID is \n${res.payload.data.patient_id}`)
    //         this.fetchAllPatients();
    //       }else if(res.payload.response.status === 400){
    //         this.setState({isLoadingCreatePatient: false});
    //         this.showAlert('Error', 'An error occurred.')
    //       }
    //     }).catch(err => {
    //       this.setState({isLoadingCreatePatient: false});
    //       this.showAlert('Error', 'An error occurred.')
    //     })
  }

  render() {
    return (
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
                      <input required  min='0' type={'number'} placeholder='Enter Weight in KG'
                        onChange={(e) => { this.setState({ next_of_kin_name: e.target.value }) }} className="form-control" />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className={`form-group in-line`} >
                      <label>Height <sub>cm</sub>< strong className='error-message'> *</strong></label >
                      <input required  min='0' type={'number'} placeholder='Enter Height in CM'
                        onChange={(e) => { this.setState({ next_of_kin_phone_number: e.target.value }) }} className="form-control" />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <div className={`form-group in-line`} >
                      <label>Blood Group< strong className='error-message'> *</strong></label >
                      <select
                        onChange={(e) => { this.setState({ next_of_kin_relationship: e.target.value }) }}
                        value={this.state.product_category}
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
                        onChange={(e) => { this.setState({ next_of_kin_relationship: e.target.value }) }}
                        value={this.state.product_category}
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
                      <label>Religion< strong className='error-message'> *</strong></label >
                      <select
                        onChange={(e) => { this.setState({ next_of_kin_relationship: e.target.value }) }}
                        value={this.state.product_category}
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
                        onChange={(e) => { this.setState({ next_of_kin_relationship: e.target.value }) }}
                        value={this.state.product_category}
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
                      <label>Known Allergies< strong className='error-message'> *</strong></label >
                      <input required placeholder='Types of allergies'
                        onChange={(e) => { this.setState({ next_of_kin_relationship: e.target.value }) }} className="form-control" />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className={`form-group in-line`} >
                      <label>Known  Medications< strong className='error-message'> *</strong></label >
                      <input required placeholder='Name of medications'
                        onChange={(e) => { this.setState({ next_of_kin_occupation: e.target.value }) }} className="form-control" />
                    </div>
                  </Col>
                </Row>
                <Button bsStyle="info" fill type="submit" block>
                  Create Patient
              </Button>
                <br />
              </form>
            </div>
          </Col>
        </Grid>
        <div />
      </div>
    );
  }
}

export default connect(null, {
})(PatientManagement);
