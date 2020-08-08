<template>
<b-container class="bv-example-row">
    <b-row>
      <b-col cols="12" sm="12" lg="8">  
        <d-player id="dplayer" ref="player" :options="options"></d-player>
      </b-col>

  


    <b-col cols="12" sm="12" lg="4">
      <ul class="Barrage-list" id="js-barrage-list" style="list-style-type:none;overflow:auto;height:400px" >
      <li class="Barrage-listItem"  :key="index"
        v-for="(item, index) in Barrage_list" > 
            <div class="Barrage-notice--normalBarrage">
                    <!-- <a class="FansMedal is-made Barrage-icon js-fans-hover js-fans-dysclick" href="/1818791" target="_blank" data-rid="1818791" data-hc="8a8c4d15b59393102e9f2482376080ca" style="display:inline-block;background-image: url(https://gfs-op.douyucdn.cn/fans_medal_resource/2019/12/03/5029aa28b89b6c70f5346510e481d90b.png)">
                    <span class="FansMedal-name js-fans-hover js-fans-dysclick" data-rid="1818791" data-hc="8a8c4d15b59393102e9f2482376080ca">油鸡队</span>
                </a>
        <span class="UserLevel UserLevel--29" title="用户等级：29">
        </span>
    <span class="RoomLevel RoomLevel--14" title="房间等级：14"></span> -->
            
            <span class="Barrage-nickName Barrage-nickName--blue js-nick" title="jackson888" data-uid="42622725" style="">
                用户{{item.from}}：
            </span>
        
        <span class="Barrage-content" data-chatid="ade6d1db32ae4608129a460100000000">
            {{item.msg}}
        </span>
    
            </div>
        </li>
      </ul>
          <b-form-textarea
      id="textarea"
      v-model="msg"
      placeholder="Enter something..."
      rows="3"
      max-rows="6"
    ></b-form-textarea>
      <b-button @click="sendSocketMsg">测试</b-button>
    </b-col>
  </b-row>
<!--专辑列表-->
</b-container>
</template>

<script type="text/ecmascript-6">
var wsServer = 'ws://144.34.249.110:28005';
var websocket = new WebSocket(wsServer);



  import Hls from 'hls.js'
  import dPlayer from 'vue-dplayer'
  import 'vue-dplayer/dist/vue-dplayer.css'

  const live_ = {
    name: 'in-video',
    props: {
      source: {
        type: String,
        default: ''
      }
    },
 
    data () {
      return {
        Barrage_list: [{from:1,msg:'hello'}], //弹幕列表
        ws:websocket,
        msg:"",
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
   // this.getAlbumList()

    //获取随机视频
   // this.getRandom()

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
      this.initWebSocket();
    },
    methods: {

          //初始化webSocket
          initWebSocket(){
              this.ws = new WebSocket('ws://144.34.249.110:28005');
              this.ws.onmessage = this.onmessage
          },
          onerror(){
               console.log('Error occured: ' + evt.data);
          },
          onclose(){
              console.log("Disconnected");
          },
          onopen(){
            console.log("Connected to WebSocket server.");
          },
          /*
          收到消息
          */
          onmessage(evt){
                console.log(this)
                this.Barrage_list.push(JSON.parse(evt.data))
            //live_.Barrage_list.push(JSON.parse(evt.data))
            console.log(this.Barrage_list)
          },

          sendSocketMsg() {
              this.ws.send(JSON.stringify({'t':1,'msg':this.msg }))
          },
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

  export default  live_


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

.Barrage-list {
    overflow: hidden;
    width: 100%;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}


 .Barrage-listItem {
    position: relative;
    line-height: 21px;
    word-break: break-all;
    word-wrap: break-word;
    margin-bottom: 8px;
    margin-top: 8px;
    font-size: 13px;
}
.Barrage-notice--normalBarrage {
    padding-left: 10px;
    padding-right: 10px;
}

.Barrage-listItem .UserLevel {
    margin-right: 3px;
}
.shark-webp .UserLevel--29 {
    background-image: url(https://shark2.douyucdn.cn/front-publish/live-master/assets/images/sprite.userLevel_82d711d.webp);
}

.RoomLevel {
    position: relative;
    display: inline-block;
    vertical-align: middle;
    margin-right: 5px;
    width: 26px;
    height: 16px;
    background-repeat: no-repeat;
}

.RoomLevel--14 {
    background-position: 0 -32px;
}

.Barrage-nickName {
    margin-right: 1px;
    cursor: pointer;
    display: inline-block;
    vertical-align: middle;
}

.Barrage-content {
    color: #333;
    word-break: break-all;
    word-wrap: break-word;
    vertical-align: middle;
}
</style>