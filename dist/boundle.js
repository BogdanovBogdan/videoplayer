(()=>{"use strict";var t,e=function(){function t(t){this.videoElement=t}return t.prototype.play=function(){this.videoElement.play()},t.prototype.stop=function(){this.videoElement.pause(),this.videoElement.currentTime=0},t.prototype.pause=function(){this.videoElement.pause()},t.prototype.setMute=function(t){this.videoElement.muted=t},t}(),n=(t=function(e,n){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])},t(e,n)},function(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Class extends value "+String(n)+" is not a constructor or null");function o(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)}),o=function(t){function e(e,n){var o=t.call(this,e)||this;return o.source=n,o.hls=new Hls,o.hls.loadSource(o.source),o.hls.attachMedia(o.videoElement),o}return n(e,t),e.prototype.stop=function(){this.hls.destroy()},e}(e),i=function(){var t=function(e,n){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])},t(e,n)};return function(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Class extends value "+String(n)+" is not a constructor or null");function o(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)}}(),r=function(t){function e(e,n){var o=t.call(this,e)||this;return o.play=function(){o.dashPlayer.play()},o.stop=function(){o.dashPlayer.reset()},o.pause=function(){o.dashPlayer.pause()},o.source=n,o.dashPlayer=dashjs.MediaPlayer().create(),o.dashPlayer.initialize(o.videoElement,o.source,!1),o}return i(e,t),e}(e),a=function(){function t(t){this.videoElement=t,this.playbackStatusLogging=this.playbackStatusLogging.bind(this)}return t.prototype.enable=function(){this.videoElement.addEventListener("emptied",this.playbackStatusLogging),this.videoElement.addEventListener("loadstart",this.playbackStatusLogging),this.videoElement.addEventListener("canplay",this.playbackStatusLogging),this.videoElement.addEventListener("playing",this.playbackStatusLogging),this.videoElement.addEventListener("pause",this.playbackStatusLogging),this.videoElement.addEventListener("seeking",this.playbackStatusLogging),this.videoElement.addEventListener("ended",this.playbackStatusLogging),this.videoElement.addEventListener("progress",this.playbackStatusLogging)},t.prototype.disable=function(){this.videoElement.removeEventListener("emptied",this.playbackStatusLogging),this.videoElement.removeEventListener("loadstart",this.playbackStatusLogging),this.videoElement.removeEventListener("canplay",this.playbackStatusLogging),this.videoElement.removeEventListener("playing",this.playbackStatusLogging),this.videoElement.removeEventListener("pause",this.playbackStatusLogging),this.videoElement.removeEventListener("seeking",this.playbackStatusLogging),this.videoElement.removeEventListener("ended",this.playbackStatusLogging),this.videoElement.removeEventListener("progress",this.playbackStatusLogging)},t.prototype.bufferingDurationLogging=function(){var t=this.videoElement,e=t.duration,n=t.buffered;if(e>0)for(var o=0;o<n.length;o++){var i=Math.round(n.start(n.length-1-o)),r=Math.round(n.end(n.length-1-o)),a=r-i;console.group("Buffering duration [range ".concat(o+1,"]")),console.log("start: ".concat(i,"s"),"\nend: ".concat(r,"s"),"\nduration: ".concat(a,"s")),console.groupEnd()}},t.prototype.playbackStatusLogging=function(t){var e=t.type;console.log("%c video playback status: ".concat({emptied:"IDLE",loadstart:"LOADING",progress:"BUFFERING",canplay:"READY",playing:"PLAYING",pause:"PAUSED",seeking:"SEEKING",ended:"ENDED"}[e]," "),"font-weight: 600; color: black; background-color: white"),"progress"===e&&this.bufferingDurationLogging()},t}();const s=a;var l=function(){function t(t){this.videoElement=t,new s(this.videoElement).enable();var e=this.videoElement.getAttribute("src");if(e){var n=this.getVideoType(e);this.videoPlayerLibrary=this.getVideoPlayerLibrary(n),this.videoPlayerLibrary.play()}}return t.prototype.load=function(t){this.videoPlayerLibrary&&this.videoPlayerLibrary.stop();var e=this.getVideoType(t);this.videoElement.setAttribute("src",t),this.videoPlayerLibrary=this.getVideoPlayerLibrary(e),this.videoPlayerLibrary.play(),this.videoElement.muted&&this.videoPlayerLibrary.setMute(!1)},t.prototype.getVideoType=function(t){if(t.endsWith(".mp4"))return"mp4";if(t.endsWith(".m3u8"))return"hls";if(t.endsWith(".mpd"))return"dash";throw new Error("Unsupported video format for url: ".concat(t))},t.prototype.getVideoPlayerLibrary=function(t){var n=this.videoElement,i=n.getAttribute("src");switch(t){case"mp4":return new e(n);case"hls":if(Hls.isSupported())return new o(n,i);if(n.canPlayType("application/vnd.apple.mpegurl"))return new e(n);throw new Error("Hls video type is not supported");case"dash":return new r(n,i);default:throw new Error("Unsupported video type: ".concat(t))}},t}();const u=l;var c,p,d;c=document.querySelector("#video"),p=document.getElementById("select"),d=new u(c),p.addEventListener("change",(function(t){var e=t.target.value;d.load(e)}))})();