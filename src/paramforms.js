import React from 'react';
import axios from 'axios';
import { Alert, Form, Button, Card } from 'react-bootstrap';
import  './paramforms.css';
class ConditionalForm extends React.Component{
    
    constructor(){
        super();
        this.state = {
            city: "",
            rainfall: "",
            temp: "",
            wind: "",
            error: ""
        }
    }

    onChangeHandler = (e) =>{
        e.preventDefault();
        this.setState({city: e.target.value})
    }


    handleForm = (e) => {
        e.preventDefault();
        /*alert("Gud")*/
        //alert(e.target.value);
        if(e.target.value != ""){
            //alert("me");
            var city = this.state.city;
            this.getWeatherConditions(city);
            //this.setState({conditions: condition});
        }else{
            //alert("No data")
            //console.log("Zaria");
        }
        
    }

    getWeatherConditions = (city) => {
        axios.get('http://localhost:5000/conditions',
        {params: {city: city}}   
        )
        .then(res => {
            //console.log(res);
            //alert(JSON.stringify(res));
            if(res.data.error == ""){
                //alert(JSON.stringify(res.data.result))
                let temp = JSON.stringify(res.data.result.temp)
                let wind = JSON.stringify(res.data.result.wind)
                let rainfall = JSON.stringify(res.data.result.rainfall)
                this.setState({temp: temp, wind:wind, rainfall:rainfall});
            }else{
                //alert("Error")
                this.setState({temp: "Something went wrong"});
            }
            //this.setState({conditions: res.data});
        })
        .catch( err => {
            //alert("Error 2: " + err);
            //console.log(err);
            //return "Something wrong from react";
        })
    }

    render(){

        return(
            <form onSubmit={this.handleForm}>
                <p>Enter visiting city</p>
                <input id="input" name="city" type="text"  onChange={this.onChangeHandler} placeholder="city" />
                <input type="submit" id="submit" value="check weather" onClick={this.handleForm}/>
                <div>
                    <p>{this.state.error}</p>
                    <p>{this.state.temp}</p>
                    <p>{this.state.rainfall}</p>
                    <p>{this.state.wind}</p>
                </div>    
            </form>    
        );
    }


}

export default  ConditionalForm;