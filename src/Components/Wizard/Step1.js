import React, { Component } from 'react';
import stepActive from '../Images/step_active.png';
import stepInactive from '../Images/step_inactive.png';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import { step1 } from '../../Redux/Actions/actions';
import { Link } from 'react-router-dom';

class Step1 extends Component {
    constructor(props){
        super(props);
        this.clickNextStep = this.clickNextStep.bind(this);
    }

    componentDidMount(){
      this.refs.name.value = this.props.step1Reducer.name?this.props.step1Reducer.name: '';
      this.refs.description.value = this.props.step1Reducer.description?this.props.step1Reducer.description: '';
    }

    clickNextStep() {
       this.props.step1({
           name: this.refs.name.value,
           description: this.refs.description.value
        });
    }

    render(){
        return (
           <div className='step-body'>
                <h2>Step 1</h2>
                <div className='step-icons' >
                    <img src={ stepActive } alt="Step Active"/>
                    <img src={ stepInactive } alt="Step Inactive"/>
                    <img src={ stepInactive } alt="Step Inactive"/>
                    <img src={ stepInactive } alt="Step Inactive"/>
                    <img src={ stepInactive } alt="Step Inactive"/>
                </div>
                <div className='step-contents'>
                    <div className='input-box' >
                            <h3>Property Name</h3>
                            <input type="text" ref='name' />
                    </div>
                    <div className='input-box' >
                            <h3>Property Description</h3>
                            <textarea type="text" ref='description' id='description-input'/>
                    </div>
                    <div className='step-buttons' >
                        <Link to='../wizard/2'><div className='dark-green-button' onClick={this.clickNextStep} ><button>Next Step</button></div></Link>
                    </div>
                </div>
           </div>
        )
    }
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({step1}, dispatch);
}

export default connect(state => state, mapDispatchToProps)(Step1);