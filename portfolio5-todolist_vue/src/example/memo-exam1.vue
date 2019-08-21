<template>
  <div>
    <section class="memo-write">
      <Memo type="new" :value="newMemo" @add="add"></Memo>
    </section>

    <section class="memo-show">
      <div class="no-memo" v-if="!memoList.length">
        <i class="far fa-lightbulb"></i>
        <p>추가한 메모가 여기에 표시됩니다.</p>
      </div>

      <template v-else>
        <!-- desc 수정을 하고싶음 -->
        <Memo v-for="item in memoList" class="memo-body" type="listitem" :value="item">{{ item.desc }}</Memo>
      </template>

      <div>
        <pre v-html="$data"></pre>
      </div>
    </section>
  </div>
</template>

<script>
import Memo from '@/components/Memo.vue';

export default {
  components: {
    Memo
  },
  data() {
    return {
      newMemo: this.createMemo(),
      memoList : []
    }
  },
  methods: {
    createMemo() {
      return { title: '', desc: '', $open: false }
    },
    add() {
      const { newMemo, memoList } = this;
      const item = { ...newMemo, $open: false };

      if ( !item.title ){
        item.title = '제목없음';
      }

      if ( !item.desc ) {
        alert('내용을 입력하세요');
        return;
      }

      memoList.push(item);
      this.newMemo = this.createMemo();
    }
  }
}
</script>