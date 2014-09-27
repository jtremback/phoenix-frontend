var director = require('director');
var Vue = require('vue');
var markdown = require('markdown').markdown;
var moment = require('moment');

Vue.component('home', {
  template: '#home',
});

Vue.component('nav-bar', {
  template: '#nav-bar',
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
    posts: [ // Hardcoded for testing
      {
        created: 1411849284664,
        author: 'Jehan',
        content: 'Under the hood, Vue.js intercepts an observed Array’s mutating methods (`push()`, `pop()`, `shift()`, `unshift()`, `splice()`, `sort()` and `reverse()`) so they will also trigger View updates.'
      },
      {
        created: 1411844763705,
        author: 'Jehan',
        content: 'Notify Vue.js to apply transition CSS classes to this element. The transition classes are applied when certain transition-triggering directives modify the element, or when the ViewModel’s DOM manipulation methods are called.'
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