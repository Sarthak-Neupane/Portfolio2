import gsap from "gsap";

export default function homeLeave(t, d) {
  return new Promise((resolve) => {
    const t1 = new gsap.timeline();
    
    t1.to(d.querySelectorAll(".social__links"), {
      y: "100%",
    })
      .to(
        d.querySelectorAll(".after_title_anim"),
        {
          opacity: 0,
        },
        "-=.5"
      )
      .to(
        d.querySelectorAll(".home__title"),
        {
          opacity: 0,
          scale: 0,
          stagger: {
            each: 0.005,
          },
        },
        "-=.5"
      )
      .to(t.animation.settings, {
        progress: 0,
        ease: "power3.inOut",
        duration: 1,
      })
      .to(d.querySelector('.curtain'), {
        scaleY: 1,
        duration: 0.5,
        onComplete: () => {
          resolve();
        }
      }, "-=.3")
  });
}
