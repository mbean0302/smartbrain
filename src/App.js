import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Navigation from "./Components/Navigation/Navigation";
import Logo from "./Components/Logo/Logo";
import Rank from "./Components/Rank/Rank";
import ImageLinkForm from "./Components/ImageLinkForm/ImageLinkForm";
import './App.css';

const particlesOptions = {
    particles: {
        number: {
            value: 30,
            density: {
                enable: true,
                value_area: 225
            }
        }
    }
}

class App extends Component {
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
                <ImageLinkForm />
                {/*<FaceRecognition />*/}
        </div>
        );
    };
};

export default App;
