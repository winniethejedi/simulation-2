import React, { Component } from 'react';
import Header from '../Header/Header';
import './Dashboard.css';
import axios from 'axios';
import { Link } from 'react-router-dom';


class Dashboard extends Component {
    constructor(props){
        super(props)
        this.state = {
            filter: '',
            properties: [],
        }
        this.handleChange = this.handleChange.bind(this);
        this.getProperties = this.getProperties.bind(this);
        this.deleteproperty = this.deleteProperty.bind(this);
        this.resetProperties = this.resetProperties.bind(this);
    };
     
    getProperties() {
        axios.get(`/api/properties?filter=${this.state.filter}`)
            .then(res => {
                this.setState({
                    properties: res.data,
                });
            });
    };

    deleteProperty(id) {
        axios.delete(`/api/properties/${id}`)
        .then(res => {
            this.getProperties();
        });
    };

    resetProperties() {
        this.setState({
            filter: ''
        });
        this.getProperties();
    }

    componentWillMount() {
        this.getProperties();
    };

    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    render(){
        const properties = this.state.properties.map((property) => {
            const mortgage = parseInt(property.mortgage, 10);
            const recommendedRent = mortgage + (0.25 * mortgage);
            return (
                     <div className='property-container' key={property.id} >
                    <div className='property-image' style={{backgroundImage: "url(" + property.url + ")"}} >
                    {/* <img src={property.url} alt={property.name}/> */}
                    </div>
                    <div className='property-name-description'>
                        <h4>{property.name}</h4>
                        <p>{property.description}</p>
                    </div>
                    <div className='property-info'>
                        <p>Loan: ${property.loan}</p>
                        <p>Monthly Mortgage: ${property.mortgage}</p>
                        <p>Recommended Rent: ${recommendedRent}</p>
                        <p>Desired Rent: ${property.desired_rent}</p>
                        <p>Address: {property.address}</p>
                        <p>City: {property.city}</p>
                        <p>State: {property.state}</p>
                        <p>Zip: {property.zip_code}</p>
                        <div className='delete-property-button' onClick={() => this.deleteProperty(property.id)}><button>X</button></div>
                    </div>
                </div>
            )
        });

        return (
           <div className='dashboard-page' >
            <Header/>
            <div className='dashboard-content' >
            <div className='sidebar' ></div>
                <div className='dashboard-body'>
                    <Link to='/wizard/1'><div className='light-green-button' id='add-property'><button>Add new property</button></div></Link>
                    <div className='filter-content'>
                        <h4>List properties with "desired rent" greater than:</h4>
                        <div className='dollar-input'>
                            <h4 id='dollar-sign'>$</h4>
                            <input onChange={this.handleChange} name='filter' type="number" value={this.state.filter} placeholder='0'/>
                            </div>
                        <div className='light-green-button' onClick={this.getProperties} ><button>Filter</button></div>
                        <div className='dark-green-button' onClick={this.resetProperties} ><button>Reset</button></div>
                    </div>
                    <div className='listings' >
                        <h1>Home Listings</h1>
                        {properties}
                    </div>
                </div>
                <div className='sidebar' ></div>
                </div>
           </div>
        )
    }
}
export default Dashboard;