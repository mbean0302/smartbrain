import React, { Component } from 'react';
import particlesOptions from "./particlesOptions";
import Particles from 'react-particles-js';
import SignIn from "./Components/SignIn/SignIn";
import Register from "./Components/Register/Register";
import Clarifai from 'clarifai';
import FaceRecognition from "./Components/FaceRecognition/FaceRecognition";
import Navigation from "./Components/Navigation/Navigation";
import Logo from "./Components/Logo/Logo";
import ImageLinkForm from "./Components/ImageLinkForm/ImageLinkForm";
import Rank from "./Components/Rank/Rank";
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
            box: {},
            route: 'signIn',
            isSignedIn: false
        }
    };

    calculateFaceLocation = (data) => {
        const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
        const image = document.getElementById('inputImage');
        const width = Number(image.width);
        const height = Number(image.height);
        return {
            leftCol: clarifaiFace.left_col * width,
            topRow: clarifaiFace.top_row * height,
            rightCol: width - (clarifaiFace.right_col * width),
            bottomRow: height - (clarifaiFace.bottom_row * height)
        }
    }

    displayFaceBox = (box) => {
        this.setState({ box: box })
    }

    onInputChange = (event) => {
        this.setState({input: event.target.value})
    };

    onButtonSubmit = ({ imageUrl }) => {
        this.setState({imageUrl: this.state.input})
        app.models.predict("a403429f2ddf4b49b307e318f00e528b", this.state.input)
            .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
            .catch(err => console.log("Something went wrong...", err))
    };

    onRouteChange = (route) => {
        if (route === 'signOut') {
            this.setState({isSignedIn: false})
        } else if (route === 'home') {
            this.setState({isSignedIn: true})
        }
        this.setState({route: route});
    }

    render() {
        const { isSignedIn, imageUrl, route, box } = this.state;
        return (
            <div className="App">
                <Particles
                    className='particles'
                    params={particlesOptions}
                />
                <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
                { route === 'home'
                    ? <div>
                        <Logo/>
                        <Rank />
                        <ImageLinkForm
                            onInputChange={this.onInputChange}
                            onButtonSubmit={this.onButtonSubmit}
                        />
                        <FaceRecognition
                            imageUrl={imageUrl}
                            box={box}
                        />
                    </div>
                    : (
                        route === 'signIn'
                        ? <SignIn onRouteChange={this.onRouteChange} />
                        : <Register onRouteChange={this.onRouteChange} />
                    )
                }
        </div>
        );
    };
}

export default App;
