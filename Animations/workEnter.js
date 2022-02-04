import gsap from "gsap";

export default function workEnter(d) {
  return new Promise((resolve) => {
    const t1 = new gsap.timeline();
    d.querySelector(".curtain").style.backgroundColor = "rgba(0,0,0,1)";
    t1.to(d.querySelector(".curtain"), {
      scaleY: 0,
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
        onComplete: ()=>{
            resolve();
        }
      },
      "-=0.5"
    );
  });
}
