import React, { Component } from 'react';
import stepActive from '../Images/step_active.png';
import stepInactive from '../Images/step_inactive.png';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import { step2 } from '../../Redux/Actions/actions';
import { Link } from 'react-router-dom';
import stepCompleted from '../Images/step_completed.png';

class Step2 extends Component {
    constructor(props){
        super(props);
        this.clickNextStep = this.clickNextStep.bind(this);
    }

    componentDidMount(){
      this.refs.address.value = this.props.step2Reducer.address?this.props.step2Reducer.address: '';
      this.refs.city.value = this.props.step2Reducer.city?this.props.step2Reducer.city: '';
      this.refs.state.value = this.props.step2Reducer.state?this.props.step2Reducer.state: '';
      this.refs.zip_code.value = this.props.step2Reducer.zip_code?this.props.step2Reducer.zip_code: '';
    }

    clickNextStep() {
       this.props.step2({
           address: this.refs.address.value,
           city: this.refs.city.value,
           state: this.refs.state.value,
           zip_code: this.refs.zip_code.value,
        });
    }

    render(){
        return (
           <div className='step-body'>
                <h2>Step 2</h2>
                <div className='step-icons' >
                    <img src={ stepCompleted } alt="Step Completed"/>
                    <img src={ stepActive } alt="Step Active"/>
                    <img src={ stepInactive } alt="Step Inactive"/>
                    <img src={ stepInactive } alt="Step Inactive"/>
                    <img src={ stepInactive } alt="Step Inactive"/>
                </div>
                <div className='step-contents'>
                    <div className='input-box' >
                            <h3>Address</h3>
                            <input type="text" ref='address' />
                    </div>
                    <div className='input-box' >
                            <h3>City</h3>
                            <input type="text" ref='city'/>
                    </div>
                    <div className='input-box' >
                            <h3>State</h3>
                            <input type="text" ref='state' />
                    </div>
                    <div className='input-box' >
                            <h3>Zip</h3>
                            <input type="text" ref='zip_code' />
                    </div>
                    <div className='step-buttons' >
                        <Link to='../wizard/1'><div className='dark-green-button' onClick={this.clickNextStep}><button>Previous Step</button></div></Link>
                        <Link to='../wizard/3'><div className='dark-green-button' onClick={this.clickNextStep}><button>Next Step</button></div></Link>
                    </div>
                </div>
           </div>
        )
    }
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({step2}, dispatch);
}

export default connect(state => state, mapDispatchToProps)(Step2);