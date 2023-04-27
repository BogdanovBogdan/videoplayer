import { VideoPlayerLibrary } from '../types';
import { NativeLibrary } from './NativeLibrary';

export class DASHLibrary extends NativeLibrary implements VideoPlayerLibrary {
  private source: string;
  private dashPlayer: typeof dashjs | null;

  constructor(videoElement: HTMLVideoElement, source: string) {
    super(videoElement);
    this.source = source;
    this.dashPlayer = dashjs.MediaPlayer().create();
    this.dashPlayer.initialize(this.videoElement, this.source, false);
  }

  public play = () => {
    this.dashPlayer.play();
  };

  public stop = () => {
    this.dashPlayer.reset();
  };

  public pause = () => {
    this.dashPlayer.pause();
  };
}
