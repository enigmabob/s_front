import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import header from '@/components/commen/header'
import banner from '@/components/banner'
import footer from '@/components/commen/footer'
import videoList from '@/components/videoList'
import playvideo from '@/components/playvideo'
import live from '@/components/live'

import blog from '@/components/blog'      //文章列表
import article from '@/components/article'   //文章详情


import userIndex from '@/components/user/userIndex'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/index',
      name: 'index',
      components: {
        header,
        banner,
        footer,
        videoList
      }
    },
    {
      path: '/userIndex',
      name: 'userIndex',
      components: {
        header,
        userIndex,
        footer,
      }
    },
    {
      path: '/playvideo/:aid/:vid',
      name: 'playvideo',
      components: {
        header,
        playvideo,
        footer,


      }
    },
    {
      path: '/live',
      name: 'live',
      components: {
        header,

        footer,
        live,

      }
    },
    {
      path: '/blog/:tid/',
      name: 'blog',
      components: {
        header,
        blog,
        footer,

      }
    },
    {
      path: '/blog/',
      name: 'blog',
      components: {
        header,
        blog,
        footer,

      }
    },
    {
      path: '/article/:aid',
      name: 'article',
      components: {
        header,
        article,
        footer,

      }
    }
  ]
})
