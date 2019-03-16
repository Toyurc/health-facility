import React, {Component} from 'react';
import success from 'assets/img/doctor.jpg';
import {
    Row,
    Col
  } from "react-bootstrap";
  import PropTypes from "prop-types";
import Button from 'elements/CustomButton/CustomButton.jsx';
import alertify from 'alertifyjs';
import {
    login,
    sendUserToAllComponents
  } from "./action.js";
import { connect } from "react-redux";
import './login.css';

const Loading = require("react-loading-animation");

class Login extends Component{

    static contextTypes = {
        router: PropTypes.object
    };
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        }
    }

    componentWillMount(){
        document.body.style.backgroundImage = 'url(' + success + ')';
        document.body.style.backgroundSize = 'cover';
    }
    componentWillUnmount(){
        document.body.style.backgroundImage = null;
    }
    showAlert(title, message) {
        alertify.alert(title, message, function () {
        });
      }
    
    onSubmit(e){
        e.preventDefault();
        this.context.router.history.push('/admin');
        // const requestBody = {
        //     staff_id: this.state.staff_id,
        //     password: this.state.password
        // };
        // this.setState({loading: true});
        // this.props.login(requestBody)
        // .then(response => {
        //     console.log('Response is ', response);
        //     const {
        //         payload:{
        //             status,
        //             data
        //         }
        //     } = response;
        //     this.setState({loading: false});
        //     if(status === 200){
        //         console.log('User is ', data);
        //         const user ={
        //             staff_id: this.state.staff_id,
        //             role: data
        //         }
        //         this.props.sendUserToAllComponents(user);
        //         if(data === 'admin'){
        //             this.context.router.history.push('/admin');
        //         }else if(data === 'doctor'){
        //             this.context.router.history.push('/doctor');
        //         }else if(data === 'nurse'){
        //             this.context.router.history.push('/nurse');
        //         }else if(data === 'lab-attendant'){
        //             this.context.router.history.push('/lab');
        //         }else{
        //             this.showAlert('Error', 'Unable to log you in.') 
        //         }
              
        //     }
        //     else if(status === 203)
        //         this.showAlert('Credentials', 'Staff id and password does not match.')  
            
        //     else if(response.payload.response.status === 404)
        //         this.showAlert('Not found', 'Staff does not exist.')
            

        // }).catch(err => {
        //     this.setState({loading: false});
        //     this.showAlert('Error', 'Unable to log you in.')
        // })
        
    }
    render(){
        return(
        <div>
        <div className='center'>
        <Row>
            <Col xs={12}>
        <div className="card card-stats">
                    <div className="content">   
                <h5 style={{textAlign:'center', color:'blue'}}><strong>Welcome</strong></h5>
                <hr/>
                <h5 style={{textAlign:'center', marginBottom:20}}><i>Enter Health Care Facility Number to access your Dashboard</i></h5>
                <Loading isLoading={this.state.loading}/>
                <form onSubmit={this.onSubmit.bind(this)}>
                <div className = {`form-group in-line`} >
                <label>Health Facility Number< strong className = 'error-message'> *</strong></label >
                <input required placeholder = '1234567890'
                  onChange = {(e) => {this.setState({staff_id: e.target.value})}} className = "form-control"/>
                </div> 
                    <Button
                        bsStyle="primary"
                        fill
                        type="submit"
                        block
                        >
                        Enter Facility
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
    </div>

        )
    }
}

export default connect(null, {
   login,
   sendUserToAllComponents
    })(Login);