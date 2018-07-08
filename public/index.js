/* global Vue, VueRouter, axios */

var HomePage = {
  template: "#home-page",
  data: function() {
    return {
      tasks: [],
      newTask: {}
    };
  },
  created: function() {
    axios.get("/api/tasks.json").then(function(response) {
      this.tasks = response.data;
      console.log(this.tasks);
    }.bind(this));
  },
  methods: {
    addTask: function() {
      var clientParams = {
        text: this.newTask.text,
      }
      axios.post("/api/tasks", clientParams).then(function(response){
        this.tasks.push(response.data);
        this.newTask.text = "";
      }.bind(this));
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
    },
    deleteTask: function(task) {
      axios.delete("/api/tasks/" + task.id).then(function(response){
        var index = this.tasks.indexOf(task);
        this.tasks.splice(index, 1);
      }.bind(this));
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









