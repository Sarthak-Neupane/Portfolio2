import imagesLoaded from "imagesloaded";
import Sketch from "../lib/js/work_webgl";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import workEnter from "../Animations/workEnter";

// import Headline from "../lib/js/workTitleAnim";

export default class Work {
  constructor(options) {
    console.log(options);
    this.container = options.document || document;
    this.sections = [...this.container.querySelectorAll(".img_inner")];

    this.sketch = new Sketch({
      dom: options.dom,
    });

    this.sketch.onload = () => {
      setTimeout(() => {
        workEnter(this.container);
      }, 50);
    };

    
    this.navLines = [...this.container.querySelectorAll(".navLine")];
    
    console.log(this.navLines);
    
    this.init();
    this.progress = 0.0;
    this.previousProgress = 0.0;
    this.previousProgressNavLine = null;
  }

  animateDown() {
    const t1 = gsap.timeline();
    return new Promise((resolve) => {
      t1.to(".number_inner > h1", {
        transform: "translateY(100%)",
        duration: 0.2,
      });
      t1.to(
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
    const t2 = new gsap.timeline();
    t2.to(document.querySelector(".number_inner > h1"), {
      transform: "translateY(0)",
      duration: 0.2,
    });
    t2.to(
      document.querySelector(".headline > h1"),
      {
        transform: "translateY(0)",
        duration: 0.2,
      },
      "-=0.2"
    );
  }

  init() {
    gsap.to(this.sections, {
      scrollTrigger: {
        trigger: ".content_inner",
        pin: ".text_content",
        // pinSpacing: false,
        // start: "top top",
        onUpdate: (e) => {
          console.log(e.progress);
          this.progress = e.progress.toFixed(1);
          // console.log(this.progress);
          this.animateLines(e.progress.toFixed(1));
        },
        snap: {
          snapTo: [0.01, 0.2, 0.4, 0.6, 0.8],
          duration: 0.5,
          onComplete: (e) => {
            // console.log(e);
            this.animation();
          },
        },
      },
    });
  }

  animateLines(progress) {
    // console.log(progress)
    if (progress !== this.previousProgressNavLine) {
      const progNum = +progress;
      console.log(progNum);
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
      if (progNum === 0.8) {
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
          document.querySelector(".number_inner > h1").innerHTML = "01";
          document.querySelector(".headline > h1").innerHTML = "QUIZZY";
        }

        if (this.progress === "0.2") {
          document.querySelector(".number_inner > h1").innerHTML = "02";
          document.querySelector(".headline > h1").innerHTML = "NETFLIX";
        }

        if (this.progress === "0.4") {
          document.querySelector(".number_inner > h1").innerHTML = "03";
          document.querySelector(".headline > h1").innerHTML = "LOREM";
        }
        if (this.progress === "0.6") {
          document.querySelector(".number_inner > h1").innerHTML = "04";
          document.querySelector(".headline > h1").innerHTML = "IPSUM";
        }
        if (this.progress === "0.8") {
          document.querySelector(".number_inner > h1").innerHTML = "05";
          document.querySelector(".headline > h1").innerHTML = "PROJECT";
        }
        this.animateUp();
        this.previousProgress = this.progress;
      });
    }
    // console.log(this.progress, this.previousProgress);
  }
}
