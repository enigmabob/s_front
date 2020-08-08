/* eslint-disable vue/no-side-effects-in-computed-properties */
<template>

  <b-container>
    <b-row>
      <b-col cols="6" sm="4" lg="3"
        :key="index"
        v-for="(item, index) in currentPageItems"
          >
            <b-link @click="goPlay(item.album_id,item.id)">

            <!-- <b-link :href="playvideo/(item.album_id)/(item.id)"> -->
        <b-card
          :bg-variant="color"
          :header="item.img_path"
          :img-src="item.img_path"
          class="text-center"
          style="margin-top: 30px"
          >
          <p class="card-text">
            {{item.desc}}
          </p>
        </b-card>

    </b-link>
      </b-col>

    </b-row>

    <b-row style="margin-top: 50px">
      <b-col cols="6" sm="4" lg="3" >
        <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0" />
      </b-col>
    </b-row>
  </b-container>

</template>

<script>

const items = [
  {
    title: 'Primary',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    variant: 'primary'
  }

]

export default {
  name: 'MyBootstrapGrid',
  data () {
    return {
      domain: 'http://pic.toyfang.com',
      color: 'Primary',
      items: [],
      currentPage: 1,
      perPage: 5,
      totalRows: items.length,
      paginated_items: {},
      currentPageIndex: 0,
      nbPages: 0
    }
  },
  computed: {
    pageCount () {
      // eslint-disable-next-line one-var
      let l = this.totalRows,
        s = this.perPage
      return Math.floor(l / s)
    },
    currentPageItems () {
      let lengthAll = this.items.length
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.nbPages = 0
      for (let i = 0; i < lengthAll; i = i + this.perPage) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.paginated_items[this.nbPages] = this.items.slice(i, i + this.perPage)
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.nbPages++
      }
      return this.paginated_items[this.currentPage - 1]
    }
  },
    
  mounted () {
    this.getVideoList()
  },
  methods: {
    goPlay(album_id , video_id){
      console.log(album_id)
      console.log(video_id)
     let routeUrl = this.$router.resolve({
          path: "/playvideo/"+album_id+"/"+video_id,
         // query: {id:album_id,id2:video_id}
     });
     window.open(routeUrl .href, '_blank');

    },
    getVideoList () {
      var ts = this
             this.$http.post('/video/Lists', {need_total:1}).then(function (res) {
        //console.log(res.data.data.lists)
        if (res.data.code != 0) {
          ts.$message(res.data.msg)
        } else {
          var item = []
           ts.items = res.data.data.lists
          ts.totalRows = res.data.data.total_num
          //console.log(ts.items)
        }
      })
    },

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
