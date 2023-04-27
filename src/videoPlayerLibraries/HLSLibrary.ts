import { VideoPlayerLibrary } from '../types';
import { NativeLibrary } from './NativeLibrary';

export class HLSLibrary extends NativeLibrary implements VideoPlayerLibrary {
  private source: string;
  private hls: typeof Hls | null;

  constructor(videoElement: HTMLVideoElement, source: string) {
    super(videoElement);
    this.source = source;
    this.hls = new Hls();
    this.hls.loadSource(this.source);
    this.hls.attachMedia(this.videoElement);
  }

  public stop(): void {
    this.hls.destroy();
  }
}
