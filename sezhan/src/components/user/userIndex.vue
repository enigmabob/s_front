<template>
      <b-container class="">
        <b-modal
      id="modal-prevent-closing-pwd"
      ref="modal"
      title="修改密码"
      @show="resetModal_pwd"
      @hidden="resetModal_pwd"
      @ok="handleOk_pwd"
    >
      <form ref="form" @submit.stop.prevent="login">
        <b-form-group
          :state="state_oldpwd"
          label="旧密码"
          label-for="oldpwd"
          invalid-feedback="旧密码不能为空"
        >
          <b-form-input
            type='password'
            id="oldpwd"
            v-model="pwdForm.oldpwd"
            :state="state_oldpwd"
            required
          ></b-form-input>
        </b-form-group>

                <b-form-group
          :state="state_password"
          label="密码"
          label-for="passwordd"
          invalid-feedback="密码不能为空"
          >
      
          <b-form-input
            type='password'
            id="password"
            v-model="pwdForm.password"
            :state="state_password"
            required
          ></b-form-input>
        </b-form-group>  

                        <b-form-group
          :state="state_password"
          label="确认密码"
          label-for="c_passwordd"
          invalid-feedback="确认密码不能为空"
          >
      
          <b-form-input
            type='password'
            id="c_password"
            v-model="pwdForm.c_password"
            :state="state_c_password"
            required
          ></b-form-input>
        </b-form-group>  
        <div v-if="pwdForm.msg!=''">
           <b-alert show variant="warning">{{pwdForm.msg}}</b-alert>
</div>    
      </form>
    </b-modal>





        <b-modal
      id="modal-prevent-closing-phone"
      ref="modal"
      title="绑定手机"
      @show="resetModal_pwd"
      @hidden="resetModal_pwd"
      @ok="handleOk_pwd"
    >
      <form ref="form" @submit.stop.prevent="phone">
        <b-form-group
          :state="state_phone"
          label="手机号"
          label-for="phone"
          invalid-feedback="手机号不能为空"
        >
          <b-form-input
            id="phone"
            v-model="phoneForm.phone"
            :state="state_phone"
            required
          ></b-form-input>
        </b-form-group>

          <b-form-group
          :state="state_code"
          label="验证码"
          label-for="code"
          invalid-feedback="请输入验证码"
        >
        <div  class="form-inline">
          <b-form-input
            type='password'
            id="code"
            v-model="phoneForm.code"
            :state="state_code"
            required
          ></b-form-input>
            <b-button   variant="secondary" @click="getPhoneCode">获取验证码</b-button>
</div>
        </b-form-group>
        <div v-if="pwdForm.msg!=''">
           <b-alert show variant="warning">{{pwdForm.msg}}</b-alert>
</div>    
      </form>
    </b-modal>




   <div style="margin-top:30px">
  <b-row style="height:100%">
    <b-col  cols="0" sm="2" lg="2">
        <b-list-group>
            <b-list-group-item>我的信息</b-list-group-item>
            <b-list-group-item>收藏列表</b-list-group-item>
            <b-list-group-item>历史纪录</b-list-group-item>
            <b-list-group-item>推广链接</b-list-group-item>
            <b-list-group-item>消费纪录</b-list-group-item>
        </b-list-group>    
    </b-col>
    <b-col cols='12' sm='10' lg='10'>
          <b-row >
              <b-col cols='12'>
                  <div style="float:left;width:100%;border:1px solid red;height:120px">广告</div>
                  <div style="float:left;width:100%;text-align:left">
                        <b-list-group>
            <span>用户等级：</span>
            <div class='form-inline'><b>等级1</b> <b-progress :value="value" :max="max" show-progress animated style="width:80%"  v-b-popover.hover.top="'I am popover directive content!'"></b-progress></div>
            <span>昵称: {{nickname}}</span>
            <span>积分: {{credit}}</span>
            <span>金币: {{money}}</span>
                        </b-list-group> 
                  </div>
              </b-col>
              <b-col cols='12' style="text-align:left">
                  
                  <div style="margin-top:30px">
                            <div class="mobile_email_title clearfix">
                                <p class="userdata_set fl" style='font: 12px/1.5 "微软雅黑", Helvetica, Arial, sans-serif;
letter-spacing: normal !important;

height: 16px;
line-height: 16px;
font-size: 16px;
margin-right: 9px;
font-weight: bold;
color: #333333;'>帐号设置</p>
                                <!-- <div class="safe_info fl"><span class="safe_rank safe_rank_lv2"></span><p>安全评分<span>64</span>分，帐号存在安全风险，可进一步提升</p></div>-->
                                </div> 

                        </div>
           
              </b-col>
                <b-col cols="12" sm="6" lg="6"
            :key="index"
            v-for="(item, index) in binds"
            >
                    <b-card
                        :title ="item.title"
                        img-top
                        tag="article"
                        style="max-width: 20rem;height:150px"
                        class="mb-2"
                    >
                        <b-card-text>
                        {{item.content}}
                        </b-card-text>

                        <b-button v-b-modal="item.action"  variant="outline-secondary">
                   
                            {{item.button_name}}
                            <b-icon :icon="item.icon"></b-icon>
                            </b-button>
                    </b-card>
                </b-col>
          </b-row>
    </b-col>
  </b-row>

  </div>
  </b-container>
</template>
<script>
import store from '../../vuex/store.js'
const items = [
  {
    title: 'Primary',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    variant: 'primary'
  }

]

export default {
  store,
  name: 'MyBootstrapGrid',
  data () {
    return {
      value: 120,
      max: 200,
      credit: 0,
      money: 0,
      nickname: this.$store.state.userinfo.nickname,

      binds: [
        {
          title: '手机未绑定' ,
          button_name: '手机设置',
          action: 'modal-prevent-closing-phone',
          content: '绑定手机，领取积分',
          icon: 'phone'
        },

        {
          title: '密码设置',
          
          button_name: '修改密码',
          action: 'modal-prevent-closing-pwd',
          content: '修改密码',
          icon: 'lock'
        },
        {
          title: '邮箱绑定',
          
          button_name: '邮箱设置',
          action: 'modal-prevent-closing-mail',
          content: '绑定手机，领取积分',
          icon: 'envelope'
        }
        // {
        //   title: '银行卡未绑定',
          
        //   button_name: '绑定银行卡',
        //   action: 'bin_bank',
        //   content: '完善银行卡信息，便于提取金币',
        //   icon: 'credit-card'
        // }
      ],
      phoneForm: {
          phone: '',
          code: '',
      },
     mailForm: {
          mail: '',
          code: '',
      },
       pwdForm: {
          oldpwd: '',
          password: '',
          c_password: '',
          msg: ''
      },
      state_oldpwd:null,
      state_password:null,
      state_c_password:null,

      state_phone:null,

      state_mail:null,
      state_code:null
    //    bankForm: {
    //       username: '',
    //       password: '',
    //         domain: ''
    //   },
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
    this.getLevel()
  },
  methods: {
    resetModal_pwd() {
      this.pwdForm.oldpwd = ''
      this.pwdForm.password = ''
      this.pwdForm.c_password = ''
      this.pwdForm.msg = ''
    },

        resetModal_phone() {
      this.phoneForm.phone = ''
      this.phoneForm.code = ''
      this.phoneForm.msg = ''
    },

        resetModal_mail() {
      this.mailForm.mail = ''
      this.mailForm.code = ''

      this.mailForm.msg = ''
    },

    handleOk_pwd (bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault()
      // Trigger submit handler
      //this.pwdForm.data.domain = window.location.host
      var ts = this
      this.$http.post('/user/updPassword', this.pwdForm).then(function (res) {
        
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


        handleOk_phone (bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault()
      // Trigger submit handler
      this.pwdForm.data.domain = window.location.host
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


        handleOk_email(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault()
      // Trigger submit handler
      this.pwdForm.data.domain = window.location.host
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


    getLevel () {
    
    }

  }
}
</script>
<style scoped>
.card-title{
    font-size:16px;
    color: #000;
    font-weight: bold;
}

</style>