import gsap from "gsap";
import Explode from "./new-explode";
import microAnimHome from "./microAnimHome";

class Main {
  constructor(options) {
    this.options = options;
    this.enterButton = options.button;
    this.explode();
    microAnimHome();
  }

  explode() {
    new Explode({
      button: this.enterButton,
    });
  }
}

new Main({
  button: document.querySelector(".home__button"),
});
