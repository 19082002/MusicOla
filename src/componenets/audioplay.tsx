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
  author: string;
  thumbnail: string;
}
interface AudioPlayerContextType {
  currentTrack: Track;
  setCurrentTrack: Dispatch<SetStateAction<Track>>;
  setTimeProgress: Dispatch<SetStateAction<number>>;
  setDuration: Dispatch<SetStateAction<number>>;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
  audioRef: React.RefObject<HTMLAudioElement>;
  progressBarRef: React.RefObject<HTMLInputElement>;
  isPlaying: boolean;
  duration: number;
  timeProgress: number;
}
const AudioPlayerContext = createContext<AudioPlayerContextType | undefined>(
  undefined
);
export const AudioPlayerProvider = ({ children }: { children: ReactNode }) => {
  const [currentTrack, setCurrentTrack] = useState<Track>(tracks);
  const [timeProgress, setTimeProgress] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLInputElement>(null);
  const contextValue = {
    currentTrack,
    setCurrentTrack,
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
