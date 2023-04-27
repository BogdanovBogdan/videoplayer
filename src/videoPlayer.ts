import { VideoPlayerLibrary } from './types';
import { DASHLibrary, HLSLibrary, NativeLibrary } from './videoPlayerLibraries';
import VideoPlayerStateLogger from './videoPlayerStateLogger';

interface VideoLoader {
  load(url: string): void;
}

export default class VideoPlayer implements VideoLoader {
  private videoElement: HTMLVideoElement;
  private videoPlayerLibrary: VideoPlayerLibrary;

  constructor(videoElement: HTMLVideoElement) {
    this.videoElement = videoElement;
    const playbackStateLogger = new VideoPlayerStateLogger(this.videoElement);
    playbackStateLogger.enable();
    const videoUrl = this.videoElement.getAttribute('src');
    if (videoUrl) {
      const videoType = this.getVideoType(videoUrl);
      this.videoPlayerLibrary = this.getVideoPlayerLibrary(videoType);
      this.videoPlayerLibrary.play();
    }
  }

  public load(url: string): void {
    if (this.videoPlayerLibrary) {
      this.videoPlayerLibrary.stop();
    }
    const videoType = this.getVideoType(url);
    this.videoElement.setAttribute('src', url);
    this.videoPlayerLibrary = this.getVideoPlayerLibrary(videoType);
    this.videoPlayerLibrary.play();
    if (this.videoElement.muted) {
      this.videoPlayerLibrary.setMute(false);
    }
  }

  private getVideoType(url: string): string {
    if (url.endsWith('.mp4')) {
      return 'mp4';
    } else if (url.endsWith('.m3u8')) {
      return 'hls';
    } else if (url.endsWith('.mpd')) {
      return 'dash';
    } else {
      throw new Error(`Unsupported video format for url: ${url}`);
    }
  }

  private getVideoPlayerLibrary(videoType: string): VideoPlayerLibrary {
    const videoElement = this.videoElement;
    const source = videoElement.getAttribute('src');
    switch (videoType) {
      case 'mp4':
        return new NativeLibrary(videoElement);
      case 'hls':
        if (Hls.isSupported()) {
          return new HLSLibrary(videoElement, source);
        } else if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
          return new NativeLibrary(videoElement);
        } else {
          throw new Error('Hls video type is not supported');
        }
      case 'dash':
        return new DASHLibrary(videoElement, source);
      default:
        throw new Error(`Unsupported video type: ${videoType}`);
    }
  }
}
