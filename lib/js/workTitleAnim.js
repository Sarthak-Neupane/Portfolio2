import gsap from "gsap";

export default class Headline {
  constructor(options) {
    this.container = options.container;
    this.words = options.words || [];


    this.init();
    this.animateIn()
    // this.animateDown();
  }



    animateDown() {
        gsap.to(".word > span", {
            transform: "translateY(100%)",
            stagger: {
                amount: 1,
            }
        })
    }

    animateIn() {
        
    }
}
