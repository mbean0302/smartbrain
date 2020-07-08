import React, { Component } from 'react';
import particlesOptions from "./particlesOptions";
import Particles from 'react-particles-js';
import Navigation from "./Components/Navigation/Navigation";
import Logo from "./Components/Logo/Logo";
import Rank from "./Components/Rank/Rank";
import Clarifai from 'clarifai';
import ImageLinkForm from "./Components/ImageLinkForm/ImageLinkForm";
import './App.css';

const app = new Clarifai.App({
    apiKey: '175962bb26b54a46b1b2df6f1ae019c1'
});


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: ''
        }
    };

    onInputChange = (event) => {
        console.log(event.target.value);
    };

    onButtonSubmit = () => {
        app.models.initModel({id: Clarifai.GENERAL_MODEL, version: "aa7f35c01e0642fda5cf400f543e7c40"})
            .then(generalModel => {
                return generalModel.predict("http://doc.angus.ai/_images/aurelien.jpg");
            })
            .then(response => {
                let concepts = response['outputs'][0]['data']['concepts'];
                console.log(response);
            })
    };

    render() {
        return (
            <div className="App">
                <Particles
                    className='particles'
                    params={particlesOptions}
                />
                <Navigation />
                <Logo/>
                <Rank />
                <ImageLinkForm
                    onInputChange={this.onInputChange}
                    onButtonSubmit={this.onButtonSubmit}
                />
                {/*<FaceRecognition />*/}
        </div>
        );
    };
};

export default App;
