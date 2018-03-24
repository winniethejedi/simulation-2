import React, { Component } from 'react';
import stepActive from '../Images/step_active.png';
import stepInactive from '../Images/step_inactive.png';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import { step4 } from '../../Redux/Actions/actions';
import { Link } from 'react-router-dom';
import stepCompleted from '../Images/step_completed.png';

class Step4 extends Component {
    constructor(props){
        super(props);
        this.clickNextStep = this.clickNextStep.bind(this);
    }

    componentDidMount(){
      this.refs.loan.value = this.props.step4Reducer.loan?this.props.step4Reducer.loan: '';
      this.refs.mortgage.value = this.props.step4Reducer.mortgage?this.props.step4Reducer.mortgage: '';
    }

    clickNextStep() {
       this.props.step4({
           loan: this.refs.loan.value,
           mortgage: this.refs.mortgage.value,
        });
    }

    render(){
        return (
           <div className='step-body'>
                <h2>Step 4</h2>
                <div className='step-icons' >
                    <img src={ stepCompleted } alt="Step Completed"/>
                    <img src={ stepCompleted } alt="Step Completed"/>
                    <img src={ stepCompleted } alt="Step Completed"/>
                    <img src={ stepActive } alt="Step Active"/>
                    <img src={ stepInactive } alt="Step Inactive"/>
                </div>
                <div className='step-contents'>
                    <div className='input-box' >
                            <h3>Loan Amount</h3>
                            <input type="text" ref='loan' />
                    </div>
                    <div className='input-box' >
                            <h3>Monthly Mortgage</h3>
                            <input type="text" ref='mortgage'/>
                    </div>
                    <div className='step-buttons' >
                        <Link to='../wizard/3'><div className='dark-green-button' onClick={this.clickNextStep}><button>Previous Step</button></div></Link>
                        <Link to='../wizard/5'><div className='dark-green-button' onClick={this.clickNextStep}><button>Next Step</button></div></Link>
                    </div>

                </div>
           </div>
        )
    }
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({step4}, dispatch);
}

export default connect(state => state, mapDispatchToProps)(Step4);