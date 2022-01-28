import gsap from "gsap";
import barba from "@barba/core";

import Home from "./Home";
import About from "./About";
import microAnimHome from "./microAnimHome";

import homeLeave from "../Animations/homeLeave";
import aboutEnter from "../Animations/aboutEnter";
import aboutLeave from "../Animations/aboutLeave";

class Main {
  constructor() {
    this.init();
    // this.homeAnim();
    // microAnimHome();

    console.log(window.location.pathname);

    if (window.location.pathname === "/index.html" || window.location.pathname === "/") {
      this.homeAnim();
      microAnimHome();
    }

    if (window.location.pathname === "/about.html") {
      this.aboutAnim(true);
    }
  }

  init() {
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
            console.log(t.current)
            return new Promise((resolve) => {
              homeLeave(this.home, t.current.container).then(() => {
                resolve()
              })
            });
          },
          enter: (t) => {
            this.aboutAnim(false);
            return new Promise((resolve) => {
              aboutEnter(t.next.container).then(() => {
                resolve()
              })
            });
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
            return new Promise((resolve)=>{
              aboutLeave(t.current.container).then(()=>{
                resolve()
              })
            })
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
    this.home = new Home({
      button: document.querySelector(".home__button"),
    });
  }

  aboutAnim(fr) {
    new About({
      dom: document.querySelector("#canvasContainer"),
      forceReload: fr
    });
  }
}

new Main();
