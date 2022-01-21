import Sketch from "../lib/js/brain";
import gsap from "gsap";

const sign = (n) => (n === 0 ? 1 : n / Math.abs(n));

export default class Explode {
  constructor(options) {
    this.enterCtrl = options.button;
    this.isOpen = false;

    this.init()
    this.mouseEvent()
    this.draw()
    this.enterCtrl.addEventListener("click", this.clickBtn.bind(this))
    this.enterCtrl.addEventListener("mouseenter", this.mouseEntering.bind(this))
    this.enterCtrl.addEventListener("mouseleave", this.mouseLeaving.bind(this))
  }

  init() {
    this.animation = new Sketch("container", {
      surface: "ffe2e2",
      inside: "f56969",
      background: "151516",
      onLoad: () => {
        document.body.classList.remove("loading");
      },
    });
    console.log(this.animation)
    this.animation.camera.position.z = 500;
  }

  mouseEvent() {
    (this.targetMouseX = 0), (this.mouseX = 0), (this.ta = 0);
    document.addEventListener("mousemove", (e) => {
      this.targetMouseX =
        (2 * (e.clientX - this.animation.width / 2)) / this.animation.width;
    });
    document.addEventListener("touchmove", (e) => {
      this.targetMouseX = (e.touches[0].clientX / this.animation.width) * 2 - 1;
    });
  }

  draw() {
    if (this.animation) {
      this.mouseX += (this.targetMouseX - this.mouseX) * 0.05;
      this.ta = Math.abs(this.mouseX);
      this.animation.scene.rotation.y =
        0.2 * -this.ta * (2 - this.ta) * Math.PI * sign(this.mouseX);
      this.animation.scene.rotation.z =
        0.2 * -this.ta * (2 - this.ta) * Math.PI * sign(this.mouseX);
    }
    window.requestAnimationFrame(this.draw.bind(this));
  }

  clickBtn() {
    this.isOpen = true;

    new gsap.timeline()
      .to(this.enterCtrl, {
        opacity: 0,
        duration: 0.3,
        ease: "expo.out",
        onComplete: () => {
          this.enterCtrl.style.display = "none";
        },
      })
      .to(this.animation.camera.position, {
        duration: 1,
        z: 700,
      })
      .to(
        this.animation.settings,
        {
          progress: 1,
          duration: 20,
          ease: "expo.out",
        },
      );
  }

  mouseEntering() {
    if (this.isOpen) return;
    new gsap.timeline().to(
      this.animation.camera.position,
      {
        duration: 1,
        z: 400,
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
        z: 500,
        ease: "expo.out",
      },
      0
    );
  }
}

