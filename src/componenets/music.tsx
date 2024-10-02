import { useCallback, useEffect, useRef, useState } from "react";
import {
  Heart,
  SkipBack,
  SkipForward,
  Pause,
  Volume2,
  Repeat2,
  // ArrowLeft,
  Play,
  HomeIcon
} from "lucide-react";
import "../css/music.css";
import { Link } from "react-router-dom";
import { useAudioPlayerContext } from "./audioplay";
function Music() {
  // const {  } = useAudioPlayerContext();
  const {
    currentTracks,
    index,
    setIndex,
    setCurrentTrack,
    currentTrack,
    progressBarRef,
    audioRef,
    timeProgress,
    duration,
    setDuration,
    setTimeProgress,
    isPlaying,
    setIsPlaying,
  } = useAudioPlayerContext();
  const [isRepeat, setIsRepeat] = useState<boolean>(false);
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
    // console.log(audioRef.current.currentTime,duration)
    if (isRepeat) setIsRepeat(false);
    if (audioRef.current && progressBarRef.current && duration) {
      const currentTime = audioRef.current.currentTime;
      if (audioRef.current.currentTime === duration) {
        setTimeProgress(0);
        setIsPlaying(false);
      }
      setTimeProgress(currentTime);
      progressBarRef.current.value = currentTime.toString();
      progressBarRef.current.style.setProperty(
        "--range-progress",
        `${(currentTime / duration) * 100}%`
      );
    } else console.log("uyu");
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
    audioRef.current!.currentTime = timeProgress;
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

  const formatTime = (time: number | undefined): string => {
    if (typeof time === "number" && !isNaN(time)) {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      // Convert to string and pad with leading zeros if necessary
      const formatMinutes = minutes.toString().padStart(2, "0");
      const formatSeconds = seconds.toString().padStart(2, "0");
      return `${formatMinutes}:${formatSeconds}`;
    }
    return "00:00";
  };
  const onLoadedMetadata = () => {
    const seconds = audioRef.current?.duration;
    if (seconds !== undefined) {
      setDuration(seconds);
      if (progressBarRef.current) {
        progressBarRef.current.max = seconds.toString();
      }
    }
  };
  const next = () => {
    setIndex((index + 1) % currentTracks.length);
    setCurrentTrack(currentTracks[index]);
    setTimeProgress(0);
    setIsPlaying(true);
  };
  const prev = () => {
    setIndex((index - 1) % currentTracks.length);
    setCurrentTrack(currentTracks[index]);
    setTimeProgress(0);
    setIsPlaying(true);
  };
  return (
    <>
      <div className="musiccontain">
        <div className="musicmain">
          <Link to="/">
            <HomeIcon className="back" />
          </Link>
          <div className="card">
            <div className="image">
              <img src={currentTrack.thumbnail} />
            </div>
          </div>
          <div className="middle">
            <div className="name">
              <div className="heading">
                <p>{currentTrack.title}</p>
                {/* <p className="author">{currentTrack.author}</p> */}
              </div>
              <Heart style={{ width: "20px" }} />
            </div>
            <div className="progressbar">
              <span>{formatTime(timeProgress)}</span>
              <input
                ref={progressBarRef}
                className="range"
                type="range"
                defaultValue="0"
                onChange={handleProgressChange}
              />
              <span>{formatTime(duration)}</span>
            </div>
            <div className="btns">
              <Repeat2
                style={{ width: "20px" }}
                onClick={() => setIsRepeat((prev) => !prev)}
              />
              <SkipBack style={{ width: "20px" }} onClick={prev} />
              <button onClick={() => setIsPlaying((prev) => !prev)}>
                {isPlaying ? (
                  <Pause className="pause" style={{ width: "20px" }} />
                ) : (
                  <Play className="pause" style={{ width: "20px" }} />
                )}
              </button>

              <SkipForward style={{ width: "20px" }} onClick={next} />
              <Volume2 style={{ width: "20px" }} />
            </div>
          </div>
          <div className="lyrics">Lyrics</div>
        </div>
      </div>
      <audio
        src={currentTrack.src}
        ref={audioRef}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={() => {
          setIsPlaying(false);
          setTimeProgress(0);
        }}
      />
    </>
  );
}

export default Music;
