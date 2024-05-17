import './videoPlayer.css';
import React, { useRef, useState, useEffect } from 'react';

function VideoPlayer(props) {

    const videoRef = useRef(null);
 
    if(videoRef.current){
        videoRef.current.volume = localStorage.getItem('volume');
    }

    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [progressWidth, setProgressWidth] = useState(0);
    const hideControlsTimeoutRef = useRef(null);


    useEffect(() => {
        const interval = setInterval(() => {
        if (videoRef.current) {
            setCurrentTime(videoRef.current.currentTime);
            setDuration(videoRef.current.duration);
            const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
            setProgressWidth(progress);
        }
        }, 100);
        return () => clearInterval(interval);
    }, []);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const handleMouseEnter = () => {
        document.querySelector('#bottom').style.opacity = '1';
        document.querySelector('#top').style.opacity = '1';
        document.querySelector('#video').style.cursor = 'auto';
        clearTimeout(hideControlsTimeoutRef.current);
      };
      
    const handleMouseLeave = () => {
        if(!videoRef.current.paused){
            hideControlsTimeoutRef.current = setTimeout(() => {
                document.querySelector('#bottom').style.opacity = '0';
                document.querySelector('#top').style.opacity = '0';
                document.querySelector('#video').style.cursor = 'none';
            }, 1500); // 3 saniye sonra kontrol arayüzlerini gizle
        }
    };

    const handleMouseMove = () => {
        document.querySelector('#bottom').style.opacity = '1';
        document.querySelector('#top').style.opacity = '1';
        document.querySelector('#video').style.cursor = 'auto';
        clearTimeout(hideControlsTimeoutRef.current);
        if(!videoRef.current.paused){
            hideControlsTimeoutRef.current = setTimeout(() => {
                if(!videoRef.current.paused){
                    document.querySelector('#bottom').style.opacity = '0';
                    document.querySelector('#top').style.opacity = '0';
                    document.querySelector('#video').style.cursor = 'none';
                }
            }, 3000); // 3 saniye sonra kontrol arayüzlerini gizle
        }
    };

    const handleRangeChange = (e) => {
        const newTime = e.target.value;
        videoRef.current.currentTime = newTime;
        setCurrentTime(newTime);
        setProgressWidth((newTime / duration) * duration);
    };

    const toggleVideo = () => {
      if (videoRef.current.paused) {
        videoRef.current.play();
        document.querySelector('#play').style.opacity = '0';
        document.querySelector('#video').style.cursor = 'none';
        document.querySelector('#bottom').style.opacity = '0';
        document.querySelector('#top').style.opacity = '0';
      } else {
        videoRef.current.pause();
        document.querySelector('#play').style.opacity = '1';
        document.querySelector('#video').style.cursor = 'auto';
        document.querySelector('#bottom').style.opacity = '1';
        document.querySelector('#top').style.opacity = '1';
      }
    };


    const handleVolumeChange = (event) => {
        const volume = parseFloat(event.target.value);
        if (videoRef.current) {
            localStorage.setItem('volume', volume);
            videoRef.current.volume = volume;
        }
        localStorage.setItem('volume', volume);
    };

    const muteVolume = () => {
        if(localStorage.getItem('volume') != 0){
            localStorage.setItem('previousVolume', localStorage.getItem('volume'));
            localStorage.setItem('volume', 0);
            document.querySelector('.sound-range').value = 0;
        }else{
            localStorage.setItem('volume', localStorage.getItem('previousVolume'));
            document.querySelector('.sound-range').value = localStorage.getItem('previousVolume');
        }
    }

    const changePlaybackRate = (rate) => {
        if (videoRef.current) {
            videoRef.current.playbackRate = rate;
        }
    };

    const skipForward = () => {
        if (videoRef.current) {
            videoRef.current.currentTime += 5;
        }
    };

    const skipBackward = () => {
        if (videoRef.current) {
            videoRef.current.currentTime -= 5;
        }
    };

    const handleFullScreen = () => {
        if (!document.fullscreenElement) {
            if (videoRef.current.requestFullscreen) {
                document.documentElement.requestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    };

    document.addEventListener('fullscreenchange', function(event) {
        if (document.fullscreenElement) {
            document.querySelector('#main').classList = 'fullscreen-main';
            document.querySelector('#main').style.width = '100%';
            document.querySelector('#video').classList = 'fullscreen-video';
            document.querySelector('#video').style.width = '100%';
            document.querySelector('#bottom').classList = 'fullscreen-bottom';
            document.querySelector('#forward').classList = 'skip-fullscreen';
            document.querySelector('#backward').classList = 'skip-fullscreen';
            document.querySelector('#play').classList = 'play-fullscreen';
            document.querySelector('#top').style.width = '98%';
        } else {
            document.querySelector('#main').classList = 'main';
            document.querySelector('#main').style.width = props.width;
            document.querySelector('#video').classList = 'video';
            document.querySelector('#video').style.width = props.width;
            document.querySelector('#bottom').classList = 'bottom';
            document.querySelector('#timing-range').classList = 'timing-range';
            document.querySelector('#forward').classList = 'skip-button';
            document.querySelector('#backward').classList = 'skip-button';
            document.querySelector('#play').classList = 'play';
            document.querySelector('#top').style.width = `calc(${props.width} - 15px)`;
        }
    });

    const handleVideoEnded = () => {
        document.querySelector('#play').style.opacity = '1';
         // bottom kodunu da yaz
        document.querySelector('#bottom').style.opacity = '1';
        document.querySelector('#top').style.opacity = '1';
    };

  return (
    <div id='main' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onMouseMove={handleMouseMove} className='main' style={{ width: props.width, height: props.height, aspectRatio: props.aspectRatio, minWidth: '400px'}}>
        <video
        className='video'
        id='video'
        ref={videoRef}
        onClick={toggleVideo}
        onEnded={handleVideoEnded}
        poster={props.thumbnail}
        style={{ width: props.width, height: props.height, aspectRatio: props.aspectRatio, minWidth: '400px'}}
        src={props.src} 
        >{videoRef.current && !videoRef.current.paused ? 'Pause' : 'Play'}
        </video>
        <img src="play.png" id='play' className="play" />

        <div id='top' className="top" style={{ width: `calc(${props.width} - 15px)` }}>
            <div className="sound">
                <img className='sound-button' src="sound.png" onClick={muteVolume}/>
                <div className="frame">
                    <input type="range" min="0" max="1" step="0.01" defaultValue={localStorage.getItem('volume')} onChange={handleVolumeChange} className="sound-range" />
                </div>
            </div>

            <div className="right-top">
                <div className="speed">
                    <button className='speed-button' onClick={() => changePlaybackRate(0.25)}>0.25x</button>
                    <button className='speed-button' onClick={() => changePlaybackRate(0.5)}>0.5x</button>    
                    <button className='speed-button' onClick={() => changePlaybackRate(1)}>1x</button>    
                    <button className='speed-button' onClick={() => changePlaybackRate(1.5)}>1.5x</button>    
                    <button className='speed-button' onClick={() => changePlaybackRate(2)}>2x</button>    
                </div>
            </div>
        </div>

        <div id='bottom' className="bottom">
            <img className='skip-button' id="backward" src='backward.png' onClick={skipBackward}/>
            <h1 id='time' className='time'>{formatTime(currentTime)} / {formatTime(duration)}</h1>
            <img className='skip-button' id="forward" src='forward.png' onClick={skipForward}/>
            <input id='timing-range' type="range" min="0" max={duration} value={(currentTime / duration) * duration} onChange={handleRangeChange} className='timing-range' />
            <img src='fullscreen.png' onClick={handleFullScreen} className="fullscreen-button"/>
        </div>
    </div>
  )
}

export default VideoPlayer