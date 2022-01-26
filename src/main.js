import gsap from "gsap";
import Explode from "./new-explode";
import Open from "./opening";

class Main {
  constructor(options) {
    this.options = options;
    this.enterButton = options.button;
    this.explode();
    this.microAnimHome();
  }

  explode() {
    new Explode({
      button: this.enterButton,
    });
  }

  microAnimHome() {
    const nameTitle = document.querySelector(".name__title");
    const socialLinks = document.querySelectorAll(".social__links");
    const pageLinks = document.querySelectorAll(".page__links");

    socialLinks.forEach((link) => {
      link.addEventListener("mouseenter", (e) => {
        gsap.to(e.target.lastChild, {
          duration: 0.2,
          scaleX: 1,
        });
      });
      link.addEventListener("mouseleave", (e) => {
        gsap.to(e.target.lastChild, {
          duration: 0.2,
          scaleX: 0,
        });
      });
    });
    pageLinks.forEach((link) => {
      link.addEventListener("mouseenter", (e) => {
        console.log(e.target.firstChild.lastChild)
        gsap.to(e.target.firstChild.lastChild, {
          duration: 0.2,
          scaleX: 1,
        });
      });
      link.addEventListener("mouseleave", (e) => {
        gsap.to(e.target.firstChild.lastChild, {
          duration: 0.2,
          scaleX: 0,
        });
      });
    });

    nameTitle.addEventListener("mouseenter", () => {
      gsap.to(document.querySelector(".name"), {
        duration: 0.5,
        y: "-50%",
        ease: "power1.out",
      });
    });

    nameTitle.addEventListener("mouseleave", () => {
      gsap.to(document.querySelector(".name"), {
        duration: 0.5,
        y: 0,
        ease: "power1.out",
      });
    });
  }
}

new Main({
  button: document.querySelector(".home__button"),
});
