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
        <Memo type="listitem" :value="item" v-for="item in memoList"></Memo>
      </template>
    </section>
  </div>
</template>

<script>
import Memo from '@/components/Memo';

export default {
  components: {
    Memo
  },
  data() {
    return {
      newMemo: this.creatMemo(),
      memoList: []
    }
  },
  methods: {
    creatMemo() {
      return { title: '', desc: '', $open: false }
    },
    add() {
      const { newMemo, memoList } = this;
      const item = { ...newMemo, $open: false };

      if ( !item.title ) {
        item.title = "제목없음";
      }

      if ( !item.desc ) {
        alert('내용을 작성해 주세요');
        return;
      }

      memoList.push(item);
      this.newMemo = this.creatMemo();
    }
  }
}
</script>
