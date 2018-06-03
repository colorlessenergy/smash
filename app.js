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

Vue.component("select-char", {
  template: '<img v-on:click="$emit(\'chose\', $event)" v-on:mousemove="$emit(\'hi\')" :src="pick" />',
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
    ],
    currentDrag: false,
    currentElement: undefined,
    mousePos: {
      x: 0,
      y: 0
    },
    index: 0
  },

  methods: {
    addChar: function (char) {
      this.currentCharacter[this.index].id = char.id;
      this.currentCharacter[this.index].name = char.name;
      this.currentCharacter[this.index].thumbnail = char.thumnail;
      this.currentCharacter[this.index].portrait = char.portrait;
      this.currentCharacter[this.index].pickSound = char.pickSound;
      this.currentCharacter[this.index].icon = char.icon;

      var pickAudio = new Audio();
      pickAudio.src = this.currentCharacter[this.index].pickSound;
      pickAudio.play();
    },

    hoverCharacter: function (char, index){
      this.currentCharacter[0].id = char.id;
      this.currentCharacter[0].name = char.name;
      this.currentCharacter[0].thumbnail = char.thumnail;
      this.currentCharacter[0].portrait = char.portrait;
      this.currentCharacter[0].icon = char.icon;
    },

    move: function(e) {
      console.log(this.currentElement);
      if (this.currentElement) {
        this.currentElement.style.left = (this.mousePos.x - 30) + "px";
        this.currentElement.style.top = (this.mousePos.y - 30) + "px";
      }
      // if (this.currentDrag) {
      //   this.currentElement.currentTarget.style.left = (this.mousePos.x.clientX - 30) + "px";
      // }
    },

    pickCharacter: function (index, event) {
      // alert(index, event)
      var that = this;
      console.log(event, index)
      if (this.currentDrag === false) {
        this.currentDrag = true;
        this.currentElement = event.currentTarget;
        console.log(index, event, this.currentElement)
      } else {
        this.currentElement.style.zIndex = -1;
        this.currentDrag = false;
        window.setTimeout(function () {
          // console.log(that.mouseP)
          that.index = index;
          document.elementFromPoint(that.mousePos.x, that.mousePos.y).click();
          that.currentElement.style.zIndex = 1;
          that.currentElement = false;
        }, 1)
      }
      // var el = event.currentTarget;

      // var move = this.move;
      // var select = this.select;
      // this.select[index].active = true;
      // if (this.select[index].active) {
      //   window.addEventListener("mousemove", function (e) {
      //     move(e)
      //   }, false);
        // document.querySelector(".thumbnail__display").addEventListener("click", function (ev){
        //   ev.stopPropagation();
        //   select[index].active = false;
        //   window.removeEventListener("mousemove", function (e) {
        //     move(e)
        //   }, false);
        // });
      // }
    }
  }, mounted() {
    var self = this;
    window.addEventListener('mousemove', function (event) {
      self.mousePos.x = event.clientX;
      self.mousePos.y = event.clientY;

    });
  }
})
