<template>

<div>
     <div>
    <!-- <b-button v-b-modal.modal-prevent-closing>Open Modal</b-button> -->

    <!-- <div class="mt-3">
      Submitted Names:
      <div v-if="submittedNames.length === 0">--</div>
      <ul v-else class="mb-0 pl-3">
        <li v-for="name in submittedNames">{{ name }}</li>
      </ul>
    </div> -->
    <b-modal
      id="modal-prevent-closing-login"
      ref="modal"
      title="登录"
      @show="resetModal_login"
      @hidden="resetModal_login"
      @ok="handleOk_login"
    >
      <form ref="form" @submit.stop.prevent="login">
        <b-form-group
          :state="nameState_login"
          label="账号"
          label-for="name-input-login"
          invalid-feedback="账号不能为空"
        >
          <b-form-input
            id="name-input-login"
            v-model="loginForm.username"
            :state="nameState_login"
            required
          ></b-form-input>
        </b-form-group>
                <b-form-group
          :state="passwordState"
          label="密码"
          label-for="pwd-input-login"
          invalid-feedback="密码不能为空"
          >
      
          <b-form-input
            type='password'
            id="pwd-input-login"
            v-model="loginForm.password"
            :state="passwordState_login"
            required
          ></b-form-input>
        </b-form-group>  
        <div v-if="loginMsg!=''">
           <b-alert show variant="warning">{{loginMsg}}</b-alert>
</div>    
      </form>
    </b-modal>
  </div>

     <div>

    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="注册"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          :state="nameState"
          label="账号"
          label-for="name-input"
          invalid-feedback="账号不能为空"
        >
          <b-form-input
            id="name-input"
            v-model="form.data.username"
            :state="nameState"
            required
          ></b-form-input>
        </b-form-group>

                <b-form-group
          :state="passwordState"
          label="密码"
          label-for="pwd-input"
          invalid-feedback="密码不能为空"
        >
          <b-form-input
            type='password'
            id="pwd-input"
            v-model="form.data.password"
            :state="passwordState"
            required
          ></b-form-input>
        </b-form-group>  

                <b-form-group
          :state="c_passwordState"
          label="确认密码"
          label-for="cpwd-input"
          invalid-feedback="请确认密码"
        >
          <b-form-input
            type='password'
            id="cpwd-input"
            v-model="form.data.c_password"
            :state="c_passwordState"
            required
          ></b-form-input>
        </b-form-group>
        

          <b-form-group
          :state="codeState"
          label="验证码"
          label-for="code"
          invalid-feedback="请输入验证码"
      
        >
        <div     class="form-inline">
          <b-form-input

            id="code"
            v-model="form.data.img_code"
            :state="codeState"
            required
          ></b-form-input>
            <b-img class='' :src="imgcode" fluid alt="验证码" @click="getImgCode"></b-img>
</div>
        </b-form-group>
          <b-form-group
          :state="c_passwordState"
          label="邀请码"
          label-for="yqm"
          invalid-feedback=""
        >
          <b-form-input
            id="yqm"
            v-model="form.data.yqm"
            style='width:50%'
          ></b-form-input>
        </b-form-group>
        <div v-if="regMsg!=''">
           <b-alert show variant="warning">{{regMsg}}</b-alert>
        </div>    
      </form>
    </b-modal>
  </div>
  <b-navbar toggleable="md"  class=''>
    <b-navbar-brand href="#"><img src="~@/assets/img/lg.png"></b-navbar-brand>

    <b-navbar-toggle target="nav-collapse" class="bg-success"></b-navbar-toggle>

    <b-collapse id="nav-collapse"  is-nav>
      <b-nav tabs fill align="start">
        <!-- <b-nav-item href="#index">首页</b-nav-item > -->
        <b-nav-item href="#/index">视频</b-nav-item>
        <b-nav-item href="#/blog">博客</b-nav-item>
        <b-nav-item href="#/live">直播</b-nav-item>
      </b-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="m-auto">
        <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0 ml-0" type="submit"><img src="~@/assets/img/search.png"/></b-button>
        </b-nav-form>

        <!-- <b-nav-item-dropdown text="Lang" right>
          <b-dropdown-item href="#">EN</b-dropdown-item>
          <b-dropdown-item href="#">ES</b-dropdown-item>
          <b-dropdown-item href="#">RU</b-dropdown-item>
          <b-dropdown-item href="#">FA</b-dropdown-item>
        </b-nav-item-dropdown> -->

        <!-- <b-nav-item-dropdown right>

          <template v-slot:button-content>
            <em>User</em>
          </template>
          <b-dropdown-item href="#">Profile</b-dropdown-item>
          <b-dropdown-item href="#">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>-->
      </b-navbar-nav>
      <b-navbar-nav>
        <div class="input-group">
            <div v-if="isLoginFn == false" class="form-inline">
              <div class="col-4 ml-auto  font-weight-bold "><div class="header_bt" v-b-modal.modal-prevent-closing-login><span style="color:#159963">立即登录</span></div></div>
              <div class="col-4 mr-auto font-weight-bold "><div class="header_bt header_bt_register" v-b-modal.modal-prevent-closing><span class="a_white">免费注册</span></div></div>
            </div> 
            <div v-else class="form-inline">
                欢迎您：<b-link href="#userIndex"> {{this.$store.state.userinfo.username}} </b-link>  等级{{this.$store.state.userinfo.vip_level}} <b-link  @click="logout">退出</b-link>
            </div>
        </div>    
       </b-navbar-nav>

    </b-collapse>
  </b-navbar>
</div>
</template>

<script>
import store from '../../vuex/store.js'
export default {
  store,
  data () {
    return {
      form: {
        data:{
          username: '',
          password: '',
          c_password: '',

          img_code: '',
          yqm: '',    // 邀请码
          domain: ''

        }
      },

     loginForm: {
          username: '',
          password: '',
            domain: ''
      },
        nameState: null,
        passwordState: null,
        c_passwordState: null,
        codeState: null,

          nameState_login: null,
        passwordState_login: null,

      loginMsg: '',
      regMsg: '',
      submittedNames: [],
      imgcode: '',
      is_login: false,
     // isLoginFn: false,
      username: '',
      level: 0,
    }
  },
  computed: {
    isLoginFn: function() {
     // console.log(this.$store.getters.isLogin)
       return this.$store.getters.isLogin
    }

  },
  methods: {
    checkFormValidity () {
      const valid = this.$refs.form.checkValidity()
      this.nameState = valid
      return valid
    },
    resetModal_login(){
      this.loginForm.username = ''
      this.loginForm.password = ''
      this.loginMsg = ''
    },
    resetModal () {
      this.form.data.username = ''
      this.form.data.password = ''
      this.form.data.c_password = ''
      this.form.data.img_code = ''
      this.form.data.yqm = ''
      this.regMsg = ''
      this.nameState = null
       this.nameState= null
        this.passwordState= null
        this.c_passwordState= null
        this.codeState = null
      //获取验证码
      this.getImgCode()
    },
    getImgCode(){
        var ts = this
            this.$http.post('/Commen/getImgCode', {type: 1}).then(function (res) {
        
             if (res.data.code != 0) {
                ts.$message(res.data.msg)
              } else {
                ts.imgcode = res.data.data.image
              }
          })
    },

    handleOk (bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault()
      // Trigger submit handler
      this.handleSubmit()
    },
        handleOk_login (bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault()
      // Trigger submit handler
      this.login()
    },
    handleSubmit () {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return
      }
      // Push the name to submitted names
      //this.submittedNames.push(this.name)
      this.form.data.domain = window.location.host
      var ts = this
      this.$http.post('/user/userRegister', this.form.data).then(function (res) {
        
             if (res.data.code != 0) {
                    ts.regMsg = res.data.msg
               //ts.$message(res.data.msg)
              } else {
                
                //ts.imgcode = res.data.data.image
              }
          })
      // Hide the modal manually
      this.$nextTick(() => {
      //  this.$bvModal.hide('modal-prevent-closing')
      })
    },

      login () {
        // Exit when the form isn't valid
        if (!this.checkFormValidity()) {
          return
        }
        // Push the name to submitted names
        //this.submittedNames.push(this.name)
        this.loginForm.domain = window.location.host
        var ts = this
        this.$http.post('/user/userLogin', this.loginForm).then(function (res) {
          console.log(res)
              if (res.data.code != 0) {
                  ts.loginMsg = res.data.msg
                } else {
                  //todo:在local保存信息
                  window.localStorage.setItem('userinfo', JSON.stringify(res.data.data.detail))
                  ts.is_login = true
                  ts.username = res.data.data.detail.username
                  ts.level = res.data.data.detail.vip_level
                  //ts.imgcode = res.data.data.image
                }
            })
        // Hide the modal manually
        this.$nextTick(() => {
        //  this.$bvModal.hide('modal-prevent-closing')
        })
    },
      logout () {
        // Push the name to submitted names
        //this.submittedNames.push(this.name)
        this.loginForm.domain = window.location.host
        var ts = this
        this.$http.post('/user/userLoginOut', {}).then(function (res) {
          console.log(res.data)
              if (res.data.code != 0) {
                  if(res.data.code == 401){
                    window.localStorage.setItem('userinfo', '')
                  }
                  //ts.loginMsg = res.data.msg
                } else {
                    window.localStorage.setItem('userinfo', '')
                }
            })
        // Hide the modal manually
        this.$nextTick(() => {
        //  this.$bvModal.hide('modal-prevent-closing')
        })
    },
    
  }
}
</script>
<style>
  .nav-item a{
    color:grey
  }
</style>