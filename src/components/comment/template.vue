<template>
  <div class="jscms-comment" id="jscmsComment" ref="jscmsComment">
    <div class="comment-input-area" ref="commentInpuArea">
      <div class="comment-top">
        <div class="comment-title">参与评论</div>
        <div class="comment-total">
          共
          <span class="total-number">{{total}}</span>条
        </div>
      </div>
      <div class="comment-middle">
        <div class="comment-input-warp">
          <textarea
            v-model="form.mdContent"
            name="content"
            id="commentContent"
            cols="30"
            rows="10"
            :placeholder="commentConfig.placeholder"
          ></textarea>
        </div>
        <div class="comment-control-warp">
          <div class="control-login" v-show="commentConfig.boolCommentLogin===true">
            <a href="javascript:void(0);" @click="showLogin()">登陆</a>后参与评论
          </div>
          <div class="control-user" v-show="commentConfig.boolCommentLogin===false">
            <span
              class="user-avatar"
              :style="{'background-image': 'url('+ commentConfig.currentUser.avatar +')'}"
            ></span>
            <span class="user-nickname">{{commentConfig.currentUser.nickname}}</span>
          </div>
          <div class="control-user-reply" v-show="reply.user.id">
            回复：{{reply.user.nickname}}
            <i class="reply-close" @click="replyClear"></i>
          </div>
          <div class="control-submit">
            <span class="input-total">{{form.mdContent.length}}/1000</span>
            <span class="btn-submit" @click="submit">提交评论</span>
          </div>
        </div>
      </div>
      <div class="comment-tips">{{commentConfig.tips}}</div>
    </div>
    <div class="comment-content-area">
      <div class="comment-top">
        <div class="comment-title">评论区域</div>
      </div>
      <div class="comment-list" ref="commentList">
        <ul class="comment-list-ul" v-if="commentsList.length">
          <li class="comment-list-li" v-for="(item, index) in commentsList" :key="index">
            <div
              class="comment-list-item"
              :id="'commentItem_' + index"
              :ref="'commentItem_' + index"
            >
              <div class="item-top">
                <div class="item-avatar">
                  <span :style="{'background-image': 'url('+ item.userAuthor.avatar +')'}"></span>
                </div>
                <div class="item-info">
                  <span class="nickname">{{item.userAuthor.nickname}}</span>
                  <span class="time">· {{item.ftime}}</span>
                  <span class="id">· {{item.numberId}}楼</span>
                </div>
                <div class="item-right">
                  <span
                    class="like-icon"
                    :class="{'normal': !item.liked, 'liked': item.liked}"
                    @click="like(item)"
                  ></span>
                  <span class="like-number">{{item.likeUserIds.length}}</span>
                  <a
                    class="btn-reply"
                    href="javascript:void(0);"
                    @click="replyHandle(item, 2, index, 'commentItem_' + index)"
                  >回复</a>
                </div>
              </div>
              <div class="comment-content" v-if="!item.shield">
                <span
                  class="comment-reply-user-nickname"
                  v-if="item.userReplied && item.userReplied.nickname"
                >回复 · {{item.userReplied.commentNumberId}}楼 · {{item.userReplied.nickname}}</span>
                <span v-html="item.htContent"></span>
              </div>
              <div class="comment-content shield" v-if="item.shield">该评论内容已被屏蔽</div>
              <div class="comment-children" v-if="item.children.list.length">
                <ul class="comment-list-ul">
                  <li
                    class="comment-list-li"
                    v-for="(subItem, idx) in item.children.list"
                    :key="idx"
                  >
                    <div
                      class="comment-list-item"
                      :id="'commentChildItem_' + index + '_' + idx"
                      :ref="'commentChildItem_' + index + '_' + idx"
                    >
                      <div class="item-top">
                        <div class="item-avatar">
                          <span
                            :style="{'background-image': 'url('+ subItem.userAuthor.avatar +')'}"
                          ></span>
                        </div>
                        <div class="item-info">
                          <span class="nickname">{{subItem.userAuthor.nickname}}</span>
                          <span class="time">· {{subItem.ftime}}</span>
                          <span class="id">· {{subItem.numberId}}楼</span>
                        </div>
                        <div class="item-right">
                          <span
                            class="like-icon"
                            :class="{'normal': !subItem.liked, 'liked': subItem.liked}"
                            @click="like(subItem)"
                          ></span>
                          <span class="like-number">{{subItem.likeUserIds.length}}</span>
                          <a
                            class="btn-reply"
                            href="javascript:void(0);"
                            @click="replyHandle(subItem, 3, index, 'commentChildItem_' + index + '_' + idx)"
                          >回复</a>
                        </div>
                      </div>
                      <div class="comment-content" v-if="!subItem.shield">
                        <span
                          class="comment-reply-user-nickname"
                          v-if="subItem.userReplied && subItem.userReplied.nickname"
                        >回复 · {{subItem.userReplied.commentNumberId}}楼 · {{subItem.userReplied.nickname}}</span>
                        <span v-html="subItem.htContent"></span>
                      </div>
                      <div class="comment-content shield" v-if="subItem.shield">该评论内容已被屏蔽</div>
                    </div>
                  </li>
                </ul>
                <div
                  class="btn-more-child"
                  v-show="item.children.total > 3 && item.children.list.length === 3"
                >
                  <a href="javascript:void(0);" @click="loadMoreChild(item)">
                    <span v-show="item.children.total===999">加载中...</span>
                    <span v-show="item.children.total<999">查看全部{{item.children.total}}条</span>
                  </a>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <div class="no-comment" v-if="loading===false && commentsList.length === 0">期待你的评论。</div>
      </div>
      <div class="loading-warp" v-show="loading">
        <Loading text="评论加载中..." :loading="loading"></Loading>
      </div>
      <div class="comment-more" v-show="hasMore">
        <span class="btn-more" @click="loadMore">加载更多</span>
      </div>
    </div>
  </div>
</template>

<script>
import controller from "./controller.js";
export default controller;
</script>

<style lang="less" scoped>
@import url("./style.less");
</style>

<style lang="less">
.jscms-comment {
  .comment-content {
    p {
      word-wrap: break-word;
      word-break: normal;
      margin: 0px;
      padding: 0px;
    }
  }
}
</style>
