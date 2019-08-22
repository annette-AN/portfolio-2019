<template>
  <div id="app">
    <a href="#main" id="skip-nav">본문 바로가기</a>
    <header :class="[ isOpen ? (isMobile ? '' : 'open') : '' ]">
      <nav id="main-tnb">
        <ul class="tnb-wrap">
          <li class="menu-bar" @click="toggleMenu()"><a href="#"><i class="fas fa-bars"><span class="child-text-ir">메뉴바 아이콘</span></i></a></li>
          <li class="refresh"><a href="#"><i class="fas fa-redo"><span class="child-text-ir">새로고침 아이콘</span></i></a></li>
          <!-- bell .notice 를 넣으면 신호등 표시가 나옴 -->
          <li class="bell"><a href="#"><i class="far fa-bell"><span class="child-text-ir">알림종 아이콘</span></i></a></li>
          <li class="search-board">
            <label for="search-dashboard" class="child-text-ir">사이트 내 검색</label>
            <input type="text" placeholder="Search Dashboard" id="search-dashboard">
            <a href="#"><i class="fas fa-search"><span class="child-text-ir">돋보기 아이콘</span></i></a>
          </li>
        </ul>

        <div class="user-wrap">
          <div class="user-profile"><span class="child-text-ir">사용자프로필사진</span></div>     
          <ul class="user-info">
            <li>
              <a href="#"><i class="fas fa-cogs"><span class="child-text-ir">사용자 정보</span></i></a>
              <ul>
                <li><a href="#">my account</a></li>
                <li><a href="#">my calendar</a></li>
                <!-- inbox .notice 를 넣으면 신호등 표시가 나옴, 알림 개수는 content에 적으면 적용됨 -->
                <li class="inbox notice"><a href="#">my inbox</a></li>
                <li><a href="#"><i class="fas fa-power-off"><span class="child-text-ir">로그아웃 아이콘</span></i>log out</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>

      <nav id="main-gnb" :class="[ isOpen ? 'open' : '' ]">
        <div id="main-gnb-header">
          <h1>web<span><span class="child-text-ir">동그라미 아이콘</span></span><strong>Admin</strong></h1>
          <ul>
            <li><a @click="$router.push('/')"><i class="fas fa-home"><span class="child-text-ir">홈 바로가기 아이콘</span></i></a></li>
            <!-- mail .notice 를 넣으면 신호등 표시가 나옴 -->
            <li><a class="mail" href="#"><i class="fas fa-envelope"><span class="child-text-ir">메일 바로가기 아이콘</span></i></a></li>
          </ul>
        </div>

        <div id="main-gnb-contents">
          <div class="gnb-user-profile">
            <!-- 회원 프로필 사진영역 -->
            <div class="user-profile">
              <span class="child-text-ir">사용자프로필사진</span>
            </div>
            <h2>fred smith 
              <span>Life goes on...</span>
            </h2>
          </div>

          <ul class="main-gnb-menu">
            <li v-for="item in headerMenu">
              <a @click="handleMenuItemClick(item)">
                <i :class="item.iconClass"></i>
                <span>{{ item.label }}</span>
              </a>
              <ul v-if="item.children && item.children.length" :class="item.open ? 'show' : ''">
                <li v-for="subitem in item.children"><a href="#">{{ subitem.label }}</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </header>
    <router-view :class="[ isOpen && isMobile ? 'open' : '' ]" />
  </div>
</template>
<script>
import $ from 'jquery';
export default {
  data: ()=>({
    isOpen : false,
    isMobile : false,
    headerMenu: [
      { label: "home", open:false, iconClass: "fas fa-home", to:"/" },
      { label: "widgets", open:false, iconClass: "fas fa-cube" },
      { label: "list", open:false, iconClass: "fas fa-list-alt", to:"/board-list" },
      { label: "themes", open:false, iconClass: "fab fa-ethereum", children:[
          { label: "coporate" },
          { label: "simple" },
          { label: "elegant" },
        ],
      },
      { label: "layouts", open:false, iconClass: "fas fa-layer-group", children:[
          { label: "layout options" },
          { label: "boxed layout" },
          { label: "inner boxed layout" },
          { label: "extended layout" },
          { label: "RTL layout" },
          { label: "horizontal menu" },
          { label: "horizontal menu & boxed" },
        ],
      },
      { label: "UI", open:false, iconClass: "fas fa-tablet-alt", children:[
          { label: "typography" },
          { label: "messages & notifications" },
          { label: "notifications" },
          { label: "icons" },
          { label: "buttons" },
          { label: "tabs & accordions" },
          { label: "sliders" },
          { label: "group list" },
        ],
      },
      { label: "forms", open:false, iconClass: "fas fa-share-square", children:[
          { label: "form elements" },
          { label: "form validations" },
        ],
      },
      { label: "grids", open:false, iconClass: "fas fa-th", children:[
          { label: "simple grids" },
          { label: "draggable grids" },
        ],
      },
      { label: "tables", open:false, iconClass: "fas fa-table", children:[
          { label: "basic tables" },
          { label: "data tables" },
        ],
      },
      { label: "maps", open:false, iconClass: "fas fa-map-marker-alt", children:[
          { label: "google maps" },
          { label: "vector maps" },
        ],
      },
      { label: "extra", open:false, iconClass: "fab fa-sketch", children:[
          { label: "user profile" },
          { label: "time line" },
          { label: "support ticket" },
          { label: "gallery" },
          { label: "calendar" },
          { label: "search results" },
          { label: "invoice" },
          { label: "404 page" },
          { label: "500 page" },
          { label: "blank page" },
          { label: "login" },
          { label: "login v2" },
          { label: "lockscreen" },
        ],
      },
      { label: "menu", open:false, iconClass: "fas fa-ellipsis-h", children:[
          { label: "level 1" },
          { label: "level 2" },
        ],
      },
    ]
  }),
  methods: {
    handleResize (){
      const width = window.innerWidth;
      if(width < 767){
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    },
    handleMenuItemClick (item){
      const { headerMenu } = this;
      const { href, to } = item;
      if(href){
        location.href = href;
        return;
      }
      if(to){
        this.$router.push(to);
        return;
      }

      headerMenu.forEach(menuItem => {
        if(menuItem !== item){
          menuItem.open = false;
        }
      });

      item.open = !item.open;
    },
    toggleMenu() {
      const { headerMenu } = this;
      this.isOpen = !this.isOpen;
      if(this.isOpen === false){
        headerMenu.forEach(menuItem=>(menuItem.open = false));
      }
    }
  },
  mounted () {
    $(window).on("resize", this.handleResize);
    this.handleResize();

    $(this.$el).on('click', 'a[href="#"]', function(e){
      e.preventDefault();
    });
  }
}
</script>