import gsap from "gsap";
// import Work from '../src/work';

export default function workLeave(d, w) {
  return new Promise((resolve) => {
    const t1 = new gsap.timeline();

    console.log(w);

    // if(window.innerWidth < 1024){
    //   w.t1.kill(true)
    //   w.t2.kill(true)
    //   w.t3.kill(true)
    //   w.t4.kill(true)
    // }

    d.querySelector(".full").style.backgroundColor = "rgba(255,255,255,1)";
    console.log(d.querySelector(".full"));
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
    t1.to(d.querySelector(".full"), {
      scaleY: 1,
    });
    t1.to(document.body, {
      overflow: "hidden",
      height: "100vh",
      maxHeight: "100vh",
      onComplete: () => {
        // console.log(w.t1)
        // console.log(w.t2)
        // console.log(w.t3)
        // console.log(w.t4)
        resolve();
      },
    });
  });
}
