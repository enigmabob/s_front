<template>
<div>

<b-container class="bv-example-row">
    <b-row>
 
            <!--文章列表-->
            <b-col cols="12" sm="12" lg="8">  
               <b-row v-if="currentPageItems.length > 0">
                                        <b-card  :key="index"
                        v-for="(item, index) in currentPageItems"
                    header-bg-variant="white"
                    img-top
                    tag="article"
                    class="mb-2"
                    style="width:100%"
                >
                                <b-card-header>
                        <b-link  :href="'#/article/'+item.id">{{item.title}}</b-link>
                    </b-card-header>
                    <div class="output ql-snow">
                    <div class="ql-container ql-editor" v-html="item.content"></div>
                    </div>
                    <!-- <b-card-text class='ql-editor' v-html="item.content">
                    </b-card-text> -->
                    </b-card>
        
            </b-row>
            <b-row v-else>
                   <b-card 
                    img-top
                    tag="article"
                    class="mb-2"
                    style="width:100%;margin-top:50px"
                >
                <!-- <b-card-header>
                        <b-link  href="'#/article/'+item.id">{{item.title}}</b-link>
                    </b-card-header> -->
                <b-card-text>
                该栏目暂无文章
                    </b-card-text>
                    </b-card>
            </b-row>
          <b-row style="margin-top: 50px">
            <b-col cols="6" sm="4" lg="3" >
                <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0" />
            </b-col>

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
            if(to.params.tid != from.params.tid){
                this.getArticleList();
            }
        }

    },
    data () {
      return {
        articleList:[],      //文章列表

      currentPage: 1,
      perPage: 10,
      totalRows: articleList.length,
      paginated_items: {},
      currentPageIndex: 0,
      nbPages: 0
      }
    },
    mounted() {

      //获取专辑
    this.getArticleList()

    },
    methods: {
       getArticleList(){
           
            let typeid = this.$route.params.tid;        //类型id    
            let p = {}
            if(typeid != undefined){
                  p = {where:{type: typeid}}  
            }
            p.need_total = 1
            var ts = this
            this.$http.post('/article/lists', p).then(function (res) {

           console.log(res.data.data.lists)
           
            if (res.data.code != 0) {
              ts.$message(res.data.msg)
           
            } else {
                console.log(res.data.data.lists);
                for(var a in res.data.data.lists){
                    console.log(res.data.data.lists[a].content);
                    console.log(window.atob(res.data.data.lists[a].content))
                    res.data.data.lists[a].content = decodeURIComponent(atob(res.data.data.lists[a].content).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
                 
                }
                ts.articleList = res.data.data.lists
              ts.totalRows = res.data.data.total_num
            }
          })
      },

    },
    computed:{
            pageCount () {
      // eslint-disable-next-line one-var
             let l = this.totalRows,
            s = this.perPage
            return Math.floor(l / s)
        },
            currentPageItems () {
            let lengthAll = this.articleList.length
            console.log(lengthAll)
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            this.nbPages = 0
            if(lengthAll == 0){
                   this.paginated_items[this.nbPages] = []
            }else{
                for (let i = 0; i < lengthAll; i = i + this.perPage) {
                    // eslint-disable-next-line vue/no-side-effects-in-computed-properties
                    this.paginated_items[this.nbPages] = this.articleList.slice(i, i + this.perPage)
                    // eslint-disable-next-line vue/no-side-effects-in-computed-properties
                    this.nbPages++
                }
            }
            return this.paginated_items[this.currentPage - 1]
         }
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
</style>

