<template>
<b-container class="bv-example-row">
    <b-row>
      <b-col cols="12" sm="12" lg="8">  
        <d-player id="dplayer" ref="player" :options="options"></d-player>
      </b-col>
    <b-col cols="12" sm="12" lg="4">
      <b-list-group>
        <b-list-group-item         :key="index"
        v-for="(item, index) in random_videos">
                   <b-link @click="goPlay(item.album_id,item.id)">
            <b-card
    title="Card Title"
    :img-src="item.img_path"
    img-top
    tag="article"
    class="mb-2"
  >
    <b-card-text>
        {{item.desc}}
    </b-card-text>
       </b-card>
      </b-link>
      </b-list-group-item>
  </b-list-group>
    </b-col>
  </b-row>

<!--专辑列表-->

   <b-row>
       <b-col cols="6" sm="4" lg="3"
        :key="index"
        v-for="(item, index) in album_videos"
          >
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

      </b-col> 

  </b-row>
</b-container>
</template>

<script type="text/ecmascript-6">
  import Hls from 'hls.js'
  import dPlayer from 'vue-dplayer'
  import 'vue-dplayer/dist/vue-dplayer.css'

  export default {
    name: 'in-video',
    props: {
      source: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        player: null,
        album_videos: [],  //同专辑的其他视频列表
        random_videos: [],  //同专辑的其他视频列表
        options: {
            live: true,
          hotkey:true,
          video: {
            url: 'http://api.toyfang.com//20200708/85335.15659439/85335.15659439.m3u8',
            //   url: 'http://api.toyfang.com/live/ttt.m3u8',
              type: 'customHls',
         customType: {
            customHls: function (video, player) {
                const hls = new Hls();
                hls.loadSource(video.src);
                hls.attachMedia(video);
            },
        },
        },
          contextmenu: [
            {}
          ]
        }
      }
    },
    mounted() {
      //获取专辑
    this.getAlbumList()

    //获取随机视频
    this.getRandom()

    this.player = this.$refs.player.dp
    var ts = this

    this.player.on('play', () => {
    this.$emit('play')
   })
   this.player.on('quality_start', () => {
    this.$emit('quality_start')
    this.player.on('play')
   })
   this.player.on('pause', () => {
    this.$emit('pause')
   })
   this.player.on('canplay', () => {
    this.$emit('canplay')
   })
   this.player.on('playing', () => {
    this.$emit('playing')
   })
   this.player.on('ended', () => {

    // ts.player.switchVideo({
    //       url: 'http://api.toyfang.com/20200503/150e9.78722399/150e9.78722399.m3u8',
    //        type: 'customHls',
    //        customType: {
    //         customHls: function (video, player) {
    //             const hls = new Hls();
    //             hls.loadSource(video.src);
    //             hls.attachMedia(video);
    //         },
    //     },
    //      })
    this.$emit('ended')
   // ts.player.play();
   })
   this.player.on('error', () => {
    this.$emit('error')
   })
    },
	  created() {
      this._setVideoUrl(this.source)
    },
    methods: {
      // 设置视频播放路径
       _setVideoUrl (url) {
      //   // this.player.switchVideo({
      //   //   url: 'http://api.toyfang.com/20200421/139b4.33269777/139b4.33269777.m3u8',
      //   //        type: 'customHls',
      //   //    customType: {
      //   //     customHls: function (video, player) {
      //   //         const hls = new Hls();
      //   //         hls.loadSource(video.src);
      //   //         hls.attachMedia(video);
      //   //     },
      //   // },
         //})
       },
       getAlbumList() {
            let album_id = this.$route.params.aid          
            let id = this.$route.params.vid
            var ts = this
            this.$http.post('/user/getAlbumList', {aid: album_id,vid:id}).then(function (res) {
            console.log(res);
            //console.log(res.data.data.lists)
            if (res.data.code != 0) {
              ts.$message(res.data.msg)
            } else {
              ts.album_videos = res.data.data
            }
            console.log(ts.album_videos)
          })
      },
      //获取随机推荐视频
      getRandom() {
                 var ts = this
                  let id = this.$route.params.vid
            this.$http.post('/video/getRandom', {id:id}).then(function (res) {
            console.log(res);
            //console.log(res.data.data.lists)
            if (res.data.code != 0) {
              ts.$message(res.data.msg)
            } else {
              ts.random_videos = res.data.data
            }
            console.log(ts.random_videos)
          })
      }
    },
    components: {
      dPlayer
    }
  }
</script>
<style scoped>
.container{
  padding: 0px;
}
 #dplayer{
    width:100%;
    height:100%;
    margin:auto
 }
</style>