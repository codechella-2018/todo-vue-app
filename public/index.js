/* global Vue, VueRouter, axios */

var HomePage = {
  template: "#home-page",
  data: function() {
    return {
      tasks: [
        {
          id: 1,
          text: "Brush the cat",
          completed: false
        },
        {
          id: 2,
          text: "Feed the cat",
          completed: false
        },
        {
          id: 3,
          text: "Water the cat",
          completed: false
        }
      ],
      newTask: {}
    };
  },
  created: function() {},
  methods: {
    addTask: function() {
      if (this.newTask.text) {
        var newTaskInfo = {
          text: this.newTask.text,
          completed: false
        };
        this.tasks.push(newTaskInfo);
        this.newTask = {};
      }
    },
    completeTask: function(currentTask) {
      // when a task is clicked on, find the index of that task and remove that index from the tasks array
      var taskIndex = this.tasks.indexOf(currentTask);
      this.tasks.splice(taskIndex, 1);
    }
  },
  computed: {}
};

var router = new VueRouter({
  routes: [{ path: "/", component: HomePage }],
  scrollBehavior: function(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});

var app = new Vue({
  el: "#vue-app",
  router: router
});