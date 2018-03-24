import React, { Component } from 'react';
import logo from '../Images/auth_logo.png';
import './Login.css';
import axios from 'axios';


class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: "",
            password:"",
        }
        this.handleChange = this.handleChange.bind(this);
    }

    createUserOrLogin(e, login){
        axios.post(`/api/auth/${login}`, {email:this.state.email, password:this.state.password})
            .then((response)=>{
                if(response.data.success){
                    this.props.history.push('/dashboard');
                }else{
                    alert("Yo your password or maybe your email (all though I doubt it) is incorrect")
                }
            })
            .catch((err)=>{
                console.log(err)
            }) 
    }

    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    render(){
        return (
            <div className='login-page' >
                <div className='sidebar' ></div>
                <div className='login-contents' >              
                    <img src={logo} alt="Houser" id='login-logo' />
                    <div className='input-box' >
                        <h3>Username</h3>
                        <input name="email" value={this.state.email} onChange={this.handleChange} type="text"/>
                    </div>
                    <div className='input-box' >
                        <h3>Password</h3>
                        <input name="password" value={this.state.password} onChange={this.handleChange} type="password"/>
                    </div>
                    <div className='login-buttons'>
                        <div onClick={(event)=>{this.createUserOrLogin(event, 'login')}} className='light-green-button' ><button>Login</button></div>
                        <div onClick={(event)=>{this.createUserOrLogin(event, 'register')}} className='dark-green-button'><button>Register</button></div>
                    </div>
                 </div>
                <div className='sidebar' ></div>
            </div>
        )
    }
}
export default Login;