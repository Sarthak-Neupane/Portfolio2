import gsap from "gsap";

export default function workEnter(d) {
  return new Promise((resolve) => {
    const t1 = gsap.timeline();
    d.querySelector(".full").style.backgroundColor = "rgba(0,0,0,1)";
    document.body.style.maxHeight = "700vh";
    document.body.style.overflow = "scroll";
    t1.to(d.querySelector(".full"), {
      scaleY: 0,
      onComplete: ()=>{
          resolve();
      }
    });
    t1.to(".nav", {
        opacity: 1,
        duration: .3
    })
    t1.to(d.querySelector(".number_inner > h1"), {
      transform: "translateY(0)",
    });
    t1.to(
        d.querySelector(".headline > h1"),
      {
        transform: "translateY(0)",
        duration: 0.5,
      },
      "-=0.5"
    );
  });
}
