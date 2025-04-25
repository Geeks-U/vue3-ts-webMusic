<script setup lang="ts">

interface SonglistCommentListItem {
  more: boolean
  moreHot: boolean
  comments: Array<{
    commentId:number,
    content:string,
    userId: number,
    nickname: string,
    userAvatarUrl: string,
    time: number,
    ipLocation: string,
    liked: boolean,
    likedCount: number
  }>
  hotComents: Array<{
    commentId:number,
    content:string,
    userId: number,
    nickname: string,
    userAvatarUrl: string,
    time: number,
    ipLocation: string,
    liked: boolean,
    likedCount: number
  }>
}

defineProps({
  songlistCommentList: {
    type: Object as () => SonglistCommentListItem,
    default: undefined
  }
})

</script>

<template>
  <div class="comment-wrapper">
    <!-- 热门评论 -->
    <div class="section-header">
      <span class="section-title">热门评论</span>
      <span class="comment-count">{{ songlistCommentList.hotComents.length }}</span>
    </div>

    <div v-if="songlistCommentList">
      <div
        v-for="item in songlistCommentList.hotComents"
        :key="item.commentId"
        class="comment-item"
      >
        <!-- 用户信息 -->
        <div class="user-info">
          <!-- 头像 -->
          <div
            class="avatar"
            @click="console.log(`点击了头像, 用户id: ${item.userId}`)"
          >
            <img :src="item.userAvatarUrl" alt="avatar" />
          </div>

          <!-- 名称/IP/时间 -->
          <div class="meta">
            <div class="name">{{ item.nickname }}</div>
            <div class="meta-info">
              <span class="time">{{ new Date(item.time).toLocaleString() }}</span>
              <span class="ip">{{ item.ipLocation || '未知' }}</span>
            </div>
          </div>

          <!-- 点赞 -->
          <div
            class="like"
            @click="console.log(`点击了赞, 评论id: ${item.commentId}`)"
          >
            <span class="count">{{ item.likedCount }}</span>
            <span class="like-icon" :class="{ liked: item.liked }">
              <el-icon v-if="item.liked"><MdiThumbUp /></el-icon>
              <el-icon v-else><mdiThumbUpOutline /></el-icon>
            </span>
          </div>
        </div>

        <!-- 评论内容 -->
        <div class="comment-content">
          {{ item.content }}
        </div>
      </div>

      <!-- 加载更多 -->
      <div class="load-more">
        <span v-if="songlistCommentList.moreHot">加载更多...</span>
        <span v-else>加载完毕</span>
      </div>
    </div>
  </div>
</template>


<style scoped>
.comment-wrapper {
  padding: 16px;
  background-color: #fff;
  border-radius: 8px;
}

/* 标题区域 */
.section-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
}

.comment-count {
  font-size: 14px;
  color: #999;
}

.comment-item {
  padding: 16px 0;
  border-bottom: 1px solid #eee;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.avatar img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
}

.meta {
  flex: 1;
}

.name {
  font-weight: 600;
}

.meta-info {
  font-size: 12px;
  color: #999;
  display: flex;
  gap: 8px;
  margin-top: 4px;
}

.like {
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  color: #666;
}

.like:hover {
  color: #d33;
}

.like-icon.liked {
  color: #d33;
}

.comment-content {
  margin-top: 8px;
  font-size: 14px;
  line-height: 1.6;
  color: #333;
  padding-left: 52px; /* 与头像对齐 */
}

.load-more {
  text-align: center;
  margin-top: 16px;
  font-size: 14px;
  color: #888;
}

</style>
