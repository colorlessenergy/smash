// add event listners for the numbers 1 2 3 4
Vue.config.keyCodes.one = 49;
Vue.config.keyCodes.two = 50;
Vue.config.keyCodes.three = 51;
Vue.config.keyCodes.four = 52;


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
      {id: 0, name: "image/captain-falcon/captainfalcon-name.png", thumbnail: "image/captain-falcon/captain-thumbnail.png", portrait: "image/captain-falcon/captain-portrait.png", pickSound: 'image/captain-falcon/pick-cp.wav', icon: "image/captain-falcon/icon-cp.png",
      skins: ["image/captain-falcon/alt/cp-black.png", "image/captain-falcon/alt/cp-red.png", "image/captain-falcon/alt/cp-white.png", "image/captain-falcon/captain-portrait.png"]},
      {id: 1, name: "image/dk/dk-name.png", thumbnail: "image/dk/dk-thumbnail.png", portrait: "image/dk/dk-portrait.png", pickSound: 'image/dk/dk_select.mp3', icon: "image/dk/dk-icon.png",
      skins: ["image/dk/alt/dk-black.png", "image/dk/alt/dk-pink.png", "image/dk/alt/dk-white.png", "image/dk/dk-portrait.png"]},

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
    index: 0,
    changeSkin: [
      {currentSkin: 0, max: 4},
      {currentSkin: 0, max: 4},
      {currentSkin: 0, max: 4},
      {currentSkin: 0, max: 4}
    ],
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
      this.index = char.id;
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
      var selectChar = document.querySelectorAll(".selectChar");
      if (this.currentDrag === false) {
        // move elements from top layer to bottom
        // initial pick of selectors
        selectChar.forEach(function (ele) {
          console.log(ele)
          ele.style.zIndex = -3;
        });
        this.currentDrag = true;
        this.currentElement = event.currentTarget;
        that.currentElement.style.zIndex = 1;

        console.log(index, event, this.currentElement)
      } else {
        this.currentElement.style.zIndex = -1;
        this.currentDrag = false;
        window.setTimeout(function () {
          that.index = index;
          document.elementFromPoint(that.mousePos.x, that.mousePos.y).click();
          that.currentElement.style.zIndex = 1;
          that.currentElement = false;
          // move elements from bottom layer to top
          // after dropping off the selector
          selectChar.forEach(function (ele) {
            ele.style.zIndex = 1;
          });
        }, 1)
      }
    },

    changeCharSkin: function(index) {
      if (this.changeSkin[index].currentSkin >= this.changeSkin[index].max) {
        this.changeSkin[index].currentSkin = 0;
      }
      this.currentCharacter[index].portrait = this.characters[this.index].skins[this.changeSkin[index].currentSkin];
      this.changeSkin[index].currentSkin++;
    }
  }, mounted() {
    var self = this;
    window.addEventListener('mousemove', function (event) {
      self.mousePos.x = event.clientX;
      self.mousePos.y = event.clientY;
    });

    window.addEventListener('keyup', function (event) {
      switch (event.keyCode) {
        case 49:
        self.changeCharSkin(0);
          break;
        case 50:
        self.changeCharSkin(1);
          break;
        case 51:
        self.changeCharSkin(2);
          break;
        case 52:
        self.changeCharSkin(3);
          break;

      }
    });
  }
})
