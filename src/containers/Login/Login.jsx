import React, { Component } from 'react';
import PropTypes from "prop-types";
import alertify from 'alertifyjs';
import Axios from 'axios';
import {
    Row,
    Col,
    Alert
} from "react-bootstrap";
import Button from 'elements/CustomButton/CustomButton.jsx';
import './login.css';
import success from 'assets/img/doctor.jpg';
import { BASE_URL } from '../../constants'
import LoadingOverlay from 'react-loading-overlay';
class Login extends Component {

    static contextTypes = {
        router: PropTypes.object
    };
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            facility_reg_no: '',
            error: false
        }
    }

    componentWillMount() {
        document.body.style.backgroundImage = 'url(' + success + ')';
        document.body.style.backgroundSize = 'cover';
        localStorage.clear();
    }
    componentWillUnmount() {
        document.body.style.backgroundImage = null;
    }
    showAlert(title, message) {
        alertify.alert(title, message, function () {
        });
    }

    onSubmit(e) {
        e.preventDefault();
        this.setState({
            loading: true
        })
        Axios.get(`${BASE_URL}hospital/${this.state.facility_reg_no}`)
            .then(resp => {
                console.log(resp.data);
                this.setState({
                    loading: false
                })
                if (resp.status === 200) {
                    this.props.history.push('/admin/dashboard', {details: resp.data});
                    localStorage.setItem('login_token', JSON.stringify(resp.data));
                }
            })
            .catch(err => {
                setTimeout(() => {
                    this.setState({
                        error: false
                    })
                }, 1800)
                this.setState({
                    loading: false,
                    error: true
                })
                console.log(err);
            })
    }
    render() {
        return (
            <LoadingOverlay active={this.state.loading} spinner text='Signing into health facility...'>
                <div className='center'>
                    <Row>
                        <Col xs={12}>
                            <div className="card card-stats">
                                <div className="content">
                                    <h5 style={{ textAlign: 'center', color: 'blue' }}><strong>Welcome</strong></h5>
                                    <hr />
                                    <h5 style={{ textAlign: 'center', marginBottom: 20 }}><i>Enter Health Care Facility Number to access your Dashboard</i></h5>
                                    {
                                        this.state.error && <Alert bsStyle="danger">
                                            <h1>Oh snap! You got an error!</h1>
                                            <p>
                                                Please make sure you entered the correct health facility number
                                        </p>
                                        </Alert>
                                    }
                                    <form onSubmit={this.onSubmit.bind(this)}>
                                        <div className={`form-group in-line`} >
                                            <label>Health Facility Number< strong className='error-message'> *</strong></label >
                                            <input required placeholder='1234567890'
                                                onChange={(e) => { this.setState({ facility_reg_no: e.target.value }) }} className="form-control" />
                                        </div>
                                        <Button
                                            bsStyle="primary"
                                            fill
                                            type="submit"
                                            block
                                        >
                                            {!this.state.loading ? 'Enter Facility' : 'Signing in..'}
                                        </Button>
                                    </form>
                                    <div className="footer">
                                        <hr />

                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </LoadingOverlay>
        )
    }
}

export default Login;