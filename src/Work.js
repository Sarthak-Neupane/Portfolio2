import ASScroll from "@ashthornton/asscroll";
import Sketch from "../lib/js/work_webgl";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import workEnter from "../Animations/workEnter";

// import Headline from "../lib/js/workTitleAnim";

export default class Work {
  constructor(options) {
    console.log(options);

    this.container = document;
    console.log(this.container);
    this.sections = [...this.container.querySelectorAll(".img_inner")];
    this.navLines = [...this.container.querySelectorAll(".navLine")];

    this.width = this.container.body.clientWidth;

    this.t1 = gsap.timeline()
    this.t2 = gsap.timeline()
    this.t3 = gsap.timeline()
    this.t4 = gsap.timeline()

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

  static killTimeline(){
    // console.log(this.t1)
    // this.t4.kill(true);
    // this.t3.kill(true);
    // this.t2.kill(true);
    // this.t1.kill(true);
  }

  animateDown() {
    console.log(this.progress);
    return new Promise((resolve) => {
      this.t1.to(".number_inner > h1", {
        transform: "translateY(100%)",
        duration: 0.2,
      });
      this.t1.to(
        ".headline > h1",
        {
          transform: "translateY(100%)",
          duration: 0.2,
          onComplete: () => {
            resolve();
          },
        },
        "-=0.2"
      );
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

    const contentWork = document.querySelector(".content-work").clientWidth;
    const contentWorkInner =
      document.querySelector(".content_inner").clientWidth;

    // console.log(contentWork - contentWorkInner);
    console.log(
      `+=${
        10 * this.container.querySelector(".img_inner").offsetWidth +
        (contentWork - contentWorkInner) * 0.5
      }`
    );
    // console.log(sections);


    this.t3.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: ".work",
        pin: ".work",
        onUpdate: (e) => {
          console.log(e.progress);
          this.progress = e.progress.toFixed(1);
          this.animateLinesMobile(e.progress.toFixed(1));
        },
        scrub: 1,
        snap: {
          snapTo: [0, 0.25, 0.5, 0.75, 0.98],
          duration: 0.5,
          onComplete: (e) => {
            this.animationMobile();
          },
        },
        // base vertical scrolling on how wide the container is so it feels more natural.
        end: `+=${
          15 * this.container.querySelector(".img_inner").offsetWidth
          // (contentWork - contentWorkInner) * 2
        }`,
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
        },
        snap: {
          snapTo: [0.00000009, 0.2, 0.4, 0.6, 0.8],
          duration: 0.5,
          onComplete: (e) => {
            this.animation();
          },
        },
      },
    });
  }

  animateLines(progress) {
    if (progress !== this.previousProgressNavLine) {
      const progNum = +progress;
      if (progNum >= 0 && progNum < 0.2) {
        this.navLines[0].classList.add("active");
        this.navLines.forEach((line, i) => {
          if (i !== 0) {
            line.classList.remove("active");
          }
        });
      }

      if (progNum >= 0.2 && progNum < 0.4) {
        this.navLines[1].classList.add("active");
        this.navLines.forEach((line, i) => {
          if (i !== 1) {
            line.classList.remove("active");
          }
        });
      }

      if (progNum >= 0.4 && progNum < 0.6) {
        this.navLines[2].classList.add("active");
        this.navLines.forEach((line, i) => {
          if (i !== 2) {
            line.classList.remove("active");
          }
        });
      }
      if (progNum >= 0.6 && progNum < 0.8) {
        this.navLines[3].classList.add("active");
        this.navLines.forEach((line, i) => {
          if (i !== 3) {
            line.classList.remove("active");
          }
        });
      }
      if (progNum >= 0.75) {
        this.navLines[4].classList.add("active");
        this.navLines.forEach((line, i) => {
          if (i !== 4) {
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
      if (progNum >= 0 && progNum < 0.15) {
        this.navLines[0].classList.add("active");
        this.navLines.forEach((line, i) => {
          if (i !== 0) {
            line.classList.remove("active");
          }
        });
      }

      if (progNum >= 0.3 && progNum < 0.4) {
        this.navLines[1].classList.add("active");
        this.navLines.forEach((line, i) => {
          if (i !== 1) {
            line.classList.remove("active");
          }
        });
      }

      if (progNum >= 0.5 && progNum < 0.65) {
        this.navLines[2].classList.add("active");
        this.navLines.forEach((line, i) => {
          if (i !== 2) {
            line.classList.remove("active");
          }
        });
      }
      if (progNum >= 0.8 && progNum < 0.9) {
        this.navLines[3].classList.add("active");
        this.navLines.forEach((line, i) => {
          if (i !== 3) {
            line.classList.remove("active");
          }
        });
      }
      if (progNum > 0.9) {
        this.navLines[4].classList.add("active");
        this.navLines.forEach((line, i) => {
          if (i !== 4) {
            line.classList.remove("active");
          }
        });
      }
      this.previousProgressNavLine = progress;
    }
  }

  animation() {
    if (this.progress !== this.previousProgress) {
      this.animateDown().then(() => {
        if (this.progress === "0.0") {
          document.querySelector(".number_inner > h1").style.color =
            this.colors[0];
          document.querySelector(".line_border").style.backgroundColor =
            this.colors[0];
          document.querySelector(".number_inner > h1").innerHTML = "01";
          document.querySelector(".headline > h1").innerHTML = "PROJECT 1";
        }

        if (this.progress === "0.2") {
          document.querySelector(".number_inner > h1").style.color =
            this.colors[1];
          document.querySelector(".line_border").style.backgroundColor =
            this.colors[1];
          document.querySelector(".number_inner > h1").innerHTML = "02";
          document.querySelector(".headline > h1").innerHTML = "PROJECT 2";
        }

        if (this.progress === "0.4") {
          document.querySelector(".number_inner > h1").style.color =
            this.colors[2];
          document.querySelector(".line_border").style.backgroundColor =
            this.colors[2];
          document.querySelector(".number_inner > h1").innerHTML = "03";
          document.querySelector(".headline > h1").innerHTML = "PROJECT 3";
        }
        if (this.progress === "0.6") {
          document.querySelector(".number_inner > h1").style.color =
            this.colors[3];
          document.querySelector(".line_border").style.backgroundColor =
            this.colors[3];
          document.querySelector(".number_inner > h1").innerHTML = "04";
          document.querySelector(".headline > h1").innerHTML = "PROJECT 4";
        }
        if (+this.progress >= 0.75) {
          document.querySelector(".number_inner > h1").style.color =
            this.colors[4];
          document.querySelector(".line_border").style.backgroundColor =
            this.colors[4];
          document.querySelector(".number_inner > h1").innerHTML = "05";
          document.querySelector(".headline > h1").innerHTML = "PROJECT 5";
        }
        this.animateUp();
        this.previousProgress = this.progress;
      });
    }
  }
  animationMobile() {
    if (this.progress !== this.previousProgress) {
      this.animateDown().then(() => {
        if (+this.progress === 0) {
          document.querySelector(".number_inner > h1").style.color =
            this.colors[0];
          document.querySelector(".line_border").style.backgroundColor =
            this.colors[0];
          document.querySelector(".number_inner > h1").innerHTML = "01";
          document.querySelector(".headline > h1").innerHTML = "PROJECT 1";
        }

        if (+this.progress === 0.3) {
          document.querySelector(".number_inner > h1").style.color =
            this.colors[1];
          document.querySelector(".line_border").style.backgroundColor =
            this.colors[1];
          document.querySelector(".number_inner > h1").innerHTML = "02";
          document.querySelector(".headline > h1").innerHTML = "PROJECT 2";
        }

        if (+this.progress === 0.5) {
          document.querySelector(".number_inner > h1").style.color =
            this.colors[2];
          document.querySelector(".line_border").style.backgroundColor =
            this.colors[2];
          document.querySelector(".number_inner > h1").innerHTML = "03";
          document.querySelector(".headline > h1").innerHTML = "PROJECT 3";
        }
        if (+this.progress === 0.8) {
          document.querySelector(".number_inner > h1").style.color =
            this.colors[3];
          document.querySelector(".line_border").style.backgroundColor =
            this.colors[3];
          document.querySelector(".number_inner > h1").innerHTML = "04";
          document.querySelector(".headline > h1").innerHTML = "PROJECT 4";
        }
        if (+this.progress >= 0.97) {
          document.querySelector(".number_inner > h1").style.color =
            this.colors[4];
          document.querySelector(".line_border").style.backgroundColor =
            this.colors[4];
          document.querySelector(".number_inner > h1").innerHTML = "05";
          document.querySelector(".headline > h1").innerHTML = "PROJECT 5";
        }
        this.animateUp();
        this.previousProgress = this.progress;
      });
    }
  }
}
