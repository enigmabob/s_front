<template>
<div>

<b-container class="bv-example-row">
    <b-row>
 
            <!--文章列表-->
            <b-col cols="12" sm="12" lg="8">  
              <b-row>
                <!--导航站-->

  <b-breadcrumb :items="dh"></b-breadcrumb>


              </b-row>
               <b-row v-if="article != null">
                                        <b-card 
                    img-top
                    tag="article"
                    class="mb-2"
                    style="width:100%"
                >
                <b-card-header>
                              <b-row>
                                   <b-col> 
                                    {{title}}
                                   </b-col>
                              </b-row>
                              <b-row align-h="start">
                                <div id="create_at" style="margin-left:10px">
                                  发布时间:{{create_at}}
                                </div>
                              </b-row>

                </b-card-header>
                </b-card-text style="padding-bottom:0px;margin-bottom:0px">
                    <div class="output ql-snow">
                    <div class="ql-container ql-editor" v-html="article"></div>
                    </div>
                    <!-- <b-card-text class='ql-editor' v-html="item.content">
                    </b-card-text> -->
                    </b-card>
                </b-card-text>
                <b-card-footer style="width:100%;background-color:#fff;border-top:0px;margin-top:0px;padding:0px">
      <nav class="pagination_post" id="pagination"><div class="prev-post pull_left" name="fd">
      <b-link :href="'#/article/'+prev_id">
      <img class="prev_cover" src="https://cdn.jsdelivr.net/gh/jerryc127/CDN@latest/cover/default_bg.png" onerror="onerror=null;src='/img/404.jpg'">
      <div class="pagination-info" v-if="prev_id !=null"><div class="label">上一篇</div><div class="prev_info">{{prev_title}}</div></div>
      </b-link></div><div class="next-post pull_right" name="fd">
        
      <b-link :href="'#/article/'+next_id">
      <img class="next_cover" src="https://cdn.jsdelivr.net/gh/jerryc127/CDN@latest/cover/default_bg.png" onerror="onerror=null;src='/img/404.jpg'">
      <div class="pagination-info" v-if="next_id !=null"><div class="label">下一篇</div><div class="next_info">{{next_title}}</div></div></b-link></div>
      </nav>

                </b-card-footer>
                </b-row>
     </b-col >
  <blog_right></blog_right>
  </b-row>

</b-container>

</div>
</template>

<script type="text/ecmascript-6">
  import dedent from 'dedent'
  import hljs from 'highlight.js'
  import debounce from 'lodash/debounce'
  import { quillEditor } from 'vue-quill-editor'
    import blog_right from '@/components/blog_right'
  // highlight.js style
import 'highlight.js/styles/rainbow.css'

  // import theme style
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'


const articleList = [
  {
    // title: 'Primary',
    // body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    // variant: 'primary'
  }

]
  export default {
    name: 'in-video',
    watch:{
        '$route'(to , from){
            console.log(to)
            if(to.params.aid != from.params.aid){
                this.getArticleList();
            }
        }

    },
    data () {
      return {
        article:null,      //文章列表
        title:"",
        create_at:0,       //发布时间

        next_id:null,   
        next_title:"", 
        
        prev_id:null,   
        prev_title:"",
      
      currentPage: 1,
      perPage: 10,
      totalRows: articleList.length,
      paginated_items: {},
      currentPageIndex: 0,
      nbPages: 0,
      dh: []
      }
    },
    created:function(){
        // elements = document.getElementsByName("fd") 
        // elements.mouseover
    },
    mounted() {

      //获取专辑
    this.getArticleList()

    },
    methods: {
       getArticleList(){
           
            let aid = this.$route.params.aid;        //类型id    
            let p = {}
            if(aid != undefined){
                  p = {id: aid}  
            }else{
              return this.$router.push("#/blog");
            }
            var ts = this
            this.$http.post('/article/detail', p).then(function (res) {

           console.log(res.data.data.content)
           
            if (res.data.code != 0) {
               ts.$message(res.data.msg)
           
            } else {
           
           if(res.data.data.content != undefined){
              ts.article = decodeURIComponent(atob(res.data.data.content).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                    }).join(''));
              ts.title = res.data.data.title
              ts.dh = res.data.data.nav
              if(res.data.data.other.prev != false){
                console.log(res.data.data.other)
                ts.prev_id = res.data.data.other.prev.id;
                ts.prev_title = res.data.data.other.prev.title;
              }else{
                ts.prev_id = null;
                ts.prev_title = "";
              }
              
              
              if(res.data.data.other.next != false){
                ts.next_id = res.data.data.other.next.id;
               ts.next_title = res.data.data.other.next.title;
              console.log(res.data.data.other.next.title);
              }else{
                ts.next_id = null;
               ts.next_title = "";
              }
              //var newDate = new Date();
              //newDate.setTime( res.data.create_at * 1000);
              ts.create_at = res.data.data.create_at
           }
            }
          })
      },

    },

components:{
    blog_right:blog_right
//quillEditor

}
  }

  
</script>
<style>
.card-header{
    background-color:#fff;
    font-size:25px
}
.breadcrumb{
  background-color:#fff
}
#create_at{
  font-size:12px
}


/* 上一篇 下一篇*/
#pagination.pagination_post {
    margin: 2rem 0!important;
    background: #000;
}

#pagination {
    overflow: hidden;
    margin-top: 1rem;
    width: 100%;
}
#pagination .next-post, #pagination .prev-post {
    width: 50%;
}
.pull_left {
    float: left;
}
#pagination div {
    display: block;
}
#pagination img.next_cover, #pagination img.prev_cover {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: .7;
    /* -webkit-transition: all .6s;
    -moz-transition: all .6s;
    -o-transition: all .6s;
    -ms-transition: all .6s; */
    transition: all .6s;
    object-fit: cover;
}

#pagination .pagination-info{
    display:block;
    position: absolute;
    top: 50%;
    padding: 1rem 2rem;
    width: 100%;
    /* -webkit-transform: translate(0,-50%);
    -moz-transform: translate(0,-50%);
    -o-transform: translate(0,-50%);
    -ms-transform: translate(0,-50%); */
    transform: translate(0,-50%);
}



#pagination .next-post, #pagination .prev-post {
  
    width: 50%;
}
.pull_right {
    float: right;
}


nav {
    display: block;
}
#pagination img {
    display:block;
    max-width: 100%;
    /* -webkit-transition: all .2s;
    -moz-transition: all .2s;
    -o-transition: all .2s;
    -ms-transition: all .2s; */
    transition: all .2s;
}



#pagination .next-post a, #pagination .prev-post a {
    position: relative;
    display: block;
    overflow: hidden;
    height: 150px;
}

#pagination a {
    color: #99a9bf;
    text-decoration: none;
    /* word-wrap: break-word;
    -webkit-transition: all .2s;
    -moz-transition: all .2s;
    -o-transition: all .2s;
    -ms-transition: all .2s; */
    transition: all .2s;
    overflow-wrap: break-word;

    background-color: transparent;

}

#pagination a:-webkit-any-link {
    cursor: pointer;
    text-decoration: underline;
}

#pagination .next-post .label, #pagination .prev-post .label {
    color: rgba(255,255,255,.9);
    text-transform: uppercase;
    font-size: 90%;
}

#pagination .next_info, #pagination .prev_info {
    overflow: hidden;
    color: #fff;

    text-overflow: ellipsis;
    white-space: nowrap;
    font-weight: 500;
}

#pagination .next-post .pagination-info {
    text-align: right;
}

#pagination .prev-post .pagination-info {
    text-align: left;
}
</style>

