// Một số bài hát có thể bị lỗi do liên kết bị hỏng. Vui lòng thay thế liên kết khác để có thể phát
// Some songs may be faulty due to broken links. Please replace another link so that it can be played

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PlAYER_STORAGE_KEY = "F8_PLAYER";

const player = $(".player");
const cd = $(".cd");
const heading = $("header h2");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");
const playBtn = $(".btn-toggle-play");
const progress = $("#progress");
const prevBtn = $(".btn-prev");
const nextBtn = $(".btn-next");
const randomBtn = $(".btn-random");
const repeatBtn = $(".btn-repeat");
const playlist = $(".playlist");

const app = {
  currentIndex: 0,
  isPlaying: false,
  isRandom: false,
  isRepeat: false,
  config: {},
  // (1/2) Uncomment the line below to use localStorage
  // config: JSON.parse(localStorage.getItem(PlAYER_STORAGE_KEY)) || {},
  songs: [
    {
      name: "Yêu nhau nhé bạn thân",
      singer: "Phạm Đình Thái Ngân",
      path: "https://vnso-zn-10-tf-mp3-s1-zmp3.zmdcdn.me/fddcb518d95f3001694e/4335749329654911946?authen=exp=1660828113~acl=/fddcb518d95f3001694e/*~hmac=d5fb6300efd285471e511f8c294ab892&fs=MTY2MDY1NTMxMzM4M3x3ZWJWNnwwfDExMy4xNjYdUngMjMzLjmUsIC0",
      image: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/covers/8/9/8910faa3cbbc9e17adcda9cfecb8c8d7_1423710030.jpg"
    },
    {
      name: "3107 - 2",
      singer: "Dương, W/N, Nâu",
      path: "https://vnso-zn-10-tf-mp3-s1-zmp3.zmdcdn.me/65461cb58cf265ac3ce3/3853745547057310249?authen=exp=1660827387~acl=/65461cb58cf265ac3ce3/*~hmac=b5849ded3a2130ea6a7f3828d4fbb6c3&fs=MTY2MDY1NDU4NzA0MXx3ZWJWNnwxMDY0MTIzMTUwfDE0LjIyOC4xMC4yNDk",
      image:
        "https://data.chiasenhac.com/data/cover/136/135792.jpg"
    },
    {
      name: "Đom Đóm",
      singer: "Jack",
      path:
        "https://vnso-zn-24-tf-mp3-s1-zmp3.zmdcdn.me/d338bdb925fecca095ef/2028193356988192076?authen=exp=1660827788~acl=/d338bdb925fecca095ef/*~hmac=820c5ae64264eb57fc8ed315aaa78d6d&fs=MTY2MDY1NDk4ODAxMXx3ZWJWNnwxMDmUsIC3ODkxMDmUsICwfDEdUngNTQdUngMTk4LjA",
      image: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/f/e/9/8/fe9875941d98fbbcb8aedc8960ccbc94.jpg"
    },
    {
      name: "Cần một ai đó",
      singer: "Phạm Đình Thái Ngân",
      path: "https://vnso-zn-10-tf-mp3-s1-zmp3.zmdcdn.me/a53e06271a60f33eaa71/4307176343340663879?authen=exp=1660828208~acl=/a53e06271a60f33eaa71/*~hmac=4c3bc7472d06975d7008b1e31acd9cce&fs=MTY2MDY1NTQwODI2NHx3ZWJWNnwxMDI0NDUwMjE2fDE0LjE2MS4yNTQdUngNDQ",
      image:
        "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/covers/8/9/8910faa3cbbc9e17adcda9cfecb8c8d7_1423710030.jpg"
    },
    {
      name: "Nếu lúc trước em đừng tới",
      singer: "Phạm Đình Thái Ngân, Hino",
      path: "https://vnso-zn-15-tf-mp3-s1-zmp3.zmdcdn.me/aa787aa15ce0b5beecf1/4415452943507636595?authen=exp=1660827875~acl=/aa787aa15ce0b5beecf1/*~hmac=77644235153e48be0a0d5ea121b64988&fs=MTY2MDY1NTA3NTY0OHx3ZWJWNnwwfDExMy4xNzMdUngMTU3LjIxOA",
      image:
        "https://event.mediacdn.vn/2020/9/11/pham-dinh-thai-ngan-1-15998125671502078085814.png"
    },
    {
      name: "Làm vợ anh nhé",
      singer: "Chi Dân",
      path:
        "https://vnso-zn-15-tf-mp3-s1-zmp3.zmdcdn.me/255bc1f3bbb752e90ba6/1656276739608977374?authen=exp=1658938661~acl=/255bc1f3bbb752e90ba6/*~hmac=0528b5e8f501c0e76d9c5c933b630a89&fs=MTY1ODmUsIC2NTg2MTmUsICyMnx3ZWJWNnwwfDI3LjIdUngMjA4LjEzNA",
      image:
        "https://anh.24h.com.vn/upload/4-2016/images/2016-11-15/1479224590-147920751541043-chi-dan-16.jpg"
    },
    {
      name: "Nếu Ngày ấy",
      singer: "Soobin Hoàng Sơn",
      path: "https://vnso-zn-24-tf-mp3-s1-zmp3.zmdcdn.me/659ad76efc2915774c38/9154281717259436772?authen=exp=1658939344~acl=/659ad76efc2915774c38/*~hmac=5afdbe52608c20b8ac5a69799872309c&fs=MTY1ODmUsIC2NjU0NDQwOXx3ZWJWNnwwfDEyMy4yMS4zMy4yMTk",
      image:
        "https://newsmd2fr.keeng.net/tiin/archive/images/20210117/131120_batch_9.jpg"
    }
  ],
  setConfig: function (key, value) {
    this.config[key] = value;
    // (2/2) Uncomment the line below to use localStorage
    // localStorage.setItem(PlAYER_STORAGE_KEY, JSON.stringify(this.config));
  },
  render: function () {
    const htmls = this.songs.map((song, index) => {
      return `
                        <div class="song ${
                          index === this.currentIndex ? "active" : ""
                        }" data-index="${index}">
                            <div class="thumb"
                                style="background-image: url('${song.image}')">
                            </div>
                            <div class="body">
                                <h3 class="title">${song.name}</h3>
                                <p class="author">${song.singer}</p>
                            </div>
                            <div class="option">
                                <i class="fas fa-ellipsis-h"></i>
                            </div>
                        </div>
                    `;
    });
    playlist.innerHTML = htmls.join("");
  },
  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex];
      }
    });
  },
  handleEvents: function () {
    const _this = this;
    const cdWidth = cd.offsetWidth;

    // Xử lý CD quay / dừng
    // Handle CD spins / stops
    const cdThumbAnimate = cdThumb.animate([{ transform: "rotate(360deg)" }], {
      duration: 10000, // 10 seconds
      iterations: Infinity
    });
    cdThumbAnimate.pause();

    // Xử lý phóng to / thu nhỏ CD
    // Handles CD enlargement / reduction
    document.onscroll = function () {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const newCdWidth = cdWidth - scrollTop;

      cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
      cd.style.opacity = newCdWidth / cdWidth;
    };

    // Xử lý khi click play
    // Handle when click play
    playBtn.onclick = function () {
      if (_this.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
    };

    // Khi song được play
    // When the song is played
    audio.onplay = function () {
      _this.isPlaying = true;
      player.classList.add("playing");
      cdThumbAnimate.play();
    };

    // Khi song bị pause
    // When the song is pause
    audio.onpause = function () {
      _this.isPlaying = false;
      player.classList.remove("playing");
      cdThumbAnimate.pause();
    };

    // Khi tiến độ bài hát thay đổi
    // When the song progress changes
    audio.ontimeupdate = function () {
      if (audio.duration) {
        const progressPercent = Math.floor(
          (audio.currentTime / audio.duration) * 100
        );
        progress.value = progressPercent;
      }
    };

    // Xử lý khi tua song
    // Handling when seek
    progress.onchange = function (e) {
      const seekTime = (audio.duration / 100) * e.target.value;
      audio.currentTime = seekTime;
    };

    // Khi next song
    // When next song
    nextBtn.onclick = function () {
      if (_this.isRandom) {
        _this.playRandomSong();
      } else {
        _this.nextSong();
      }
      audio.play();
      _this.render();
      _this.scrollToActiveSong();
    };

    // Khi prev song
    // When prev song
    prevBtn.onclick = function () {
      if (_this.isRandom) {
        _this.playRandomSong();
      } else {
        _this.prevSong();
      }
      audio.play();
      _this.render();
      _this.scrollToActiveSong();
    };

    // Xử lý bật / tắt random song
    // Handling on / off random song
    randomBtn.onclick = function (e) {
      _this.isRandom = !_this.isRandom;
      _this.setConfig("isRandom", _this.isRandom);
      randomBtn.classList.toggle("active", _this.isRandom);
    };

    // Xử lý lặp lại một song
    // Single-parallel repeat processing
    repeatBtn.onclick = function (e) {
      _this.isRepeat = !_this.isRepeat;
      _this.setConfig("isRepeat", _this.isRepeat);
      repeatBtn.classList.toggle("active", _this.isRepeat);
    };

    // Xử lý next song khi audio ended
    // Handle next song when audio ended
    audio.onended = function () {
      if (_this.isRepeat) {
        audio.play();
      } else {
        nextBtn.click();
      }
    };

    // Lắng nghe hành vi click vào playlist
    // Listen to playlist clicks
    playlist.onclick = function (e) {
      const songNode = e.target.closest(".song:not(.active)");

      if (songNode || e.target.closest(".option")) {
        // Xử lý khi click vào song
        // Handle when clicking on the song
        if (songNode) {
          _this.currentIndex = Number(songNode.dataset.index);
          _this.loadCurrentSong();
          _this.render();
          audio.play();
        }

        // Xử lý khi click vào song option
        // Handle when clicking on the song option
        if (e.target.closest(".option")) {
        }
      }
    };
  },
  scrollToActiveSong: function () {
    setTimeout(() => {
      $(".song.active").scrollIntoView({
        behavior: "smooth",
        block: "nearest"
      });
    }, 300);
  },
  loadCurrentSong: function () {
    heading.textContent = this.currentSong.name;
    cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
    audio.src = this.currentSong.path;
  },
  loadConfig: function () {
    this.isRandom = this.config.isRandom;
    this.isRepeat = this.config.isRepeat;
  },
  nextSong: function () {
    this.currentIndex++;
    if (this.currentIndex >= this.songs.length) {
      this.currentIndex = 0;
    }
    this.loadCurrentSong();
  },
  prevSong: function () {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.songs.length - 1;
    }
    this.loadCurrentSong();
  },
  playRandomSong: function () {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * this.songs.length);
    } while (newIndex === this.currentIndex);

    this.currentIndex = newIndex;
    this.loadCurrentSong();
  },
  start: function () {
    // Gán cấu hình từ config vào ứng dụng
    // Assign configuration from config to application
    this.loadConfig();

    // Định nghĩa các thuộc tính cho object
    // Defines properties for the object
    this.defineProperties();

    // Lắng nghe / xử lý các sự kiện (DOM events)
    // Listening / handling events (DOM events)
    this.handleEvents();

    // Tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
    // Load the first song information into the UI when running the app
    this.loadCurrentSong();

    // Render playlist
    this.render();

    // Hiển thị trạng thái ban đầu của button repeat & random
    // Display the initial state of the repeat & random button
    randomBtn.classList.toggle("active", this.isRandom);
    repeatBtn.classList.toggle("active", this.isRepeat);
  }
};

app.start();
