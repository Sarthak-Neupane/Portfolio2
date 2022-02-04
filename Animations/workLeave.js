import gsap from "gsap";

export default function workEnter(d) {
  return new Promise((resolve) => {
    const t1 = new gsap.timeline();

    d.querySelector(".curtain").style.backgroundColor = "rgba(255,255,255,1)";

    t1.to(".nav", {
      opacity: 0,
      duration: 0.3,
    });
    t1.to(d.querySelector(".number_inner > h1"), {
      transform: "translateY(100%)",
    });
    t1.to(
      d.querySelector(".headline > h1"),
      {
        transform: "translateY(100%)",
        duration: 0.5,
      },
      "-=0.5"
    );
    t1.to(d.querySelector(".curtain"), {
      scaleY: 1,
    });
    t1.to(document.body, {
      height: "100vh",
      // maxHeight: "100vh",
      onComplete: () => {
        resolve();
      },
    });
  });
}
