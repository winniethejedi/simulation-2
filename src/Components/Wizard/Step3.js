import React, { Component } from 'react';
import stepActive from '../Images/step_active.png';
import stepInactive from '../Images/step_inactive.png';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import { step3 } from '../../Redux/Actions/actions';
import { Link } from 'react-router-dom';
import stepCompleted from '../Images/step_completed.png';

class Step3 extends Component {
    constructor(props){
        super(props);
        this.state = {
            url: ''
        }
        this.clickNextStep = this.clickNextStep.bind(this);
        this.handleChange = this.handleChange.bind(this);
    };

    clickNextStep() {
       this.props.step3({
           url: this.state.url,
        });
    }

    componentDidMount(){
        this.setState({
            url: this.props.step3Reducer.url ? this.props.step3Reducer.url : ''
        });
      };

    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    render(){
        return (
           <div className='step-body'>
                <h2>Step 3</h2>
                <div className='step-icons' >
                    <img src={ stepCompleted } alt="Step Completed"/>
                    <img src={ stepCompleted } alt="Step Completed"/>
                    <img src={ stepActive } alt="Step Active"/>
                    <img src={ stepInactive } alt="Step Inactive"/>
                    <img src={ stepInactive } alt="Step Inactive"/>
                </div>
                <div className='step-contents'>
                    <div className='step-image' style={{backgroundImage: `url(${this.state.url})`}} alt='Preview' />
                    <div className='input-box' >
                            <h3>Image URL</h3>
                            <input type="text" name='url' value={this.state.url}  onChange={this.handleChange} />
                    </div>
                    <div className='step-buttons'>
                        <Link to='../wizard/2'><div className='dark-green-button' onClick={this.clickNextStep}><button>Previous Step</button></div></Link>
                        <Link to='../wizard/4'><div className='dark-green-button' onClick={this.clickNextStep}><button>Next Step</button></div></Link>
                    </div>

                </div>
           </div>
        )
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({step3}, dispatch);
}

export default connect(state => state, mapDispatchToProps)(Step3);