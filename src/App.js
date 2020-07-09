import React, { Component } from 'react';
import particlesOptions from "./particlesOptions";
import Particles from 'react-particles-js';
import Navigation from "./Components/Navigation/Navigation";
import Logo from "./Components/Logo/Logo";
import Rank from "./Components/Rank/Rank";
import Clarifai from 'clarifai';
import ImageLinkForm from "./Components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./Components/FaceRecognition/FaceRecognition";
import './App.css';

const app = new Clarifai.App({
    apiKey: '175962bb26b54a46b1b2df6f1ae019c1'
});


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: '',
            imageUrl: '',
            box: {}
        }
    };

    calculateFaceLocation = (data) => {
        const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
        const image = document.getElementById('inputImage');
        const width = Number(image.width);
        const height = Number(image.height);
        console.log(width, height);
}

    onInputChange = (event) => {
        this.setState({input: event.target.value})
    };

    onButtonSubmit = ({ imageUrl }) => {
        this.setState({imageUrl: this.state.input})
        app.models.predict("a403429f2ddf4b49b307e318f00e528b", this.state.input)
            .then(response => this.calculateFaceLocation(response))
            .catch(err => console.log("Something went wrong...", err))
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
                <FaceRecognition
                    imageUrl={this.state.imageUrl}
                />
        </div>
        );
    };
};

export default App;
