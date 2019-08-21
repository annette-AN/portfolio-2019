<template>
  <main class="sub view" id="main">
    <div id="main-wrap">
      <section class="list-horizon">
        <table>
          <colgroup>
            <!-- 모바일버전일때 width 100으로 스크립트 -->
            <col style="width:150px;">
            <col>
          </colgroup>
          <tbody>
            <tr>
              <td>제목</td>
              <td>
                <p>
                  {{ post.title }}
                </p>
              </td>
            </tr>
            <tr>
              <td>작성자</td>
              <td>
                <p>운영자</p>
              </td>
            </tr>
            <tr>
              <td>분류</td>
              <td>
                <p>
                  {{ post.type | postType }}
                </p>
              </td>
            </tr>
            <tr>
              <td>파일</td>
              <td>
                <!-- 5자리로 -->
                <p v-for="file in post.file" class="file-basket">
                  <a>{{ file.name }}</a> <span class="file-size">{{ changeBytes ( file.size ) }}</span></span>
                </p>
                <p v-for="file in post.img" class="file-basket">
                  <a>{{ file.name }}</a> <span class="file-size">{{ changeBytes ( file.size ) }}</span></span>
                </p>
              </td>
            </tr>
            <tr>
              <td>내용</td>
              <td>
                <p>
                  {{ post.desc }}
                </p>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="buttons">
          <button class="btn" @click="modify(post)">수정</button>
          <button class="btn" @click="remove(post)">삭제</button>
        </div>
      </section>

    </div>
  </main>
</template>

<script>
import { appendFile } from 'fs';
import { typeOptions } from  '@/constants/options';

export default {
  data : ()=> ({
    post: null
  }),
  filters: {
    postType (value){
      const option = typeOptions.find(({ value:optValue })=>{
        return optValue === value;
      });
      if(!option) {
        return "-";
      }
      return option.label;
    }
  },
  // methods:{},
  computed:{},
  created () {
    this.$el === undefined;
    const {
      $store: { state: { postList } },
      $route: { params: { id } }
    } = this;

    const post = postList.find(listItem=>{
      return listItem.id === Number(id);
    });

    if(!post){
      this.post = { title:"게시물을 찾을 수 없습니다.", file:[], image:[] };
      return;
    }

    this.post = { ...post };

    // console.log('file', post.file);
  },
  methods: {
    modify (target) {
      this.$router.push('/board-write/' + this.post.id)
    },
    remove (target) {
      const { 
        $store: { state },
        $router
       } = this;
      state.postList = state.postList.filter((post) => post.id !== target.id );
      $router.replace('/board-list');
    },
    changeBytes ( size ) {
      if (size < 1024) return size + " Bytes";
      else if(size < 1048576) return(size / 1024).toFixed(3) + " KB";
      else if(size < 1073741824) return(size / 1048576).toFixed(3) + " MB";
    }
  }
  // ,
  // mounted (){
  //   this.$el !== undefined;
  // }
}
</script>