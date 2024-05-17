import './App.css';
import VideoPlayer from './videoPlayer'
import videoSource from './videoSource'

function App() {
  return (
    <VideoPlayer thumbnail="./thumbnail.jpg" width="800px" aspectRatio="16/9" src={videoSource()}/>
  );
}

export default App;
