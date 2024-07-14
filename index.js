const videoMap = new Map(); // video-data
const seekingMap = new Map(); // 保存一个开始滑动的状态
const startSeek = new Map(); // 开始滑动的时间偏移
const endSeek = new Map(); // 结束滑动的时间偏移
const allTimeVideo = new Map(); // 视频总时长
const currentTimeVideo = new Map(); // 当前播放时长

function startSeekingVideo(index, dom) {
  const seeking = seekingMap.get(index);
  console.log("seekingMap", seekingMap, index);
  if (!seeking) {
    seekingMap.set(index, true);
    console.log(
      `第${index}个video开始进行拖动,拖动的时间偏移量是`,
      dom.currentTime
    );
    startSeek.set(index, dom.currentTime);
  }
}

function endSeekVideo(index, dom) {
  const seeking = seekingMap.get(index);
  if (seeking) {
    seekingMap.set(index, false);
    console.log(
      `第${index}个video拖动结束,拖动的时间偏移量是`,
      dom.currentTime
    );
    endSeek.set(index, dom.currentTime);
    if (dom.paused) {
      // 视频暂停，用户拖动进度条
      console.log(`第${index}个video当前播放时间的偏移量`, dom.currentTime);
      currentTimeVideo.set(index, dom.currentTime);
    }
  }
}

function timeupdateVideo(index, dom) {
  console.log(`第${index}个video当前播放时间的偏移量`, dom.currentTime);
  currentTimeVideo.set(index, dom.currentTime);
}

function loadedVideo(index, dom) {
  console.log(`第${index}个video播放视频的长度`, dom.duration);
  allTimeVideo.set(index, dom.duration);
}

function playVideo(index, dom) {
  console.log(`第${index}个video开始播放`, dom.duration);
}

function pauseVideo(index, dom) {
  console.log(`第${index}个video暂停播放`, dom.duration);
}

function setListener(dom, index) {
  if (dom) {
    // 开始滑动事件
    $(dom).on("seeking", function () {
      startSeekingVideo(index, dom);
    });
    // 时间更新
    $(dom).on("timeupdate", function () {
      timeupdateVideo(index, dom);
    });
    // 滑动结束
    $(dom).on("seeked", function () {
      endSeekVideo(index, dom);
    });
    // 视频加载完成
    $(dom).on("loadedmetadata", function () {
      loadedVideo(index, dom);
    });
    // 视频开始播放
    $(dom).on("play", function () {
      playVideo(index, dom);
    });
    // 视频暂停播放
    $(dom).on("pause", function () {
      pauseVideo(index, dom);
    });
  }
}

function getAllVideo(url) {
  const videoList = $("video");
  console.log("我是获取的所有video的dom元素", videoList.length > 0);
  if (videoList.length > 0) {
    for (let i = 0; i < videoList.length; i++) {
      const dom = videoList[i];
      $(dom).data("id", i);
      videoMap.set(i, $(dom)[0]);
      $(dom)[0].src = url;
      setListener($(dom)[0], i);
      //   console.log("处理hls", Hls.isSupported());
      //   if (Hls.isSupported()) {
      //     const hls = new Hls();
      //     // const url = $(dom)[0].currentSrc;
      //     hls.loadSource(url);
      //     hls.attachMedia($(dom)[0]);
      //     // hls.on(Hls.Events.MANIFEST_PARSED, function () {
      //     //   dom.play();
      //     // });
      //   }
    }
  }
}

const playOrPause = () => {
  document.addEventListener("DOMContentLoaded", function () {
    // 获取所有video元素
    const videoList = $("video");

    // 创建IntersectionObserver实例
    var observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // 如果视频进入视口，尝试播放
            console.log("视频开始自动播放");
            entry.target.play().catch((error) => {
              console.error("自动播放失败：", error);
            });
          } else {
            // 如果视频离开视口，暂停播放
            console.log("视频暂停");
            entry.target.pause();
          }
        });
      },
      {
        // 可以调整这里的配置以控制何时触发回调
        threshold: 0.5, // 表示目标元素有50%在视口中时触发
      }
    );

    // 观察每一个video
    videoList.each((index, video) => {
      observer.observe($(video)[0]);
    });
  });
};

function openUrl(index, a) {
  console.log("event", a);
  event.preventDefault();
  const href = $(a).attr("href");
  console.log("我是对应的链接地址", href);
}

const intercept = () => {
  const aList = $("a");
  aList.each((index, a) => {
    console.log("a", a);
    $(a).on("click", function (event) {
      openUrl(index, a);
    });
  });
};
playOrPause();
intercept();
document
  .getElementById("fileInput")
  .addEventListener("change", function (event) {
    var file = event.target.files[0];
    var url = URL.createObjectURL(file);
    console.log("测试视频文件", url);
    getAllVideo(url);
  });
