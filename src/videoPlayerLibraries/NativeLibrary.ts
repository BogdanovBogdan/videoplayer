import { VideoPlayerLibrary } from '../types';

export class NativeLibrary implements VideoPlayerLibrary {
  protected videoElement: HTMLVideoElement;

  constructor(videoElement: HTMLVideoElement) {
    this.videoElement = videoElement;
  }

  public play(): void {
    this.videoElement.play();
  }

  public stop(): void {
    this.videoElement.pause();
    this.videoElement.currentTime = 0;
  }

  public pause(): void {
    this.videoElement.pause();
  }

  public setMute(value: boolean): void {
    this.videoElement.muted = value;
  }
}
