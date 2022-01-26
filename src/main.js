import gsap from "gsap";
import Explode from "./new-explode";
import Open from './opening'

class Main {
  constructor(options) {
      this.options = options;
      this.enterButton = options.button
      this.explode();
  }

  explode() {
    new Explode({
      button: this.enterButton,
    });
  }
}


new Main({
    button: document.querySelector(".home__button"),
})