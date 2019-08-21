<template>
  <main class="sub list" id="main">
    <div id="main-wrap">
      <section class="list-horizon">
        <a @click="$router.push('/board-write')" class="list-btn-style write-btn">작성하기</a>
        <table>
          <caption>게시판 검색</caption>
          <colgroup>
            <col span="1" style="width:150px">
            <col span="1" style="width:35%">
            <col span="1" style="width:150px;">
            <col span="1" style="width:35%">
          </colgroup>
          <tbody>
            <tr>
              <th>
                <label for="kind-of-search">검색어</label>
              </th>
              <td>
                <label for="list-search" class="child-text-ir">검색종류 선택</label>
                <select name="list-search" id="list-search">
                  <option value="all">-전체검색-</option>
                  <option value="title">제목</option>
                  <option value="content">내용</option>
                  <option value="writer">작성자</option>
                </select>
                <input type="text" id="kind-of-search">
              </td>
              <th>
                <label for="list-skin">게시판스킨</label></th>
              <td>
                <label for="list-skin" class="child-text-ir">스킨선택</label>
                <select name="list-skin" id="list-skin">
                  <option value="choose">-스킨선택-</option>
                  <option value="--1">01</option>
                  <option value="--2">02</option>
                </select>
              </td>
            </tr>
            <tr>
              <th>노출여부</th>
              <td colspan="3">
                <label for="show">
                  <input type="radio" name="s/h" id="show">
                  노출
                </label>
                <label for="hide">
                  <input type="radio" name="s/h" id="hide">
                  숨김
                </label>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="4" class="no-bg">
                <i class="fas fa-exclamation-circle"><span class="child-text-ir">느낌표</span></i>
                순위변경의 경우 노출구분 검색시에만 변경 가능합니다.
              </td>
            </tr>
          </tfoot>
        </table>
        <button class="list-btn-style search-btn">검색</button>
      </section>
  
      <section class="list-board">
        <table>
          <caption class="child-text-ir">게시글 리스트</caption>
          <colgroup>
            <col style="width: 50px;">
            <col>
            <col span="2" style="width: 150px;">
          </colgroup>
          <thead>
            <tr>
              <th>번호</th>
              <th><span>제목</span></th>
              <th><span>작성자</span></th>
              <th>등록일시</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in postList" @click="$router.push('/board-view/' + item.id )">
              <td>{{ item.id }}</td>
              <td><a>{{ item.title }}</a></td>
              <td><span>인사팀 이희성</span></td>
              <td><span>2018-09-27</span></td>
            </tr>
          </tbody>
        </table>
        <div class="page-control">
            <a class="page-prev" href="#"><img src="@/assets/img/icon/Arrow-Gray-Left.png" alt="리스트 이전버튼"></a>
          <ul>
            <li><a href="#">1</a></li>
            <!-- <li><a href="#">2</a></li> -->
            <!-- <li><a href="#">3</a></li> -->
          </ul>
            <a class="page-next" href="#"><img src="@/assets/img/icon/Arrow-Gray-Right.png" alt="리스트 다음버튼"></a>
        </div>
      </section>
    </div>
  </main>
</template>

<script>
export default {
  computed: {
    postList () {
      const { state : { postList } } = this.$store;
      return postList;
    }
  }
}
</script>