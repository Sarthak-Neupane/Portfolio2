import Sketch from "../lib/js/work_webgl";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import workEnter from "../Animations/workEnter";

export default class Work {
  constructor(options) {
    this.container = document;
    this.sections = [...this.container.querySelectorAll(".img_inner")];
    this.navLines = [...this.container.querySelectorAll(".navLine")];

    this.width = this.container.body.clientWidth;

    this.t1 = gsap.timeline();
    this.t2 = gsap.timeline();
    this.t3 = gsap.timeline();
    this.t4 = gsap.timeline();

    console.log(options.dom)

    if (this.width > 1000) {
      this.sketch = new Sketch({
        dom: options.dom,
      });

      this.sketch.onload = () => {
        setTimeout(() => {
          workEnter(this.container);
        }, 50);
      };
      this.init();
    } else {
      workEnter(this.container).then(() => {
        this.mobileInit();
      });
    }

    this.colors = ["#5121b0", "#278d25", "#a920ae", "#c12e20", "#204dac"];

    this.progress = 0.0;
    this.previousProgress = 0.0;
    this.previousProgressNavLine = null;
  }

  animateDown() {
    return new Promise((resolve) => {
      // this.t1.to(".number_inner > h1", {
      //   transform: "translateY(100%)",
      //   duration: 0.2,
      // });
      // this.t1.to(
      //   ".headline > h1",
      //   {
      //     transform: "translateY(100%)",
      //     duration: 0.2,
      //     onComplete: () => {
      //       resolve();
      //     },
      //   },
      //   "-=0.2"
      // );
      resolve();
    });
  }

  animateUp() {
    this.t2.to(document.querySelector(".number_inner > h1"), {
      transform: "translateY(0)",
      duration: 0.2,
    });
    this.t2.to(
      document.querySelector(".headline > h1"),
      {
        transform: "translateY(0)",
        duration: 0.2,
      },
      "-=0.2"
    );
  }

  mobileInit() {
    const sections = gsap.utils.toArray(".img_inner");
    console.log(sections)

    const contentWork = document.querySelector(".content-work").clientWidth;
    const contentWorkInner =
      document.querySelector(".content_inner").clientWidth;

    this.t3.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: ".work",
        pin: ".work",
        onUpdate: (e) => {
          this.progress = e.progress.toFixed(1);
          // console.log(e)
          this.animateLinesMobile(e.progress.toFixed(1));
          this.animationMobile();
        },
        scrub: 1,
        snap: {
          snapTo: 1/2,
          duration: 0.5,
          onComplete: (e) => {
            console.log(e)
            // this.animationMobile();
          },
        },
      },
    });
  }

  init() {
    this.t4.to(this.sections, {
      scrollTrigger: {
        trigger: ".content_inner",
        pin: ".text_content",
        onUpdate: (e) => {
          this.progress = e.progress.toFixed(1);
          this.animateLines(e.progress.toFixed(1));
          this.animation(e.progress.toFixed(1));
        },
        snap: {
          // snapTo: [0.00000009, 0.2, 0.4, 0.6, 0.8],
          // duration: 0.5,
          snapTo: 1/3,
          duration: 0.5,
        },
      },
    });
  }

  animateLines(progress) {
    if (progress !== this.previousProgressNavLine) {
      const progNum = +progress;
      if (progNum >= 0 && progNum < 0.3) {
        this.navLines[0].classList.add("active");
        this.navLines.forEach((line, i) => {
          if (i !== 0) {
            line.classList.remove("active");
          }
        });
      }

      if (progNum >= 0.3 && progNum < 0.6) {
        this.navLines[1].classList.add("active");
        this.navLines.forEach((line, i) => {
          if (i !== 1) {
            line.classList.remove("active");
          }
        });
      }

      if (progNum >= 0.6) {
        this.navLines[2].classList.add("active");
        this.navLines.forEach((line, i) => {
          if (i !== 2) {
            line.classList.remove("active");
          }
        });
      }
      this.previousProgressNavLine = progress;
    }
  }

  animateLinesMobile(progress) {
    if (progress !== this.previousProgressNavLine) {
      const progNum = +progress;
      if (progNum >= 0 && progNum < 0.3) {
        this.navLines[0].classList.add("active");
        this.navLines.forEach((line, i) => {
          if (i !== 0) {
            line.classList.remove("active");
          }
        });
      }

      if (progNum >= 0.3 && progNum < 0.6) {
        this.navLines[1].classList.add("active");
        this.navLines.forEach((line, i) => {
          if (i !== 1) {
            line.classList.remove("active");
          }
        });
      }

      if (progNum >= 0.65) {
        this.navLines[2].classList.add("active");
        this.navLines.forEach((line, i) => {
          if (i !== 2) {
            line.classList.remove("active");
          }
        });
      }
      this.previousProgressNavLine = progress;
    }
  }

  animation() {
    if (this.progress !== this.previousProgress) {
      console.log(this.progress)
      this.animateDown().then(() => {
        if (this.progress === "0.0") {
          document.querySelector(".number_inner > h1").style.color =
            this.colors[0];
          document.querySelector(".line_border").style.backgroundColor =
            this.colors[0];
          document.querySelector(".number_inner > h1").innerHTML = "01";
          document.querySelector(".headline > h1").innerHTML = "CHILLFLIX";
          document.querySelector(
            ".desc > p"
          ).innerHTML = `A Netflix clone with features like viewing all movies and TV
          shows. Other functionalities include aunthentication (using
          Fireabse), Search, Adding and deleting movie/tv to/from 'My
          List' (Powered by Firebase/Firestore)`;
        }

        if (this.progress === "0.3") {
          document.querySelector(".number_inner > h1").style.color =
            this.colors[1];
          document.querySelector(".line_border").style.backgroundColor =
            this.colors[1];
          document.querySelector(".number_inner > h1").innerHTML = "02";
          document.querySelector(".headline > h1").innerHTML = "GOALIE";
          document.querySelector(
            ".desc > p"
          ).innerHTML = `An Instagram clone with features includeing aunthentication (Firebase), Adding a post, commenting on the added post, following some other user, keeping track of followers and much more`;
        }

        if (this.progress >= "0.6") {
          document.querySelector(".number_inner > h1").style.color =
            this.colors[2];
          document.querySelector(".line_border").style.backgroundColor =
            this.colors[2];
          document.querySelector(".number_inner > h1").innerHTML = "03";
          document.querySelector(".headline > h1").innerHTML = "Community Nepal";
          document.querySelector(
            ".desc > p"
          ).innerHTML = `A platform to host and apply for community events. Features include: aunthentication, hosting an event with sufficient details, applying for the event with automatic sending of the user profile, ability to cancel an application or the event, and a custom inbuilt calendar to view upcoming and past events.`;
        }
        this.animateUp();
        this.previousProgress = this.progress;
      });
    }
  }
  animationMobile() {
    console.log(this.progress)
    if (this.progress !== this.previousProgress) {
      this.animateDown().then(() => {
        console.log(+this.progress)
        if (+this.progress === 0.0) {
          document.querySelector(".number_inner > h1").style.color =
            this.colors[0];
          document.querySelector(".line_border").style.backgroundColor =
            this.colors[0];
          document.querySelector(".number_inner > h1").innerHTML = "01";
          document.querySelector(".headline > h1").innerHTML = "CHILLFLIX";
          document.querySelector(
            ".desc > p"
          ).innerHTML = `A Netflix clone with features like viewing all movies and TV
          shows. Other functionalities include aunthentication (using
          Fireabse), Search, Adding and deleting movie/tv to/from 'My
          List' (Powered by Firebase/Firestore)`;
        }

        if (+this.progress === 0.5) {
          document.querySelector(".number_inner > h1").style.color =
            this.colors[1];
          document.querySelector(".line_border").style.backgroundColor =
            this.colors[1];
          document.querySelector(".number_inner > h1").innerHTML = "02";
          document.querySelector(".headline > h1").innerHTML = "GOALIE";
          document.querySelector(
            ".desc > p"
          ).innerHTML = `An Instagram clone with features includeing aunthentication (Firebase), Adding a post, commenting on the added post, following some other user, keeping track of followers and much more`;
        }

        if (+this.progress > 0.65) {
          document.querySelector(".number_inner > h1").style.color =
            this.colors[2];
          document.querySelector(".line_border").style.backgroundColor =
            this.colors[2];
          document.querySelector(".number_inner > h1").innerHTML = "03";
          document.querySelector(".headline > h1").innerHTML = "Community Nepal";
          document.querySelector(
            ".desc > p"
          ).innerHTML = `A platform to host and apply for community events. Features include: aunthentication, hosting an event with sufficient details, applying for the event with automatic sending of the user profile, ability to cancel an application or the event, and a custom inbuilt calendar to view upcoming and past events.`;
        }
        this.animateUp();
        this.previousProgress = this.progress;
      });
    }
  }
}
