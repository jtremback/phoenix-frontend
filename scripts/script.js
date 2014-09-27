var director = require('director');
var Vue = require('vue');
var markdown = require('markdown').markdown;

Vue.component('home', {
  template: '#home',
});

Vue.component('profile', {
  template: '#profile',
});

Vue.component('post-box', {
  template: '#post-box',
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