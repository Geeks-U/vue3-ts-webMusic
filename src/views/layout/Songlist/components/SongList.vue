<script setup lang="ts">
import { ref } from 'vue'

interface SongItem {
  songId: number
  songName: string
  alId: number
  alName: string
  arId: number
  arName: string
}

defineProps({
  songList: {
    type: Array as () => SongItem[],
    default: undefined
  }
})
</script>

<template>
  <div class="song-table-container">
    <table class="song-table">
      <thead>
        <tr>
          <th>歌名</th>
          <th></th>
          <th>歌手</th>
          <th>专辑</th>
        </tr>
      </thead>
      <tbody v-if="songList">
        <tr v-for="item in songList" :key="item.songId" class="song-row">
          <td class="song-name-cell">
            <span class="icon-button icon-lg" @click="console.log(`点击收藏歌曲: ${item.songId}`)">
              <el-icon><MdiHeartOutline /></el-icon>
            </span>
            <span class="song-name-text">{{ item.songName }}</span>
          </td>
          <td class="action-icons-cell">
            <div class="action-icons">
              <el-icon class="icon-button icon-lg" @click="console.log(`播放歌曲: ${item.songId}`)">
                <MdiPlay />
              </el-icon>
              <el-icon class="icon-button icon-lg" @click="console.log(`添加到播放列表: ${item.songId}`)">
                <MdiPlusThick />
              </el-icon>
              <el-icon class="icon-button icon-lg" @click="console.log(`下载歌曲: ${item.songId}`)">
                <MdiArrowDownBold />
              </el-icon>
              <el-icon class="icon-button icon-lg" @click="console.log(`更多操作: ${item.songId}`)">
                <MdiDotsVertical />
              </el-icon>
            </div>
          </td>
          <td class="artist-cell">
            <span class="artist-name" @click="console.log(`打开歌手页面: ${item.arId}`)">
              {{ item.arName }}
            </span>
          </td>
          <td class="album-cell">
            <el-icon class="icon-button icon-lg" @click="console.log(`打开专辑: ${item.alId}`)">
              <MdiYoutube />
            </el-icon>
            <span class="album-name">{{ item.alName }}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.song-table-container {
  width: 100%;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.song-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

.song-table th {
  text-align: left;
  background-color: #f5f7fa;
  color: #606266;
  padding: 12px;
  font-weight: 500;
}

.song-table td {
  width: 25%;
  padding: 12px;
  border-top: 1px solid #ebeef5;
  color: #606266;
}

.song-table tr:hover {
  background-color: #f9f9f9;
}

.song-name-text,
.artist-name,
.album-name {
  cursor: pointer;
  transition: color 0.2s;
}

.song-name-text:hover,
.artist-name:hover,
.album-name:hover {
  color: #409eff;
}

.icon-button {
  cursor: pointer;
  transition: color 0.2s, transform 0.2s;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.icon-button:hover {
  color: #409eff;
  transform: scale(1.2);
}

.icon-lg {
  font-size: 13px;
}

/* 操作图标默认隐藏 */
.action-icons {
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s;
  display: flex;
  gap: 12px;
}

/* 行悬停时显示操作图标 */
.song-table tr:hover .action-icons {
  opacity: 1;
  pointer-events: auto;
}
</style>
