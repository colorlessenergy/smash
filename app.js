/*
  currently trying to figure out how to display 4 empty boxes.
  first load
*/

Vue.component("thumbnail", {
  template: '<img :src="pic" v-on:click="$emit(\'chose\')" />',
  props: ["pic"]
});

Vue.component("portrait", {
  template: '<div class="portrait"> \
          <img class="portrait__full" :src="pic" />\
          <img class="portrait__name" :src="name" />\
          <img :src="icon" class="portrait__represent"> </img>\
          <div class="name-bg"> \
          <div class="name"> \
            <div class="name__display"> \
              <div class="name__icon"></div> \
              <p class="name__text"> Player 1 </p> \
            </div>   \
          </div>\
          </div>\
          </div>',
  props: ["pic", "name", "icon"]
});


var app = new Vue({
  el: "#app",
  data: {
    message: "Hello, world!",
    characters: [
      {id: 0, name: "image/captainfalcon-name.png", thumbnail: "image/captain-thumbnail.png", portrait: "image/captain-portrait.png", pickSound: 'image/pick-cp.wav', icon: "image/icon-cp.png"},
      {id: 1, name: "Bip Brian", thumbnail: "image/brian-thumbnail.jpg", portrait: "image/brian-portrait.jpg"}
    ],
    currentCharacter: [
      {id: 0, name: "?", thumbnail: "", portrait: "?", pickSound: '', icon: ""},
      {id: 0, name: "?", thumbnail: "", portrait: "?", pickSound: '', icon: ""},
      {id: 0, name: "?", thumbnail: "", portrait: "?", pickSound: '', icon: ""},
      {id: 0, name: "?", thumbnail: "", portrait: "?", pickSound: '', icon: ""}
    ]
  },

  methods: {
    addChar: function (char) {
      this.currentCharacter[0].id = char.id;
      this.currentCharacter[0].name = char.name;
      this.currentCharacter[0].thumbnail = char.thumnail;
      this.currentCharacter[0].portrait = char.portrait;
      this.currentCharacter[0].pickSound = char.pickSound;
      this.currentCharacter[0].icon = char.icon;

      var pickAudio = new Audio();
      pickAudio.src = this.currentCharacter[0].pickSound;
      pickAudio.play();
    }
  }
})
