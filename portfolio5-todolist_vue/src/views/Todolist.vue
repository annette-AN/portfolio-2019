<template>
  <div class="about">
    <h1>Todo list</h1>
    <table>
      <colgroup> 
        <col/>
        <col style="width:90px;"/>
      </colgroup>
      <tbody>
        <tr>
          <td>
            <input type="text" placeholder="내용" v-model="newTodo">
          </td>
          <td>
            <button @click="add">추가</button>
          </td>
        </tr>
      </tbody>
    </table>
    <table>
      <colgroup> 
        <col/>
        <col style="width:90px;"/>
      </colgroup>
      <tbody>
        <tr v-for="item in todoList">
          <template v-if="!item.$modify">
            <td>
              {{ item.text }}
            </td>
            <td>
              <button @click="modify(item)">수정</button>
              <button @click="remove(item)">삭제</button>
            </td>
          </template>
          <template v-else>
            <td>
              <input type="text" placeholder="내용" v-model="item.text">
            </td>
            <td>
              <button @click="submit(item)">저장</button>
            </td>
          </template>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      newTodo : '',
      todoList : []
    }
  },
  methods: {
    add() {
      const { newTodo, todoList} = this;
      const item = { text: newTodo, $modify: false };

      todoList.push(item);
      this.newTodo = '';
    },
    modify(target) {
      target.$modify = true;
    },
    submit(target) {
      target.$modify = false;
    },
    remove(target) {
      this.todoList = this.todoList.filter((item)=>item !==target)
    }
  }
}
</script>
<style lang="scss" scoped>
div {
  margin: 0 auto;
}
button {
  width: 40px;
}
table {
  table-layout: fixed;
  border-collapse: collapse;
  width: 300px;
  margin: 0 auto;

  td {
    text-align: left;
  }
  input {
    width: 95%;
  }
}
</style>
