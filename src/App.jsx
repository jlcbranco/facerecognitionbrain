import './App.css'
import ParticlesBg from 'particles-bg'
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import Rank from './components/Rank/Rank'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'

function App() {
  return (
    <>
      <div className='App'>
        <ParticlesBg type="cobweb" color='#F2EFE9' bg={true} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm />
        <FaceRecognition />
      </div>
    </>
  )
}

export default App
