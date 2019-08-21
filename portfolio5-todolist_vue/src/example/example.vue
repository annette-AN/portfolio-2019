<template>
  <div class="about">
    <h1>Todo list</h1>
    <div>
      <input type="text" placeholder="내용" v-model="newTodo">
      <button @click="add">추가</button>
    </div>
    <div>
      <!-- <ul>
        <li v-for="item in todoList">
          <div v-if="!item.$modify">{{ item.text }}
            <button @click="modify(item)">수정</button>
            <button @click="remove(item)">삭제</button>
          </div>
          <div v-else>
            <input type="text" placeholder="내용" v-model="item.text">
            <button @click="submit(item)">저장</button>
          </div>
        </li>
      </ul> -->

      <ul>
        <li v-for="item in todoList">
          <template v-if="!item.$modify">{{ item.text }}
            <button @click="modify(item)">수정</button>
            <button @click="remove(item)">삭제</button>
          </template>
          <template v-else>
            <input type="text" placeholder="내용" v-model="item.text">
            <button @click="submit(item)">저장</button>
          </template>
        </li>
      </ul>
    </div>

    <div>
      <pre v-html="{ newTodo, todoList }"></pre>
      <!-- <pre v-html="$data"></pre> -->
    </div>
  </div>
</template>

<script>
export default {
  data (){
    return {
      newTodo : '',
      todoList : []
    };
  },
  methods: {
    add (){
      const { newTodo, todoList } = this;
      const item = { text: newTodo, $modify : false };

      if(newTodo === ''){
        alert('내용입력요망');
        return;
      }

      todoList.push(item);
      this.newTodo = '';
    },
    modify (target){
      target.$modify = true;
    },
    submit (target){
      target.$modify = false;
    },
    remove (target){
      this.todoList = this.todoList.filter((item)=>item !== target)
    }
  }
};

</script>

