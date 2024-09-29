import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useRef,
} from "react";
import { tracks } from "./track";
export interface Track {
  title: string;
  src: string;
  thumbnail: string;
}

interface AudioPlayerContextType {
  currentTracks: Track[];
  currentTrack: Track;
  setCurrentTracks: Dispatch<SetStateAction<Track[]>>;
  setCurrentTrack: Dispatch<SetStateAction<Track>>;
  setTimeProgress: Dispatch<SetStateAction<number>>;
  setDuration: Dispatch<SetStateAction<number>>;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
  audioRef: React.RefObject<HTMLAudioElement>;
  progressBarRef: React.RefObject<HTMLInputElement>;
  isPlaying: boolean;
  duration: number;
  timeProgress: number;
  index: number;
  setIndex: Dispatch<SetStateAction<number>>;
}
const AudioPlayerContext = createContext<AudioPlayerContextType | undefined>(
  undefined
);
export const AudioPlayerProvider = ({ children }: { children: ReactNode }) => {
  const [currentTracks, setCurrentTracks] = useState<Track[]>(tracks);
  const [currentTrack, setCurrentTrack] = useState<Track>(tracks[0]);
  const [timeProgress, setTimeProgress] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLInputElement>(null);
  const [index, setIndex] = useState<number>(0);
  const contextValue = {
    index,
    setIndex,
    currentTracks,
    currentTrack,
    setCurrentTrack,
    setCurrentTracks,
    isPlaying,
    setIsPlaying,
    audioRef,
    progressBarRef,
    timeProgress,
    setTimeProgress,
    duration,
    setDuration,
  };
  return (
    <AudioPlayerContext.Provider value={contextValue}>
      {children}
    </AudioPlayerContext.Provider>
  );
};
export const useAudioPlayerContext = (): AudioPlayerContextType => {
  const context = useContext(AudioPlayerContext);
  if (context === undefined) {
    throw new Error(
      "useAudioPlayerContext must be used within an AudioPlayerProvider"
    );
  }
  return context;
};
