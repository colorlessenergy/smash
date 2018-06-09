Vue.component("thumbnail", {
  template: '<img :src="pic" v-on:click="$emit(\'chose\')" v-on:mouseenter="$emit(\'enter\')" />',
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
  template: '<img v-on:click="$emit(\'chose\')" :src="pick" />',
  props: ["pick"]
})


var app = new Vue({
  el: "#app",
  data: {
    characters: [
      {id: 0, name: "image/captain-falcon/captainfalcon-name.png", thumbnail: "image/captain-falcon/captain-thumbnail.png", portrait: "image/captain-falcon/captain-portrait.png", pickSound: 'image/captain-falcon/pick-cp.wav', icon: "image/captain-falcon/icon-cp.png",
      skins: ["image/captain-falcon/alt/cp-black.png", "image/captain-falcon/alt/cp-red.png", "image/captain-falcon/alt/cp-white.png", "image/captain-falcon/captain-portrait.png"]},
      {id: 1, name: "image/dk/dk-name.png", thumbnail: "image/dk/dk-thumbnail.png", portrait: "image/dk/dk-portrait.png", pickSound: 'image/dk/dk_select.mp3', icon: "image/dk/dk-icon.png",
      skins: ["image/dk/alt/dk-black.png", "image/dk/alt/dk-pink.png", "image/dk/alt/dk-white.png", "image/dk/dk-portrait.png"]},

    ],
    currentCharacter: [
      {id: 0, name: "?", thumbnail: "image/question-mark/question-mark.png", portrait: "image/question-mark/question-mark.png", pickSound: '', icon: "image/question-mark/question-mark.png", color: "lightblue", skins: undefined},
      {id: 1, name: "?", thumbnail: "image/question-mark/question-mark.png", portrait: "image/question-mark/question-mark.png", pickSound: '', icon: "image/question-mark/question-mark.png", color: "red", skins: undefined},
      {id: 2, name: "?", thumbnail: "image/question-mark/question-mark.png", portrait: "image/question-mark/question-mark.png", pickSound: '', icon: "image/question-mark/question-mark.png", color: "green", skins: undefined},
      {id: 3, name: "?", thumbnail: "image/question-mark/question-mark.png", portrait: "image/question-mark/question-mark.png", pickSound: '', icon: "image/question-mark/question-mark.png", color: "blue", skins: undefined}
    ],
    select: [
      {id: 0, src: 'image/cursor/p1.png', active: false, color: 'lightblue'},
      {id: 1, src: 'image/cursor/p2.png', active: false, color: 'red'},
      {id: 2, src: 'image/cursor/p3.png', active: false, color: 'green'},
      {id: 3, src: 'image/cursor/p4.png', active: false, color: 'blue'}
    ],
    currentDrag: true,
    mousePos: {
      x: 0,
      y: 0
    },
    charSelectIndex: 0,
    changeSkin: [
      {currentSkin: 0, max: 4},
      {currentSkin: 0, max: 4},
      {currentSkin: 0, max: 4},
      {currentSkin: 0, max: 4}
    ],
  },

  methods: {
    addChar: function (char) {
      if (this.currentDrag === false) {
        this.currentCharacter[this.charSelectIndex].name = char.name;
        this.currentCharacter[this.charSelectIndex].thumbnail = char.thumbnail;
        // this.currentCharacter[this.charSelectIndex].portrait = char.portrait;
        this.currentCharacter[this.charSelectIndex].pickSound = char.pickSound;
        this.currentCharacter[this.charSelectIndex].icon = char.icon;
        this.currentCharacter[this.charSelectIndex].skins = char.skins;
        var pickAudio = new Audio();
        pickAudio.src = this.currentCharacter[this.charSelectIndex].pickSound;
        pickAudio.play();

        var selectChar = document.querySelectorAll(".selectChar");

        document.querySelector("body").classList.toggle(this.select[this.charSelectIndex].color)
        selectChar[this.charSelectIndex].style.display = 'block';
        selectChar[this.charSelectIndex].style.left = (this.mousePos.x) + "px";
        selectChar[this.charSelectIndex].style.top = (this.mousePos.y) + "px";
        this.currentDrag = true;
      }
    },

    pickCharacter: function (index) {
      var selectChar = document.querySelectorAll(".selectChar");
      if (this.currentDrag) {
        this.charSelectIndex = index;
        this.currentDrag = false;
        console.log(this.currentDrag)
        document.querySelector("body").classList.toggle(this.select[index].color)
        selectChar[index].style.display = 'none';
      }
    },

    changeCharSkin: function(index) {
      this.changeSkin[index].currentSkin++;
      if (this.changeSkin[index].currentSkin >= this.changeSkin[index].max) {
        this.changeSkin[index].currentSkin = 0;
      }
      this.currentCharacter[index].portrait = this.currentCharacter[index].skins[this.changeSkin[index].currentSkin];
    },

    enter: function (char){
      if (this.currentDrag === false) {
        this.currentCharacter[this.charSelectIndex].name = char.name;
        this.currentCharacter[this.charSelectIndex].thumbnail = char.thumbnail;
        this.currentCharacter[this.charSelectIndex].portrait = char.portrait;
        this.currentCharacter[this.charSelectIndex].pickSound = char.pickSound;
        this.currentCharacter[this.charSelectIndex].icon = char.icon;
        this.currentCharacter[this.charSelectIndex].skins = char.skins;
      }
    }
  },
  mounted() {
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
