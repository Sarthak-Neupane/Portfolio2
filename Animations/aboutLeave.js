import gsap from "gsap";

export default function aboutLeave(d) {
  return new Promise((resolve) => {
    const t1 = new gsap.timeline()
    t1.to(d.querySelectorAll('h1'), {
        y: "100%",
    })
    t1.to(d.querySelector('.curtain'), {
        scaleY: 1,
        onComplete: ()=>{
            resolve()
        }
    })
  });
}
