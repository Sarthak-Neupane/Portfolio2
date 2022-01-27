import gsap from "gsap";
import barba from "@barba/core";

import Home from "./Home";
import About from "./About";
import microAnimHome from "./microAnimHome";

import homeLeave from "../Animations/homeLeave";

class Main {
  constructor() {
    this.init();
    // this.homeAnim();
    // microAnimHome();

    console.log(window.location.pathname);

    if (window.location.pathname === "/index.html") {
      this.homeAnim();
      microAnimHome();
    }

    if (window.location.pathname === "/about.html") {
      this.aboutAnim();
    }
  }

  init() {
    console.log("hello");
    barba.init({
      transitions: [
        {
          from: {
            namespace: ["home"],
          },
          to: {
            namespace: ["about"],
          },
          leave: (t) => {
            console.log(t);
            homeLeave(this.homeAnim());
          },
          enter: (t) => {
            this.aboutAnim();
          },
        },
        {
          from: {
            namespace: ["about"],
          },
          to: {
            namespace: ["home"],
          },
          leave: (t) => {
            console.log(t);
          },
          enter: (t) => {
            this.homeAnim();
            microAnimHome();
          },
        },
      ],
    });
  }

  homeAnim() {
    return new Home({
      button: document.querySelector(".home__button"),
    });
  }

  aboutAnim(elem) {
    new About({
      dom: elem || document.querySelector("#canvasContainer"),
    });
  }
}

new Main();
