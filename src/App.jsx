import './App.css'
import ParticlesBg from 'particles-bg'
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import Rank from './components/Rank/Rank'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import SignIn from './components/SignIn/SignIn'
import Register from './components/Register/Register'
import { useState } from 'react'

function App() {
  
  const [ inputImageUrl, setInputImageUrl] = useState('');
  const [ imageBox, setImageBox] = useState({});
  const [ route, setRoute] = useState('signin');
  const [ isSignedIn, setIsSignedIn] = useState(false);

  /* Clarifai Configuration */
  const getClarifaiRequestConfiguration = (imageUrl) => {
    // Your PAT (Personal Access Token) can be found in the Account's Security section
    const PAT = '4dfa6fe26d93424ebb23148b2336edf8';

    // Specify the correct user_id/app_id pairings
    const USER_ID = 'jlcbranco';
    const APP_ID = 'facerecognitionbrain';

    const raw = JSON.stringify({
      "user_app_id": {
          "user_id": USER_ID,
          "app_id": APP_ID
      },
      "inputs": [
          {
              "data": {
                  "image": {
                      "url": imageUrl
                  }
              }
          }
      ]
    });

    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'mode': 'no-cors',
            'Authorization': 'Key ' + PAT
        },
        body: raw
    };

    return requestOptions;
  }
  /* End of Clarifai Configuration */

  const calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const imageWidth = Number(image.width);
    const imageHeight = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * imageWidth,
      topRow: clarifaiFace.top_row * imageHeight,
      rightCol: imageWidth - (clarifaiFace.right_col * imageWidth),
      bottomRow: imageHeight - (clarifaiFace.bottom_row * imageHeight),
    }
    console.log(clarifaiFace, width, height)
    /*
    const regions = result.outputs[0].data.regions;

    regions.forEach(region => {
        // Accessing and rounding the bounding box values
        const boundingBox = region.region_info.bounding_box;
        const topRow = boundingBox.top_row.toFixed(3);
        const leftCol = boundingBox.left_col.toFixed(3);
        const bottomRow = boundingBox.bottom_row.toFixed(3);
        const rightCol = boundingBox.right_col.toFixed(3);

        region.data.concepts.forEach(concept => {
            // Accessing and rounding the concept value
            const name = concept.name;
            const value = concept.value.toFixed(4);

            console.log(`${name}: ${value} BBox: ${topRow}, ${leftCol}, ${bottomRow}, ${rightCol}`);
            
        });
    });    
    */
  }

  const displayFaceBox = (box) => {
    console.log(box)
    setImageBox(box);
  }

  const handleInputChange = (event) => {
    setInputImageUrl(event.target.value);
    console.log("eventTarget", event.target.value);
  }

  const handleButton = () => {
    console.log('click');
    fetch("https://api.clarifai.com/v2/models/face-detection/versions/6dc7e46bc9124c5c8824be4822abe105/outputs", getClarifaiRequestConfiguration(inputImageUrl))
        .then(response => response.json())
        .then(result => displayFaceBox(calculateFaceLocation(result)))
        .catch(error => console.log('error', error));
  }

  const onRoutechange = (route) => {
    setIsSignedIn(route === 'home');
    setRoute(route);
  }

  return (
    <>
      <div className='App'>
        <ParticlesBg type="cobweb" color='#F2EFE9' bg={true} />
        <Navigation isSignedIn={isSignedIn} onRouteChange={onRoutechange} />
        {
          route === 'home'
          ?
            <>
              <Logo />
              <Rank />
              <ImageLinkForm handleInput={handleInputChange} handleButton={handleButton} />
              <FaceRecognition imageUrl={inputImageUrl} imageBox={imageBox} />
            </>            
          : (
            route === 'signin'
            ? <SignIn onRouteChange={onRoutechange} />
            : <Register onRouteChange={onRoutechange} />
          )

        }
      </div>
    </>
  )
}

export default App
