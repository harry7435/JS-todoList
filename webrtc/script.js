(() => {
  'use strict';

  const get = (element) => document.querySelector(element);
  const allowUser = {
    audio: true,
    video: true,
  };

  class WebRtc {
    constructor() {
      this.media = new MediaSource();
      this.recorder;
      this.blobs;
      this.playedVideo = get('video.played');
      this.recordVideo = get('video.record');
      this.btnDownload = get('.btn_download');
      this.btnRecord = get('.btn_record');
      this.btnPlay = get('.btn_play');
      this.container = get('.webrtc');
      this.events();
      navigator.mediaDevices.getUserMedia(allowUser).then((videoAudio) => {
        this.success(videoAudio);
      });
    }

    // 클릭 이벤트 바인딩
    events() {
      this.btnRecord.addEventListener('click', this.toggleRecord.bind(this));
      this.btnPlay.addEventListener('click', this.play.bind(this));
      this.btnDownload.addEventListener('click', this.download.bind(this));
    }

    success(audioVideo) {
      this.btnRecord.removeAttribute('disabled');
      window.stream = audioVideo;
      if (window.URL) {
        this.playedVideo.setAttribute(
          'src',
          window.URL.createObjectURL(audioVideo)
        );
      } else {
        this.playedVideo.setAttribute('src', audioVideo);
      }
    }

    // 녹화 버튼 토글 메서드
    toggleRecord() {
      if ('녹화' === this.btnRecord.textContent) {
        this.startRecord();
      } else {
        this.btnPlay.removeAttribute('disabled');
        this.btnDownload.removeAttribute('disabled');
        this.btnRecord.textContent = '녹화';
        this.stopRecord();
      }
    }

    // 녹화 영상 저장 메서드
    pushBlobData(event) {
      if (!event.data || event.data.size < 1) {
        return;
      }
      this.blobs.push(event.data);
    }

    // 녹화 시작 메서드
    startRecord() {
      let type = { mimeType: 'video/webm;codecs=vp9' };
      this.blobs = [];
      if (!MediaRecorder.isTypeSupported(type.mimeType)) {
        type = { mimeType: 'video/webm' };
      }
      this.recorder = new MediaRecorder(window.stream, type);
      this.btnRecord.textContent = '중지';
      this.btnPlay.setAttribute('disabled', true);
      this.btnDownload.setAttribute('disabled', true);
      this.recorder.ondataavailable = this.pushBlobData.bind(this);
      this.recorder.start(20);
    }

    // 녹화 중지 메서드
    stopRecord() {
      this.recorder.stop();
      this.recordVideo.setAttribute('controls', true);
    }

    // 녹화 영상 재생 메서드
    play() {
      this.recordVideo.src = window.URL.createObjectURL(
        new Blob(this.blobs, { type: 'video/webm' })
      );
    }

    // 녹화 영상 다운로드 메서드
    download() {
      const videoFile = new Blob(this.blobs, { type: 'video/webm' });
      const url = window.URL.createObjectURL(videoFile);
      const downloader = document.createElement('a');

      downloader.style.display = 'none';
      downloader.setAttribute('href', url);
      downloader.setAttribute('download', 'test_video.webm');
      this.container.appendChild(downloader);
      downloader.click();
      // 다운로드 영상 임시 파일 삭제
      setTimeout(() => {
        this.container.removeChild(downloader);
        window.URL.revokeObjectURL(url);
      }, 100);
    }
  }

  new WebRtc();
})();
