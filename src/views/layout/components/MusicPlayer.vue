<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'

// 组件
import FullScreenPlayer from './FullScreenPlayer.vue'

// 参数 底部播放器样式
// 歌曲列表
type SongItemType = {
  musicId: number
  musicUrl: string
  musicName: string
  musicAuthorName: string
  musicCoverImg: string
  collected: boolean
}
const props = defineProps({
  bottomplayerClass: {
    type: String,
    default: ''
  },
  songList: {
    type: Array as () => SongItemType[],
    default: []
  },
  // 发生变化表示父组件调用播放函数
  play: {
    type: Boolean
  }
})

// 播放器状态
enum MusicPlayMthodEnum {
  loop = 0,
  loop_one = 1,
  random = 2
}
type PlayMethodType = 'loop' | 'loop_one' | 'random'
const myAudio = ref<HTMLAudioElement | null>(null)
type PlayAudioStateType = {
  urlIndex: number,
  isPlay: boolean,
  duration: number | undefined,
  currentTime: number | undefined,
  playMethod: PlayMethodType
}
const playAudioState = ref<PlayAudioStateType>({
  urlIndex: 0,
  isPlay: false,
  duration: 0,
  currentTime: 0,
  playMethod: 'loop'

})
// audio元素事件监听添加
onMounted(() => {
  // 初始化
  if (myAudio.value) myAudio.value.src = props.songList[playAudioState.value.urlIndex].musicUrl
  const audio = myAudio.value
  if (!audio) return

  audio.addEventListener('ended', () => {
    skipNextMusic()
  })

  audio.addEventListener('timeupdate', () => {
    playAudioState.value.currentTime = audio.currentTime
  })

  audio.addEventListener('error', (_) => {
    const error = audio.error
    if (error) {
      console.error('Audio error:', {
        code: error.code,
        message: getAudioErrorMessage(error.code)
      })
    } else {
      console.error('Audio error: Unknown error')
    }
  })

  // 监听父组件是否要求播放(点击歌单全部播放从头播放)
  watch(() => props.play, () => {
    if (myAudio.value) myAudio.value.src = props.songList[0].musicUrl
    playAudioState.value.urlIndex = 0
    playMusic()
  })
})
function getAudioErrorMessage(code: number): string {
  switch (code) {
  case 1: return 'MEDIA_ERR_ABORTED: 用户终止了音频播放'
  case 2: return 'MEDIA_ERR_NETWORK: 网络错误导致音频下载失败'
  case 3: return 'MEDIA_ERR_DECODE: 音频解码错误'
  case 4: return 'MEDIA_ERR_SRC_NOT_SUPPORTED: 不支持的音频格式或找不到资源'
  default: return '未知错误'
  }
}


// 播放状态监听(播放暂停按钮监听)
watch(() => playAudioState.value.isPlay, (newValue: boolean | undefined) => {
  if (newValue === true) {
    playMusic()
  } else {
    myAudio.value?.pause()
  }
})
// 音乐状态切换函数
const togglePlay = () => {
  if (myAudio.value?.src === '') myAudio.value.src = props.songList[playAudioState.value.urlIndex].musicUrl
  playAudioState.value.isPlay = !playAudioState.value.isPlay
}
const skipPreviousMusic = () => {
  const len = props.songList.length
  if (len === 0){
    console.log('播放列表为空')
    return
  }

  switch (playAudioState.value.playMethod) {
  case 'loop':
    // 确保索引在有效范围内，避免负值
    playAudioState.value.urlIndex = (playAudioState.value.urlIndex - 1 + len) % len
    break
  case 'loop_one':
    // 保持当前歌曲不变
    break
  case 'random':
    playAudioState.value.urlIndex = Math.floor(Math.random() * len)
    break
  }
  // 此处赋值会从头开始播放
  if (myAudio.value) myAudio.value.src = props.songList[playAudioState.value.urlIndex].musicUrl
  playMusic()
}
const skipNextMusic = () => {
  const len = props.songList.length
  if (len === 0){
    console.log('播放列表为空')
    return
  }

  switch (playAudioState.value.playMethod) {
  case 'loop':
    playAudioState.value.urlIndex = (playAudioState.value.urlIndex + 1) % len
    break
  case 'loop_one':
    // 保持当前歌曲不变
    break
  case 'random':
    playAudioState.value.urlIndex = Math.floor(Math.random() * len)
    break
  }
  // 此处赋值会从头开始播放
  if (myAudio.value) myAudio.value.src = props.songList[playAudioState.value.urlIndex].musicUrl
  playMusic()
}
// 传入音乐index切换音乐 歌曲列表所用
const switchMusic = (musicIndex:number) => {
  if (playAudioState.value.urlIndex === musicIndex){
    playAudioState.value.urlIndex = musicIndex
    playMusic()
    return
  }
  if (myAudio.value) myAudio.value.src = props.songList[playAudioState.value.urlIndex].musicUrl
  playAudioState.value.urlIndex = musicIndex
  playMusic()
}
// 音乐播放入口
const playMusic = () => {
  if (myAudio.value) {
    myAudio.value.play().then(() => {
      playAudioState.value.isPlay = true
      playAudioState.value.duration = myAudio.value?.duration
    }).catch((err) => {
      console.error('播放失败', err)
      playAudioState.value.isPlay = false
    })
  }
}

// 使用 defineExpose 暴露方法给父组件
defineExpose({
  playMusic
})

// 收藏状态切换
const toggleCollectState = () => {
  props.songList[playAudioState.value.urlIndex].collected = !props.songList[playAudioState.value.urlIndex].collected
}

// 播放方式切换
const switchPlayMethod = () => {
  const currentPlayMethod = MusicPlayMthodEnum[playAudioState.value.playMethod]
  const nextPlayMethod = MusicPlayMthodEnum[(currentPlayMethod + 1) % (Object.keys(MusicPlayMthodEnum).length / 2)]
  playAudioState.value.playMethod = nextPlayMethod as PlayMethodType
}

// 时间转换
function convertToTimeFormat(seconds: unknown): string {
  if (typeof seconds!== 'number' || isNaN(seconds)) {
    return '00:00'
  }
  const intSeconds = Math.floor(seconds)
  const minutes = Math.floor(intSeconds / 60)
  const remainingSeconds = intSeconds % 60
  const formattedMinutes = String(minutes).padStart(2, '0')
  const formattedSeconds = String(remainingSeconds).padStart(2, '0')
  return `${formattedMinutes}:${formattedSeconds}`
}

// 播放进度
const playProgress = computed(() => {
  if (playAudioState.value.currentTime)
    return playAudioState.value.currentTime
  else return 0
})
// slider滑动监听
// 标记是否拖动时播放器原来是播放状态
const wasPlaying = ref(false)
// slider 拖动过程中（手指/鼠标还在滑动时）
const handleSliderInput = (value: number | number[]) => {
  if (playAudioState.value.isPlay) {
    wasPlaying.value = true
    playAudioState.value.isPlay = false
  }
  if (myAudio.value) {
    myAudio.value.currentTime = value as number
  }
}

// slider 拖动结束（手指/鼠标松开）
const handleSliderChange = (value: number | number[]) => {
  if (myAudio.value) {
    myAudio.value.currentTime = value as number
  }
  if (wasPlaying.value) {
    playAudioState.value.isPlay = true
    wasPlaying.value = false
  }
}
    

// 控制抽屉显示
const fullscreenPlayer = ref(false)
const rightSongPlaylist = ref(false)
</script>

<template>
  <div class="player-container">
    <!-- 隐藏音频 -->
    <div>
      <audio ref="myAudio" v-show="false"></audio>
    </div>
    <!-- 底部播放器模块 -->
    <div v-if="!fullscreenPlayer" :class="bottomplayerClass || 'bottom-player'">
      <!-- 封面图 -->
      <div class="player-cover" @click="fullscreenPlayer = true">
        <img class="cover-img" :src="songList[playAudioState.urlIndex].musicCoverImg">
      </div>

      <!-- 控制区域 -->
      <div class="player-controls">
        <span class="control-btn" @click="skipPreviousMusic">
          <el-icon><MdiSkipPrevious /></el-icon>
        </span>
        <span class="control-btn" @click="togglePlay">
          <el-icon v-if="!playAudioState.isPlay"><MdiPlay /></el-icon>
          <el-icon v-else><MdiPause /></el-icon>
        </span>
        <span class="control-btn" @click="skipNextMusic">
          <el-icon><MdiSkipNext /></el-icon>
        </span>
      </div>

      <!-- 信息 + 进度 -->
      <div class="player-info">
        <div class="song-meta">
          <span class="song-title">{{ songList[playAudioState.urlIndex].musicName }} - {{ songList[playAudioState.urlIndex].musicAuthorName }}</span>
          <span class="song-time">
            {{ convertToTimeFormat(playAudioState.currentTime) }}
            /
            {{ convertToTimeFormat(playAudioState.duration) }}
          </span>
        </div>
        <div class="progress-bar-container">
          <el-slider
            class="progress-bar-fill"
            :model-value="playProgress"
            :min="0"
            :max="playAudioState.duration"
            :format-tooltip="convertToTimeFormat"
            @input="handleSliderInput"
            @change="handleSliderChange"
          />
        </div>
      </div>

      <!-- 操作按钮 -->
      <div class="player-actions">
        <span class="action-btn" @click="toggleCollectState">
          <el-icon v-if="!songList[playAudioState.urlIndex].collected"><MdiStar /></el-icon>
          <el-icon v-else><MdiStarOutline /></el-icon>
        </span>
        <span class="action-btn">
          <el-icon><MdiDownload /></el-icon>
        </span>
        <span class="action-btn" @click="switchPlayMethod">
          <el-icon v-if="playAudioState.playMethod===MusicPlayMthodEnum[0]"><MdiRepeat /></el-icon>
          <el-icon v-else-if="playAudioState.playMethod===MusicPlayMthodEnum[1]"><MdiRepeatOnce /></el-icon>
          <el-icon v-else><MdiShuffleVariant /></el-icon>
        </span>
      </div>

      <!-- 播放列表按钮 -->
      <div class="playlist-toggle">
        <div class="icon-container" @click="rightSongPlaylist = true">
          <el-icon><EpExpand /></el-icon>
        </div>
        <span class="song-count">{{ songList.length }}</span>
      </div>
    </div>

    <!-- 底部抽屉 -->
    <div v-if="fullscreenPlayer">
      <div>
        <FullScreenPlayer @close="fullscreenPlayer=false"><p>抽屉播放器内容</p></FullScreenPlayer>
      </div>
    </div>

    <!-- 右侧抽屉 -->
    <div v-if="rightSongPlaylist" class="drawer-overlay" @click.self="rightSongPlaylist = false">
      <div class="drawer-right">
        <button class="close-btn" @click="rightSongPlaylist = false">关闭</button>
        <p>🎵 歌曲列表：</p>
        <ul>
          <li v-for="(song, index) in songList"
            :key="song.musicId"
            @click="switchMusic(index)"
            :class="{ active: index === playAudioState.urlIndex }"
          >
            {{ index + 1 }}. {{ song.musicName }} - {{ song.musicAuthorName }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>


<style scoped>

/* .player-container {
} */

.bottom-player {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 7px 0;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(8px);
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  z-index: 10;
}

/* 封面 */
.player-cover {
  width: 7%;
  max-width: 70px;
  min-width: 60px;
  cursor: pointer;
}
.cover-img {
  width: 100%;
  height: auto;
  border-radius: 7%;
  object-fit: cover;
  transition: transform 0.3s ease;
}
.cover-img:hover {
  transform: scale(1.05);
}

/* 控制按钮 */
.player-controls {
  display: flex;
  gap: 8px;
}
.control-btn {
  font-size: 20px;
  color: #333;
  cursor: pointer;
  transition: transform 0.2s ease;
}
.control-btn:hover {
  transform: scale(1.15);
  color: #409eff;
}

/* 歌曲信息 */
.player-info {
  display: flex;
  width: 70%;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
}
.song-meta {
  display: flex;
  width: 100%;
  justify-content: space-between;
  gap: 12px;
  font-size: 14px;
  color: #555;
}
.song-title {
  font-size: 13px;
  font-weight: 700;
  color: #888;
}
.song-time {
  font-size: 12px;
  color: #888;
}
.progress-bar-container {
  width: 100%;
  height: 4px;
}
.progress-bar-fill {
  width: 100%;
  height: 100%;
}

/* 操作按钮 */
.player-actions {
  display: flex;
  gap: 10px;
}
.action-btn {
  font-size: 18px;
  cursor: pointer;
  color: #666;
  transition: color 0.2s, transform 0.2s;
}
.action-btn:hover {
  color: #409eff;
  transform: scale(1.1);
}

/* 播放列表 */
.playlist-toggle {
  display: flex;
}

.icon-container {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  transition: color 0.3s;
}

.icon-container:hover {
  color: #409EFF; /* Element Plus 主色调 */
}

.song-count {
  font-size: 14px;
  font-weight: 500;
  color: #333;
}


/* 抽屉通用遮罩层 */
.drawer-overlay {
  position: fixed;
  inset: 0;
}

/* 右侧抽屉 */
/* 动画 */
@keyframes slideLeft {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

.drawer-right {
  position: fixed;
  right: 0;
  top: 0;
  height: 100vh;
  width: 300px;
  background-color: white;
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.1);
  padding: 16px;
  overflow-y: auto; /* 支持滚动 */
  z-index: 999;
}

/* 抽屉内容 */
.drawer-right p {
  font-weight: bold;
  font-size: 21px;
  margin-bottom: 12px;
}

.drawer-right ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.drawer-right li {
  padding: 10px;
  border-radius: 6px;
  transition: background-color 0.2s ease;
  cursor: pointer;
}
.drawer-right li:hover {
  background-color: #f0f0f0;
}

.drawer-right li.active {
  background-color: #e6f7ff;
  font-weight: bold;
  color: #409eff;
}

/* 关闭按钮 */
.close-btn {
  position: absolute;
  top: 10px;
  left: 10px;
  background: none;
  border: none;
  font-size: 14px;
  color: #666;
  cursor: pointer;
  transition: color 0.2s ease;
}
.close-btn:hover {
  color: #409eff;
}
</style>
