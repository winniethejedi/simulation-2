import React, { Component } from 'react';
import stepActive from '../Images/step_active.png';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import { step5, resetRedux } from '../../Redux/Actions/actions';
import { Link } from 'react-router-dom';
import stepCompleted from '../Images/step_completed.png';
import axios from 'axios';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

class Step5 extends Component {
    // static PropTypes = {
    //     match: PropTypes.object.isRequired,
    //     location: PropTypes.object.isRequired,
    //     history: PropTypes.object.isRequired
    // }

    constructor(props){
        super(props);
        this.clickNextStep = this.clickNextStep.bind(this);
        this.clickComplete = this.clickComplete.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
      this.refs.desired_rent.value = this.props.step5Reducer.desired_rent?this.props.step5Reducer.desired_rent: '';
    }

    clickNextStep() {
       this.props.step5({
           desired_rent: this.refs.desired_rent.value,
        });
    }

    handleChange() {
        this.props.step5({
            desired_rent: this.refs.desired_rent.value,
         });
     }

    clickComplete() {
        this.props.step5({
            desired_rent:  parseInt(this.refs.desired_rent.value, 10),
         });
        const allPropertyInfo = {
            ...this.props.step1Reducer,
            ...this.props.step2Reducer,
            ...this.props.step3Reducer,
            ...this.props.step4Reducer,
            ...this.props.step5Reducer
        };
        axios.post('/api/properties', allPropertyInfo)
        .then(res => {
            this.props.history.push('/dashboard');
        })
        this.props.resetRedux();
    };

    render(){
        const monthlyMortgage = parseInt(this.props.step4Reducer.mortgage, 10)
        const recommendedRent =  monthlyMortgage + (monthlyMortgage * 0.25);
        return (
           <div className='step-body'>
                <h2>Step 5</h2>
                <div className='step-icons' >
                    <img src={ stepCompleted } alt="Step Completed"/>
                    <img src={ stepCompleted } alt="Step Completed"/>
                    <img src={ stepCompleted } alt="Step Completed"/>
                    <img src={ stepCompleted } alt="Step Completed"/>
                    <img src={ stepActive } alt="Step Active"/>
                </div>
                <div className='step-contents'>
                    <h3 id='recommended-rent' >Recommended Rent ${recommendedRent}</h3>
                    <div className='input-box' >
                            <h3>Desired Rent</h3>
                            <input type="text" ref='desired_rent' onChange={this.handleChange} />
                    </div>
                    <div className='step-buttons' >
                        <Link to='../wizard/4'><div className='dark-green-button' onClick={this.clickNextStep}><button>Previous Step</button></div></Link>
                        <div className='light-green-button' onClick={this.clickComplete}><button>Complete</button></div>
                    </div>

                </div>
           </div>
        )
    }
}


function mapDispatchToProps(dispatch){
    return bindActionCreators({step5, resetRedux}, dispatch);
}

export default connect(state => state, mapDispatchToProps)(Step5);