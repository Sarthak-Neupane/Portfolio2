import Sketch from "../lib/js/ico";
import gsap from "gsap";

const sign = (n) => (n === 0 ? 1 : n / Math.abs(n));

export default class HOME {
  constructor(options) {
    this.enterCtrl = options.button;
    this.fr = options.forceReload;


    this.isOpen = false;

    this.init();
    this.mouseEvent();
    this.draw();
    this.enterCtrl.addEventListener(
      "mouseenter",
      this.mouseEntering.bind(this)
    );
    this.enterCtrl.addEventListener("mouseleave", this.mouseLeaving.bind(this));

    if (this.fr) {
      this.enterCtrl.addEventListener("click", this.clickBtn.bind(this));
    } else {
      this.clickBtn();
    }
  }

  init() {
    this.animation = new Sketch("container", {
      surface: "EF572D",
      inside: "e8e8e8",
      background: "151616",
      onLoad: () => {
        setTimeout(()=>{
          gsap.to('.loadingContainer', {
            opacity: 0,
            pointerEvents: 'none',
          })
        }, 300)
      },
    });
  }
  mouseEvent() {
    (this.targetMouseX = 0),
      (this.mouseX = 0),
      (this.targetMouseY = 0),
      (this.mouseY = 0),
      (this.ta = 0),
      (this.taY = 0);

    document.addEventListener("mousemove", (e) => {
      this.targetMouseX =
        (2 * (e.clientX - this.animation.width / 2)) / this.animation.width;
      this.targetMouseY =
        (2 * (e.clientY - this.animation.height / 2)) / this.animation.height;
    });
    document.addEventListener("touchmove", (e) => {
      this.targetMouseX = (e.touches[0].clientX / this.animation.width) * 2 - 1;
      this.targetMouseY =
        (e.touches[0].clientY / this.animation.height) * 2 - 1;
    });
  }

  draw() {
    if (this.animation) {
      this.mouseX += (this.targetMouseX - this.mouseX) * 0.05;
      this.mouseY += (this.targetMouseY - this.mouseY) * 0.05;
      this.ta = Math.abs(this.mouseX);
      this.taY = Math.abs(this.mouseY);
      this.animation.scene.rotation.x =
        Math.PI / 2 - this.taY * (2 - this.taY) * Math.PI * sign(this.mouseY);
      this.animation.scene.rotation.y =
        Math.PI / 2 - this.ta * (2 - this.ta) * Math.PI * sign(this.mouseX);
      this.animation.scene.rotation.z =
        Math.PI / 2 - this.ta * (2 - this.ta) * Math.PI * sign(this.mouseX);
    }
    window.requestAnimationFrame(this.draw.bind(this));
  }

  clickBtn() {
    this.isOpen = true;

    this.timeline = new gsap.timeline();
    this.enterCtrl.style.display = "none";
    this.timeline
      .to(
        this.animation.camera.position,
        {
          duration: 0.5,
          z: 10,
        },
        "-=.3"
      )
      .to(this.animation.settings, {
        progress: 2,
        duration: 4,
        ease: "expo.out",
      })
      .to(
        ".home__title",
        {
          scale: 1,
          opacity: 1,
          stagger: {
            each: 0.05,
          },
        },
        "-=3.5"
      )
      .to(
        document.querySelectorAll(".after_title_anim"),
        {
          opacity: 1,
        },
        "-=3.5"
      )
      .to(
        document.querySelectorAll(".social__links"),
        {
          y: 0,
        },
        "-=3.5"
      );
  }

  mouseEntering() {
    if (this.isOpen) return;
    new gsap.timeline().to(
      this.animation.camera.position,
      {
        duration: 1,
        z: 5.5,
        ease: "expo.out",
      },
      0
    );
  }

  mouseLeaving() {
    if (this.isOpen) return;
    new gsap.timeline().to(
      this.animation.camera.position,
      {
        duration: 1,
        z: 7,
        ease: "expo.out",
      },
      0
    );
  }
}
