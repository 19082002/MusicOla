import "../css/play.css"
import {
Heart,
SkipBack,
SkipForward,
Pause,
Volume2,
Repeat2,
ListMusic,
Play

} from "lucide-react";
import {  Link} from "react-router-dom";
import { useAudioPlayerContext } from "./audioplay";
import { useCallback, useEffect, useRef } from "react";
function Playcom() {
  const {currentTrack,isPlaying, setIsPlaying, progressBarRef, audioRef, timeProgress, duration,setDuration,setTimeProgress,} =useAudioPlayerContext();
  const handleProgressChange = () => {
    if (audioRef.current && progressBarRef.current) {
      const newTime = Number(progressBarRef.current.value);
      audioRef.current.currentTime = newTime;
      setTimeProgress(newTime);
      progressBarRef.current.style.setProperty(
        "--range-progress",
        `${(newTime / duration) * 100}%`
      );
    }
  };

  const updateProgress = useCallback(() => {
    if (audioRef.current && progressBarRef.current && duration) {
      const currentTime = audioRef.current.currentTime;  
      if(audioRef.current.currentTime===duration){
        setTimeProgress(0)
        setIsPlaying(false)
      }
      setTimeProgress(currentTime);
      progressBarRef.current.value = currentTime.toString();
      progressBarRef.current.style.setProperty(
        "--range-progress",
        `${(currentTime / duration) * 100}%`
      );
    }
  }, [duration, setTimeProgress, audioRef, progressBarRef]);
  const startAnimation = useCallback(() => {
    if (audioRef.current && progressBarRef.current && duration) {
      const animate = () => {
        updateProgress();
        playAnimationRef.current = requestAnimationFrame(animate);
      };
      playAnimationRef.current = requestAnimationFrame(animate);
    }
  }, [updateProgress, duration, audioRef, progressBarRef]);

  const playAnimationRef = useRef<number | null>(null);
  useEffect(() => {
    // console.log(audioRef.current.currentTime)
    audioRef.current.currentTime = timeProgress
    if (isPlaying) {
      audioRef.current?.play();
      startAnimation();
    } else {
      audioRef.current?.pause();
      if (playAnimationRef.current !== null) {
        cancelAnimationFrame(playAnimationRef.current);
        playAnimationRef.current = null;
      }
      updateProgress();
    }
    return () => {
      if (playAnimationRef.current !== null) {
        cancelAnimationFrame(playAnimationRef.current);
      }
    };
  }, [isPlaying, startAnimation, updateProgress, audioRef]);
  const onLoadedMetadata = () => {
    const seconds = audioRef.current?.duration;
    if (seconds !== undefined) {
      setDuration(seconds);
      if (progressBarRef.current) {
        progressBarRef.current.max = seconds.toString();
      }
    }
  };
  return (
    <>
    
      {/* <audio src={currentTrack.src} ref={audioRef}/> */}
      <div className="playmain">
      <Link to="/music">
        <div className="image">
      <img src={currentTrack.thumbnail}style={{width:"40px",height:"40px"}} />
        <div className="heading">
            <p>{currentTrack.title}</p>
            <p className="author">{currentTrack.author}</p>
        </div>   
        </div>
        </Link>
        <div className="btn">
        <SkipBack  className="back playicon"style={{width:"18px"}}/>
        <button onClick={() => setIsPlaying((prev) => !prev)}>
                {isPlaying ? (
                  <Pause className="pause" style={{ width: "20px" }} />
                ) : (
                  <Play className="pause" style={{ width: "20px" }} />
                )}
              </button>
        <SkipForward className="forward playicon" style={{width:"18px"}}/>
        
        </div>
        <div className="audio">
          <div className="audiohr">
        <input
                ref={progressBarRef}
                className="range"
                type="range"
                defaultValue="0"
                onChange={handleProgressChange}
              />
              </div>
        </div>
        <div className="sound">
        <Volume2  className="playicon"style={{width:"18px"}}/>
        <hr className="soundhr"/>
        </div>
        <div className="type">
        <Heart className="playicon"style={{width:"18px"}}/>
        <Repeat2 className="playicon"style={{width:"18px"}}/>
        <ListMusic className="playicon"style={{width:"18px"}}/>
        </div>
      </div>
      <audio
        src={currentTrack.src}
        ref={audioRef}
        onLoadedMetadata={onLoadedMetadata}
      />
       {/* </Link> */}
    </>
  )
}

export default Playcom
