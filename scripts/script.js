var director = require('director');
var Vue = require('vue');
var markdown = require('markdown').markdown;
var moment = require('moment');

Vue.component('home', {
  template: '#home',
});

Vue.component('profile', {
  template: '#profile',
});

Vue.component('publish-box', {
  template: '#publish-box',
  data: {
    content: null
  },
  methods: {
    post: function () {
      alert(this.content);
    }
  },
  computed: {
    parsed: {
      $get: function () {
        return markdown.toHTML(this.content || '');
      }
    }
  }
});

Vue.component('feed-list', {
  template: '#feed-list',
  data: {
    posts: [
      {
        created: 1411844763705,
        author: 'Jehan',
        content: 'Under the hood, Vue.js intercepts an observed Array’s mutating methods (`push()`, `pop()`, `shift()`, `unshift()`, `splice()`, `sort()` and `reverse()`) so they will also trigger View updates.'
      }
    ]
  }
});

Vue.component('basic-post', {
  template: '#basic-post',
  computed: {
    parsed_content: {
      $get: function () {
        return markdown.toHTML(this.content || '');
      }
    },
    parsed_time: {
      $get: function () {
        return moment(this.created).fromNow();
      }
    }
  }
});

// Vue.component('nest', Vue.extend({
//     template: '#nest',
//     components: {
//         view1: Vue.extend({
//             template: '<span>this is subview 1</span>',
//         }),
//         view2: Vue.extend({
//             template: '<span>this is subview 2</span>',
//         }),
//     },
//     data: {
//         subview: 'view1',
//     },
// }));

var main = new Vue({
  el: '#main',
  data: {
    currentView: 'home'
  }
});

var router = new director.Router({
  '/': function() {
    main.currentView = 'home';
  },
  '/profile': function() {
    main.currentView = 'profile';
  }
});

router.init();