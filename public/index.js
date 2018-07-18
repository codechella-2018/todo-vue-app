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
  mounted: function() {
    var myLatLng = {lat: 37.788, lng: -122.407}
    var map = new google.maps.Map(document.getElementById('map'), {
      center: myLatLng,
      zoom: 11
    });

    var contentString = '<div id="content">'+
        '<div id="siteNotice">'+
        '</div>'+
        '<h1 id="firstHeading" class="firstHeading">Union Square</h1>'+
        '<div id="bodyContent">'+
        '<p><b>Union Square</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
        'sandstone rock formation in the southern part of the '+
        'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
        'south west of the nearest large town, Alice Springs; 450&#160;km '+
        '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
        'features of the Uluru - Kata Tjuta National Park. Uluru is '+
        'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
        'Aboriginal people of the area. It has many springs, waterholes, '+
        'rock caves and ancient paintings. Uluru is listed as a World '+
        'Heritage Site.</p>'+
        '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
        'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
        '(last visited June 22, 2009).</p>'+
        '</div>'+
        '</div>';

    var infowindow = new google.maps.InfoWindow({
      content: contentString
    });

    var marker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      title: 'Union Square'
    });
    marker.addListener('click', function() {
      infowindow.open(map, marker);
    });
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









