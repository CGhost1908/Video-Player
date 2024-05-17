# Video-Player-React
-> Upload files from "player" to "src" and "public".

-> Add the following lines to parent js.

  import VideoPlayer from './videoPlayer'
  
  import videoSource from './videoSource'

-> You can use player with below tag

  <VideoPlayer thumbnail="./thumbnail.jpg" width="800px" aspectRatio="16/9" src={videoSource()}/>

-> You can change video source from videoSource.js Line1. (Video must be in public folder.)
