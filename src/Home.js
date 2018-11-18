
import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import {
    Accordion,
    AccordionItem,
    AccordionItemTitle,
    AccordionItemBody,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
import './App.css';
import logo from './assets/HEADER.png';
import plus from './assets/plus.png';
import axios from 'axios'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'

const options = [
    'Indica', 'Sativa', 'Hybrid'
];
const defaultOption = options[0];

const initialState = {         
    name: '',
    brand: '',
    strain: '',
    ctype: '',
    thc: '',
    cbd: '',
    title: '',
    description: '',
    wishlist: '',
    quantity: '',
};

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            listings: [],
            name: '',
            brand: '',
            strain: '',
            ctype: '',
            thc: '',
            cbd: '',
            title: '',
        
        
            description: '',
            wishlist: '',
            quantity: '',
            filter: 'Indica'
            
        };
        this.fetchListings = this.fetchListings.bind(this);
        
    }
    renderListings() {
        if (this.state.listings.length > 0) {
            return (
                <Accordion>
                    {this.state.listings.map((item, index) => {
                        return (
                            <AccordionItem key={index}>
                                <AccordionItemTitle>
                                    <h3>{item.title}</h3>
                                </AccordionItemTitle>
                                <AccordionItemBody>
                                    <p>Name: {item.name}</p>
                                    <p>Brand: {item.brand}</p>
                                    <p>Type: {item.name}</p>
                                    <p>Strain: {item.strain}</p>
                                    <p>Category: {item.ctype}</p>
                                    <p>Description: {item.description}</p>
                                    <p>Quantity: {`${item.quantity} grams`}</p>
                                    <p>THC: {item.thc}</p>
                                    <p>CBD: {item.cbd}</p>
                                    <p>Wishlist: {item.wishlist}</p>
                                </AccordionItemBody>
                            </AccordionItem>
                        );
                    })}
                   
                 
                    
                 </Accordion>
                   
            );
        }
        
    }

    componentDidMount() {
       this.fetchListings();
    }

    fetchListings = () => {
        console.log('fetch')
        axios.post(`${URL}/trade/listing/`, {
            strain: this.state.filter
        })
        .then((response) => {
         console.log(response.data);
         console.log(this);
         this.setState({listings: response.data, open: false, ...initialState})
       })
       .catch(function (error) {
         console.log(error);
       });
       
    }

    onCloseModal = () => {
        
        this.setState({ open: false});
    }

    postListing = async () => {
        const { name, brand, strain, ctype, thc, cbd, description, wishlist, title, quantity  } = this.state;
        const data = {
            name, 
            brand,
            strain,
            ctype, 
            thc,
            cbd,
            description,
            wishlist,
            quantity,
            title
        }
        axios.post(`${URL}/trade/post/`, data)
          .then((response) => {
            
            this.fetchListings();
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    handleChange(key, e) {
        
        let value = e.target.value;
        console.log(value)

        this.setState({[key]: e.target.value});
    }
    _onSelect = (value) => {
        this.setState({strain: value.value});
        
    }

    filterChange = (value) => {
        this.setState({ filter: value}, () => this.fetchListings());
    }
    showModal() {
        const { open, name, brand, strain, ctype, thc, cbd, description, wishlist, quantity, title  } = this.state;
        
        return (
            <div>
                <Modal open={open} onClose={() => this.setState({open: false})}>
                    <div id="modal-container">
                        <p style={{alignSelf: 'center'}}>Create Listing</p>
                        <h5 className="title">Title:</h5>
                        <input className="input" onChange={(e => this.handleChange('title', e))} placeholder="Title" value={title} />
                        
                        <h5 className="title">Name:</h5>
                        <input className="input" onChange={(e => this.handleChange('name', e))} placeholder="Name" value={name} />
                        <h5 className="title">Brand:</h5>
                        
                        
                        <input className="input" onChange={(e => this.handleChange('brand', e))} placeholder="Brand" value={brand} />
                        
                        <h5 className="title">Strain:</h5>
                        <div style={{margin: '5px'}}>
                        <Dropdown  options={options} onChange={this._onSelect} value={strain} placeholder="Select a Strain" />
                        </div>
                       
                        <h5 className="title">Category:</h5>
                        <input className="input" onChange={(e => this.handleChange('ctype', e))} placeholder="Category" value={ctype} />
                        
                        <h5 className="title">THC:</h5>
                        <input className="input" onChange={(e => this.handleChange('thc', e))} placeholder="thc" value={thc} />
                        <h5 className="title">CBD:</h5>
                        <input className="input" onChange={(e => this.handleChange('cbd', e))} placeholder="cbd" value={cbd} />
                        <h5 className="title">Description:</h5>
                        <textarea className="input" onChange={(e => this.handleChange('description', e))} placeholder="Description" value={description} />
                        <h5 className="title">Wishlist:</h5>
                        <input className="input" onChange={(e => this.handleChange('wishlist', e))} placeholder="Wishlist" value={wishlist} />
                        <h5 className="title">Quantity:</h5>
                        <input className="input" onChange={(e => this.handleChange('quantity', e))} placeholder="Quantity (g)" value={quantity} />
                       
                        <button style={{margin: '5px', padding: '10px 0'}} onClick={this.postListing}>Create Listing</button>
                    </div>
                    
                </Modal>
            </div>
           
        );
    }
    render() {
       const { filter } = this.state;
        return(
            <div id="home-container">
                
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <img src={logo} width={960} height={150} alt=""/>
                </div>
                {this.showModal()}
                
                <button id="create-btn" onClick={() => this.setState({open: true})}><img src={plus} alt=""/></button>
                <div id="home-content-container">
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <p style={{marginRight: '10px'}}>Filter By: </p>
                        <Dropdown  options={options} onChange={(value) => this.filterChange(value.value)} value={filter} placeholder="Select a Strain" />
                    </div>
                    
                    {this.renderListings()}
                
                </div>
            </div>
        );
    }
}



export default Home;