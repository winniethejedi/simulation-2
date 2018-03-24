import React, { Component } from 'react';
import Header from '../Header/Header';
import './Wizard.css';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Step5 from './Step5';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';


class Wizard extends Component {
    static PropTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    }

    render(){
        const { match, location, history } = this.props;
        const id =  parseInt(this.props.match.params.id, 10);
        function chooseStep(id) {
            if (id === 1) {
                return <Step1/>
            }
            else if (id === 2) {
                return <Step2/>;
            }
            else if (id === 3) {
                return <Step3/>
            }
            else if (id === 4) {
                return <Step4/>
            }
            else if (id === 5) {
                return <Step5/>
            }
            else return 'Why you do that?';
        }
        return (
           <div className='wizard-page'>
                <Header/>
                <div className='wizard-content'>
                    <div className='sidebar' ></div>
                    <div className='wizard-body'>
                        <div className='wizard-top'>
                                <div className='wizard-top-left'><h1>Add new listing</h1></div>
                                <Link to='/dashboard'><div className='pink-button'><button>Cancel</button></div></Link>
                        </div>
                        { chooseStep(id) }
                    </div>
                    <div className='sidebar' ></div>
                </div>
           </div>
        )
    }
}

export default Wizard;