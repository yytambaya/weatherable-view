import React from 'react';
import axios from 'axios';
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
        if(e.target.value != ""){
            var city = this.state.city;
            this.getWeatherConditions(city);
        }
        
    }

    getWeatherConditions = (city) => {
        axios.get('https://weatherableapp.herokuapp.com/conditions',
        {params: {city: city}}   
        )
        .then(res => {
            if(res.data.error == ""){
                let temp = JSON.stringify(res.data.result.temp)
                let wind = JSON.stringify(res.data.result.wind)
                let rainfall = JSON.stringify(res.data.result.rainfall)
                this.setState({temp: temp, wind:wind, rainfall:rainfall});
            }else{
                this.setState({error: "Something went wrong"});
                this.setState({temp: ""});
                this.setState({wind: ""});
                this.setState({rainfall: ""});
                
            }
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