export interface VideoPlayerLibrary {
  play(): void;
  stop(): void;
  pause(): void;
  setMute(value: boolean): void;
}
