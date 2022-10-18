import gsap from "gsap";
import barba from "@barba/core";

import Home from "./Home";
import About from "./About";
import Work from "./Work";

import microAnimHome from "./microAnimHome";

import homeLeave from "../Animations/homeLeave";
import aboutEnter from "../Animations/aboutEnter";
import aboutLeave from "../Animations/aboutLeave";
import workLeave from "../Animations/workLeave";

class Main {
  constructor() {
    this.width = window.innerWidth;

    if (this.width > 1024) {
      this.pageLinkAnim(document);
    }

    this.init();


    if (
      window.location.pathname == "/index.html" ||
      window.location.pathname === "/"
    ) {

      this.homeAnim(true);
      microAnimHome();
    }

    if (window.location.pathname == "/about.html") {

      this.aboutAnim(true);
    }

    if (window.location.pathname == "/work.html") {
      this.workAnim(true);
    }
  }

  pageLinkAnim(d) {
    const pageLinks = [...d.querySelectorAll(".page__links")];


    pageLinks.forEach((link) => {
      link.addEventListener("mouseenter", (e) => {
        console.dir(e.target.firstElementChild.firstElementChild);
        gsap.to(e.target.firstElementChild.firstElementChild, {
          duration: 0.2,
          scaleX: 1,
        });
      });
      link.addEventListener("mouseleave", (e) => {
        gsap.to(e.target.firstElementChild.firstElementChild, {
          duration: 0.2,
          scaleX: 0,
        });
      });
    });
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
            return new Promise((resolve) => {
              homeLeave(this.home, t.current.container).then(() => {
                resolve();
              });
            });
          },
          enter: (t) => {
            if (this.width > 1024) {
              this.pageLinkAnim(t.next.container);
            }

            this.aboutAnim(false);
            return new Promise((resolve) => {
              aboutEnter(t.next.container).then(() => {
                resolve();
              });
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
            return new Promise((resolve) => {
              aboutLeave(t.current.container).then(() => {
                resolve();
              });
            });
          },
          enter: (t) => {
            if (this.width > 1024) {
              this.pageLinkAnim(t.next.container);
            }
            this.homeAnim(false);
            microAnimHome();
          },
        },
        {
          from: {
            namespace: ["home"],
          },
          to: {
            namespace: ["work"],
          },
          leave: (t) => {
            return new Promise((resolve) => {
              homeLeave(this.home, t.current.container).then(() => {
                resolve();
              });
            });
          },
          enter: (t) => {
            if (this.width > 1024) {
              this.pageLinkAnim(t.next.container);
            }
            this.workAnim(false);
          },
        },
        {
          from: {
            namespace: ["work"],
          },
          to: {
            namespace: ["home"],
          },
          leave: (t) => {
            return new Promise((resolve) => {
              workLeave(t.current.container, this.work).then(() => {
                resolve();
              });
            });
          },
          enter: (t) => {
            if (this.width > 1024) {
              this.pageLinkAnim(t.next.container);
            }
            this.homeAnim(false);
            microAnimHome();
          },
        },

        {
          from: {
            namespace: ["work"],
          },
          to: {
            namespace: ["about"],
          },
          leave: (t) => {
            return new Promise((resolve) => {
              workLeave(t.current.container, this.work).then(() => {
                resolve();
              });
            });
          },
          enter: (t) => {
            if (this.width > 1024) {
              this.pageLinkAnim(t.next.container);
            }
            t.current.container.remove();
            this.aboutAnim(false);
            return new Promise((resolve) => {
              aboutEnter(t.next.container).then(() => {
                resolve();
              });
            });
          },
        },
        {
          from: {
            namespace: ["about"],
          },
          to: {
            namespace: ["work"],
          },
          leave: (t) => {
            return new Promise((resolve) => {
              aboutLeave(t.current.container).then(() => {
                resolve();
              });
            });
          },
          enter: (t) => {
            t.current.container.remove();
            if (this.width > 1024) {
              this.pageLinkAnim(t.next.container);
            }
            this.workAnim(false);
          },
        },
      ],
    });
  }

  homeAnim(fr) {
    this.home = new Home({
      button: document.querySelector(".home__button"),
      forceReload: fr,
    });
  }

  aboutAnim(fr) {
    new About({
      dom: document.querySelector("#canvasContainer"),
      forceReload: fr,
    });
  }

  workAnim(fr) {
    this.work = new Work({
      dom: document.querySelector("#container-work"),
      forceReload: fr,
      document: document,
    });
  }
}

new Main();
