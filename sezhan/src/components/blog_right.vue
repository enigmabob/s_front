<template>
        <!-- <b-col lg="1">
        </b-col> -->
    <b-col cols="12" sm="12" lg="4">

              <b-row  align-h = 'center' id="userHead"><!--头像-->
                            <b-card
                        header-text-variant="white"
                        header-tag="header"
                        header-bg-variant="dark"
                        footer-tag="footer"
                        footer-bg-variant="success"
                        footer-border-variant="dark"
                        class="head_1"
                    >
                    <b-card-header>
                        <div class="card-info-avatar is-center"><img class="avatar-img" src="http://pic.toyfang.com/static/20200730/avatar.png" onerror="this.onerror=null;this.src='/img/friend_404.gif'" alt="avatar">
                        <div class="author-info__name">Bob</div><div class="author-info__description"></div></div>
                    </b-card-header>
        
                        <b-card-text>
                            <div class="card-content">
                                <div class="card-info-data">
                                        <div class="card-info-data-item is-center">
                                            <a href="/archives"><div class="headline">文章</div>
                                            <div class="length_num">56</div></a></div>
                                        <div class="card-info-data-item is-center"> 
                                        <a href="/tags"><div class="headline">标签</div>
                                        <div class="length_num">13</div></a></div>
                                        <div class="card-info-data-item is-center"> 
                                            <a href="/categories"><div class="headline">分类</div>
                                        <div class="length_num">4</div></a></div>
                            </div>
                           </div>
                        </b-card-text>
                        <b-card-footer style="padding:0px">
                            <div class="card-info-bookmark is-center">
                                <a class="bookmark button--primary button--animated" id="bookmark-it" href="javascript:;" title="加入书签" target="_self">
                                <i class="fa fa-bookmark" aria-hidden="true"></i><span>加入书签</span></a>
                            </div>
                        </b-card-footer>    
                    </b-card>
              </b-row>

              <b-row><!--文章分类-->
                      <b-card
                        header-text-variant="white"
                        header-tag="header"
                        header-bg-variant="dark"
                        footer-tag="footer"
                        footer-bg-variant="success"
                        footer-border-variant="dark"
                        title="文章分类"
                        class="head_1"
                        style="width:100%;margin-top:10px"
                        id="article"
                    >
                              <b-card-text>
                <b-list-group>
                    
                    <b-list-group-item class="d-flex justify-content-between align-items-center" :key="key"
                v-for="(item, key) in articleCount">
                     <b-link :href="'#/blog/'+item.id">   {{item.key}} </b-link>
                        <b-badge variant="primary" pill>
                            {{item.num}}
                        </b-badge>
                    </b-list-group-item>
<!-- 
                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                        Dapibus ac facilisis in
                        <b-badge variant="primary" pill>2</b-badge>
                    </b-list-group-item>

                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                        Morbi leo risus
                        <b-badge variant="primary" pill>1</b-badge>
                    </b-list-group-item> -->
                    </b-list-group>
                              </b-card-text>
                </b-card>
                
              </b-row>

              <b-row><!--文章归总-->
              </b-row>

    </b-col>

</template>
<script>
      export default {
    name: 'in-video',

    data () {
      return {
        articleCount:[],      //文章列表

    //   currentPage: 1,
    //   perPage: 10,
    //   totalRows: articleList.length,
    //   paginated_items: {},
    //   currentPageIndex: 0,
    //   nbPages: 0
    //   
    }
    },
    mounted() {

      //获取专辑
    this.getArticleCount()

    },
    methods: {
       getArticleCount(){
            var ts = this
            this.$http.post('/article/articleCount', {}).then(function (res) {
                console.log(res)
                if (res.data.code != 0) {
                ts.$message(res.data.msg)
                } else {
                     ts.articleCount = res.data.data
                     console.log(ts.articleCount);
                // ts.totalRows = res.data.data.total_num
                }
          })
      },

    },
  }
</script>
<style>
.is-center {
    text-align: center;
}

/*头像部分*/
 .avatar-img {
    width: 110px;
    height: 110px;
    border-radius: 70px;
    -webkit-transition: all .5s;
    -moz-transition: all .5s;
    -o-transition: all .5s;
    -ms-transition: all .5s;
    transition: all .5s;
}
.card-info .author-info__name {
    font-weight: 500;
    font-size: 1.1rem;
}


/*文章数量*/

@media screen and (max-width: 900px)
{
    .head_1{
    margin-top: 1rem;
    }
}
@media screen and (min-width: 900px)
{
    .head_1{
    margin-left: 15px;
}
}


.card-content {
    color: #4c4948;
    font-size: 14px;
    line-height: 2;
    font-family: Lato,Helvetica Neue For Number,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,PingFang SC,Hiragino Sans GB,"Microsoft YaHei",Helvetica Neue,Helvetica,Arial,sans-serif;
    -webkit-tap-highlight-color: transparent;
    padding: 1rem 1.2rem;
}

.card-info-data {
    display: table;
    padding: .4rem 0;
    width: 100%;
    table-layout: fixed;
}
.card-info-data>.card-info-data-item {
    display: table-cell;
}

/*文章*/
.card-info-data>.card-info-data-item a .headline {
    overflow: hidden;
    color: #4c4948;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: .7rem;
}
/*数量*/
.card-info-data>.card-info-data-item a .length_num {
    margin-top: -.3rem;
    color: #000;
    font-size: 1rem;
}

/*加入书签*/
 #bookmark-it {
    position: relative;
    z-index: 1;
    display: block;
    background-color: #49b1f5;
    color: #fff;
    line-height: 1
    .6rem;
}

.fa {
    display: inline-block;
    font: normal normal normal 14px/1 FontAwesome;
    font-size: inherit;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}



/*文章分类*/
#article .card-body{

    padding:1.25rem 0 0 0
}
</style>
