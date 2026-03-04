import React, { useRef, useState, useEffect, useContext } from "react";
import { SongContext } from "../SongContext";
import "../style/player.scss";
import { useSong } from "../hooks/useSong";

const Player = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [volume, setVolume] = useState(1);
  const { song } = useSong();

  useEffect(() => {
    if (audioRef.current && song?.url) {
      audioRef.current.src = song.url;
    }
  }, [song?.url]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = speed;
    }
  }, [speed]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleProgressChange = (e) => {
    const time = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const skipForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(
        audioRef.current.currentTime + 5,
        duration,
      );
    }
  };

  const skipBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(
        audioRef.current.currentTime - 5,
        0,
      );
    }
  };

  const formatTime = (time) => {
    if (!time || isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleEnded = () => {
    setIsPlaying(false);
  };

  return (
    <div className="player-container">
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
      />

      <div className="player-content">
        {/* Song Info */}
        <div className="song-info">
          <div className="poster-wrapper">
            <img src={song?.posterUrl} alt={song?.title} className="poster" />
            {isPlaying && <div className="playing-indicator"></div>}
          </div>
          <div className="song-details">
            <h3 className="song-title">{song?.title || "Select a song"}</h3>
            <p className="song-mood">Mood: {song?.mood || "unknown"}</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="progress-container">
          <span className="time-display">{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleProgressChange}
            className="progress-bar"
          />
          <span className="time-display">{formatTime(duration)}</span>
        </div>

        {/* Controls */}
        <div className="controls">
          <div className="main-controls">
            <button
              className="control-btn skip-btn"
              onClick={skipBackward}
              title="Skip 5 seconds backward"
            >
              <span>⏮ -5s</span>
            </button>

            <button
              className={`control-btn play-btn ${isPlaying ? "playing" : ""}`}
              onClick={handlePlayPause}
            >
              <span>{isPlaying ? "⏸" : "▶"}</span>
            </button>

            <button
              className="control-btn skip-btn"
              onClick={skipForward}
              title="Skip 5 seconds forward"
            >
              <span>+5s ⏭</span>
            </button>
          </div>

          {/* Speed and Volume Controls */}
          <div className="secondary-controls">
            <div className="volume-control">
              <label htmlFor="volume">🔊</label>
              <input
                id="volume"
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="volume-slider"
              />
            </div>

            <div className="speed-control">
              <label htmlFor="speed">Speed:</label>
              <select
                id="speed"
                value={speed}
                onChange={(e) => setSpeed(parseFloat(e.target.value))}
                className="speed-selector"
              >
                <option value={0.5}>0.5x</option>
                <option value={0.75}>0.75x</option>
                <option value={1}>1x</option>
                <option value={1.25}>1.25x</option>
                <option value={1.5}>1.5x</option>
                <option value={1.75}>1.75x</option>
                <option value={2}>2x</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
