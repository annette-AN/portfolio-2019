<template>
  <div class="memo-body" :open="value.$open ? true : false">
    <!--v-tooltip 은 a에 마우스를 hover하면 나타남-->
    <div class="blind-sec">
      <input class="memo-title" type="text" placeholder="제목" v-model="value.title">
    </div>
    <input class="memo-description" type="text" placeholder="메모 작성..." v-model="value.desc" @click="value.$open = true; (type === 'listitem' && modifyStart());">
    <div class="memo-front-icons">
      <a class="input-icon" href="#" v-tooltip="'새 목록'">
        <i class="far fa-check-sßquare"></i>
      </a>
      <a class="input-icon" href="#" v-tooltip="'그림이 있는 새 메모'">
        <i class="fas fa-paint-brush"></i>
      </a>
      <a class="input-icon" href="#" v-tooltip="'이미지가 있는 새 메모'">
        <i class="far fa-image"></i>
      </a>
    </div>
    
    <div class="memo-mid-icons">
      <a href="#" class="input-icon" v-tooltip="'나에게 알림'">
        <i class="far fa-bell"></i>
      </a>
      <a href="#" class="input-icon" v-tooltip="'공동작업자'">
        <i class="fas fa-user-friends"></i>
      </a>
      <a href="#" class="input-icon" v-tooltip="'색상 변경'">
        <i class="fas fa-palette"></i>
      </a>
      <a href="#" class="input-icon" v-tooltip="'이미지 추가'">
        <i class="far fa-image"></i>
      </a>
      <a href="#" class="input-icon" v-tooltip="'보관처리'">
        <i class="fas fa-download"></i>
      </a>
      <a href="#" class="input-icon" v-tooltip="'더보기'">
        <i class="fas fa-ellipsis-v"></i>
      </a>

      <!--text를 작성하면 undo 활성화  -->
      <a href="#" class="input-icon-l text-undo">
      <i class="fas fa-undo-alt"></i>
      </a>
      <a href="#" class="input-icon-l">
      <i class="fas fa-redo-alt"></i>
      </a>
    </div>
    <div class="btn-set">
      <button v-if="type === 'new'" class="memo-save" @click="$emit('add')">저장</button>
      <button v-else class="memo-save" @click="modify()">수정</button>
      <button class="memo-close" @click="cancle()">닫기</button>
    </div>
  </div>
</template>

<style>
.memo-body {
  text-align: left;
}
</style>

<script>
import $ from 'jquery';

export default {
  directives: {
    tooltip( el, vnode ) {
      const tooltipText = vnode.value;

      $(el).on('mouseenter', function() {
        $(this).append('<div class="upload-tooltip">' + tooltipText + '</div>');
      });
      $(el).on('mouseleave', function() {
        $('.upload-tooltip').remove();
      });
    }
  },
  props: {
    type: String,
    value: Object
  },
  data:()=>({
    cacheValue: null
  }),
  methods: {
    //수정진입
    modifyStart() {
      this.cacheValue = { ...this.value }
    },
    //수정완료
    modify() {
      this.cacheValue = null;
      this.value.$open = false;
    },
    //닫기
    cancle() {
      Object.assign( this.value, this.cacheValue );
      this.value.$open = false;
    }
  }
}

</script>
