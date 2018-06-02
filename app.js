Vue.component("thumbnail", {
  template: '<img :src="pic" v-on:click="$emit(\'chose\')" v-on:mouseenter="$emit(\'picking\')" />',
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

Vue.component("select-char", {
  template: '<img v-on:click="$emit(\'chose\', $event)" v-on:mousemove="$emit(\'follow\', $event)" :src="pick" />',
  props: ["pick"]
})


var app = new Vue({
  el: "#app",
  data: {
    message: "Hello, world!",
    characters: [
      {id: 0, name: "image/captain-falcon/captainfalcon-name.png", thumbnail: "image/captain-falcon/captain-thumbnail.png", portrait: "image/captain-falcon/captain-portrait.png", pickSound: 'image/captain-falcon/pick-cp.wav', icon: "image/captain-falcon/icon-cp.png"},
      {id: 1, name: "image/dk/dk-name.png", thumbnail: "image/dk/dk-thumbnail.png", portrait: "image/dk/dk-portrait.png", pickSound: 'image/dk/dk_select.mp3', icon: "image/dk/dk-icon.png"},

    ],
    currentCharacter: [
      {id: 0, name: "?", thumbnail: "image/question-mark/question-mark.png", portrait: "image/question-mark/question-mark.png", pickSound: '', icon: "image/question-mark/question-mark.png", color: "lightblue"},
      {id: 1, name: "?", thumbnail: "image/question-mark/question-mark.png", portrait: "image/question-mark/question-mark.png", pickSound: '', icon: "image/question-mark/question-mark.png", color: "red"},
      {id: 2, name: "?", thumbnail: "image/question-mark/question-mark.png", portrait: "image/question-mark/question-mark.png", pickSound: '', icon: "image/question-mark/question-mark.png", color: "green"},
      {id: 3, name: "?", thumbnail: "image/question-mark/question-mark.png", portrait: "image/question-mark/question-mark.png", pickSound: '', icon: "image/question-mark/question-mark.png", color: "blue"}
    ],
    select: [
      {id: 0, src: 'image/cursor/p1.png', active: false},
      {id: 1, src: 'image/cursor/p2.png', active: false},
      {id: 2, src: 'image/cursor/p3.png', active: false},
      {id: 3, src: 'image/cursor/p4.png', active: false}
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
    },

    hoverCharacter: function (char, index){
      this.currentCharacter[0].id = char.id;
      this.currentCharacter[0].name = char.name;
      this.currentCharacter[0].thumbnail = char.thumnail;
      this.currentCharacter[0].portrait = char.portrait;
      this.currentCharacter[0].icon = char.icon;
    },

    pickCharacter: function (index, event) {
      var el = event.currentTarget;
      this.move = function(e) {
        // console.log(el, e)
        el.style.left = (e.clientX - 30) + "px";
        el.style.top = (e.clientY - 30) + "px";
      }
      var move = this.move;
      var select = this.select;
      this.select[index].active = true;
      if (this.select[index].active) {
        window.addEventListener("mousemove", function (e) {
          move(e)
        }, false);
        el.addEventListener("click", function (ev){
          ev.stopPropagation();
          console.log("clicked")
          select[index].active = false;
          window.removeEventListener("mousemove", function (e) {
            move(e)
          }, false);
        });
      }
    }
  }
})
