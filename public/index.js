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
      currentTask.completed = !currentTask.completed
    },
    removeCompletedTasks: function() {
      // create a new array of incomplete tasks and use that array
      var incompleteTasks = [];
      this.tasks.forEach(function(task){
        if(!task.completed){
          incompleteTasks.push(task);
        }
      });
      this.tasks = incompleteTasks;
    }
  },
  computed: {
    numIncompleteTasks: function() {
      // look at the tasks array and count how many of the tasks have completed:false
      var count = 0;
      this.tasks.forEach(function(task){
        if(!task.completed){
          count++;
        }
      });
      return count;
    }
  }
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









