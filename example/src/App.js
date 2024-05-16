import './App.css';
import video from './Comp1.mp4';
import VideoPlayer from './videoPlayer'

function App() {
  return (
    <VideoPlayer width="800px" aspectRatio="16/9" src={video}/>
  );
}

export default App;
