export default class VideoPlayerStateLogger {
  private videoElement: HTMLVideoElement;

  constructor(videoElement: HTMLVideoElement) {
    this.videoElement = videoElement;
    this.playbackStatusLogging = this.playbackStatusLogging.bind(this);
  }

  public enable() {
    this.videoElement.addEventListener('emptied', this.playbackStatusLogging);
    this.videoElement.addEventListener('loadstart', this.playbackStatusLogging);
    this.videoElement.addEventListener('canplay', this.playbackStatusLogging);
    this.videoElement.addEventListener('playing', this.playbackStatusLogging);
    this.videoElement.addEventListener('pause', this.playbackStatusLogging);
    this.videoElement.addEventListener('seeking', this.playbackStatusLogging);
    this.videoElement.addEventListener('ended', this.playbackStatusLogging);
    this.videoElement.addEventListener('progress', this.playbackStatusLogging);
  }

  public disable() {
    this.videoElement.removeEventListener(
      'emptied',
      this.playbackStatusLogging
    );
    this.videoElement.removeEventListener(
      'loadstart',
      this.playbackStatusLogging
    );
    this.videoElement.removeEventListener(
      'canplay',
      this.playbackStatusLogging
    );
    this.videoElement.removeEventListener(
      'playing',
      this.playbackStatusLogging
    );
    this.videoElement.removeEventListener('pause', this.playbackStatusLogging);
    this.videoElement.removeEventListener(
      'seeking',
      this.playbackStatusLogging
    );
    this.videoElement.removeEventListener('ended', this.playbackStatusLogging);
    this.videoElement.removeEventListener(
      'progress',
      this.playbackStatusLogging
    );
  }

  private bufferingDurationLogging() {
    const video = this.videoElement;
    const duration = video.duration;
    const buffered = video.buffered;

    if (duration > 0) {
      for (let i = 0; i < buffered.length; i++) {
        const startBuffered = Math.round(
          buffered.start(buffered.length - 1 - i)
        );
        const endBuffered = Math.round(buffered.end(buffered.length - 1 - i));
        const durationBuffered = endBuffered - startBuffered;

        console.group(`Buffering duration [range ${i + 1}]`);
        console.log(
          `start: ${startBuffered}s`,
          `\nend: ${endBuffered}s`,
          `\nduration: ${durationBuffered}s`
        );
        console.groupEnd();
      }
    }
  }

  private playbackStatusLogging(event: Event) {
    const { type } = event;
    const playbackStatusEvents = {
      emptied: 'IDLE',
      loadstart: 'LOADING',
      progress: 'BUFFERING',
      canplay: 'READY',
      playing: 'PLAYING',
      pause: 'PAUSED',
      seeking: 'SEEKING',
      ended: 'ENDED',
    };

    console.log(
      `%c video playback status: ${
        playbackStatusEvents[type as keyof typeof playbackStatusEvents]
      } `,
      'font-weight: 600; color: black; background-color: white'
    );

    if (type === 'progress') {
      this.bufferingDurationLogging();
    }
  }
}
