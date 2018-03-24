import React, { Component } from 'react';
import logo from '../Images/header_logo.png';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import './Header.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { resetRedux } from '../../Redux/Actions/actions';

class Header extends Component {

    constructor(props) {
        super(props);

        this.logout = this.logout.bind(this);
    };

    logout() {
        axios.post('/api/auth/logout');
        this.props.resetRedux();
    };

    render(){
        return (
           <div className='header' >
                <div className='header-left-side' >
                    <img src={ logo } alt="Houser"/>
                    <h1>Houser</h1>
                    <h2>Dashboard</h2>
                </div>
                <div className='header-right-side' >
                    <Link to='/'> <div onClick={this.logout}><h3>Logout</h3></div></Link>
                </div>
           </div>
        )
    }
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({resetRedux}, dispatch);
}

export default connect(state => state, mapDispatchToProps)(Header);