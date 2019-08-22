<template>
  <main class="sub write" id="main">
    <div id="main-wrap">
      <section class="list-horizon">
        <h2>게시글 등록</h2>
        <table>
          <colgroup>
            <col style="width:150px">
            <col>
          </colgroup>
          <tbody>
            <tr>
              <td><label for="title">제목</label></td>
              <td>
                <input type="text" id="title" v-model="newPost.title">
              </td>
            </tr>
            <tr>
              <td>분류</td>
              <td>
                <label for="use-information">
                  <input type="radio" v-model="newPost.type" value="use-information" name="kind-of" id="use-information">
                  이용안내
                </label>
                <label for="about-member">
                  <input type="radio" v-model="newPost.type" value="about-member" name="kind-of" id="about-member">
                  회원관련
                </label>
                <label for="order-etc">
                  <input type="radio" v-model="newPost.type" value="order-etc" name="kind-of" id="order-etc">
                  주문/결제/배송
                </label>
                <label for="refund-etc">
                  <input type="radio" v-model="newPost.type" value="refund-etc" name="kind-of" id="refund-etc">
                  교환/환불/반품
                </label>
                <label for="saving-money">
                  <input type="radio" v-model="newPost.type" value="saving-money" name="kind-of" id="saving-money">
                  적립금관련
                </label>
                <label for="other">
                  <input type="radio" v-model="newPost.type" value="other" name="kind-of" id="other">
                  기타
                </label>
              </td>
            </tr>
            <tr>
              <td><label for="editor">내용</label></td>
              <td>
                <textarea v-model="newPost.desc" name="editor" id="editor" cols="30" rows="10"></textarea>
              </td>
            </tr>
            <tr>
              <td>파일 첨부</td>
              <td>
                <div>
                  <ul class="file-preview">
                  <!--  
                    파일 첨부 상태

                    1. 파일없음 : no-file
                      <li class="status-no-file">

                    2. 파일 업로드중: file-uploading
                      <li class="status-file-uploading">

                    3. 완료 (text or ppt) : status-text-file / status-ppt-file
                      <li class="status-text-file">
                      <li class="status-ppt-file">
                        
                   -->
                   <!-- v-if로 no-file랑 uploading 나오게 하면 될거같음 -->
                    <template v-if="!newPost.file.length">
                      <li class="status-no-file"><span><i class="fas fa-exclamation-triangle d-yellow"><span class="child-text-ir">빈 파일 아이콘</span></i><em>No file</em></span></li>
                    </template>
                    <template v-else>
                      <template v-for="file in newPost.file">
                        <li v-if="file.loading === true" class="status-file-uploading">
                          <span><i class="fas fa-spinner fa-spin d-yellow"><span class="child-text-ir">로딩중 아이콘</span></i><em>Uploading...</em></span>
                        </li>
                        <li v-else class="status-ppt-file">
                          <span><i class="far fa-file-powerpoint"><span class="child-text-ir">파일 아이콘</span></i><em>{{ file.name }}</em></span>
                          <span class="file-size"><span>{{ changeBytes ( file.size ) }}</span> </span>
                          <button @click="fileDelete(file)" class="file-delete"><i class="fas fa-times"><span class="child-text-ir">삭제 아이콘</span></i></button>
                        </li>
                      </template>
                    </template>
                  </ul>
                  <label for="file-up" class="child-text-ir">파일업로드</label>
                  <input @change="handleFileChange( newPost, $event )" type="file" multiple="multiple" id="file-up">
                </div>
              </td>
            </tr>
            <tr>
              <td>이미지 첨부</td>
              <td>
                <div>
                  <ul class="image-preview">
                   <!--  
                    이미지 첨부 상태

                    1. 이미지없음 : no-file
                      <li class="status-no-image">

                    2. 이미지 업로드중: file-uploading
                      li class="status-image-uploading">

                    3. 완료 (text or ppt) : status-text-file / status-ppt-file
                      <li class="status-attached-image"> : 삭제버튼 없음
                      <li class="status-attached-image-fix"> : 삭제버튼있음
                   -->
                    <template v-if="!newPost.img.length">
                      <li class="status-no-image">
                        <div><i class="far fa-file d-yellow"><span class="child-text-ir">빈 이미지 아이콘</span></i></div>
                        <span><i class="fas fa-exclamation-triangle d-yellow"><span class="child-text-ir">빈 파일 아이콘</span></i><em>No image</em></span>
                      </li>
                    </template>
                    <template v-else>
                      <template v-for="file in newPost.img">
                        <li v-if="file.loading === true" class="status-image-uploading">
                          <div><i class="fas fa-spinner fa-spin d-green"><span class="child-text-ir">로딩중 아이콘</span></i></div>
                          <span><i class="fas fa-spinner fa-spin d-yellow"><span class="child-text-ir">로딩중 아이콘</span></i><em>Uploading...</em></span>
                        </li>
                        <li v-else class="status-attached-image-fix">
                          <div><img :src="file.src" alt=""></div>
                          <span><i class="fas fa-file-image"><span class="child-text-ir">이미지 아이콘</span></i><em>{{ file.name }}</em></span>
                          <span class="file-size"><span>{{ changeBytes ( file.size ) }}</span></span>
                          <button @click="imgDelete(file)" class="file-delete"><i class="fas fa-times"><span class="child-text-ir">삭제 아이콘</span></i></button>
                        </li>
                      </template>
                    </template>
                  </ul>
                  <label for="image-up" class="child-text-ir">이미지업로드</label>
                  <input @change="handleImageChange( newPost, $event )" type="file" multiple="multiple" id="image-up">
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="buttons">
          <template v-if="!isModifyMode">
            <button class="list-btn-style" @click="add()">등록</button>
          </template>
          <template v-if="isModifyMode">
            <button class="btn" @click="modify()">완료</button>
            <button class="btn" @click="cancle()">취소</button>
          </template>
        </div>
      </section>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      newPost: this.creatPost(),
      cachePost: null
    }
  },
  computed: {
    isModifyMode () {
      const id = this.$route.params.id;
      return id ? true : false;
    }
  },
  created () {
    const { isModifyMode } = this;
    const { $store: { state: { postList } }, $route: { params: { id } } } = this;
    
    if(isModifyMode){
      const post = postList.find(listItem=>{
        return listItem.id === Number(id);
      });

      this.newPost = post;
      this.modifyStart();
    } else {
      this.$router.push('/board-write');
    }
  },
  methods: {
    creatPost () {
      return { title: '', type: null, desc: '', file: [], img: [] }
    },
    changeBytes ( size ) {
      if (size < 1024) return size + " Bytes";
      else if(size < 1048576) return(size / 1024).toFixed(0) + " KB";
      else if(size < 1073741824) return(size / 1048576).toFixed(2) + " MB";
    },
    handleFileChange( newPost, $event ) {
      const input = $event.target;
      const files = Array.from($event.target.files);
      
      files.forEach((refFile)=>{
        const { lastModified, lastModifiedDate, name, size, type, webkitRelativePath } = refFile;
        const file = {
          lastModified, lastModifiedDate, name, size, type, webkitRelativePath,
          src: "",
          loading: true,
          ref:refFile
        };

        newPost.file.push(file);

        setTimeout(()=>{
          console.log('file uploaded');
          file.loading = false;
          input.value = "";
        },2000);


      })
    },
    handleImageChange( newPost, $event ) {
      const input = $event.target;
      const files = Array.from($event.target.files);

      files.forEach((refFile)=>{
        const { lastModified, lastModifiedDate, name, size, type, webkitRelativePath } = refFile;
        let src = URL.createObjectURL(refFile);

        const file = {
          lastModified, lastModifiedDate, name, size, type, webkitRelativePath,
          src,
          loading: true,
          ref:refFile
        };

        newPost.img.push(file);

        setTimeout(()=>{
          console.log('file uploaded');
          file.loading = false;
          input.value = "";
        },2000);
      })
    },
    add () {
      const { newPost, $store: { dispatch } } = this;
      const item = { ...newPost };

      dispatch('add', item);
      this.$router.replace('/board-list');
    },
    modifyStart () {
      this.cachePost = { ...this.newPost };
    },
    modify () {
      this.cachePost = null;
      this.$router.go(-1);
    },
    cancle () {
      Object.assign(this.newPost, this.cachePost);
      this.$router.push('/board-view/' + this.newPost.id );

    },
    fileDelete (target) {
      const {
        $store: { state : { postList } },
        $router,
        newPost
       } = this;
      newPost.file = newPost.file.filter((fileObject)=>{
        return fileObject !== target;
      });
    },
    imgDelete(target) {
      const {
        $store: { state : { postList } },
        $router,
        newPost
       } = this;
      newPost.img = newPost.img.filter((imgObject)=>{
        return imgObject !== target;
      });
    }
  }
}
</script>