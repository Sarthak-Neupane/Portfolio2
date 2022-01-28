import gsap from "gsap";

export default function aboutEnter(d) {
  return new Promise((resolve) => {
    const t1 = new gsap.timeline()
    console.log(d, t1)
    t1.to(d.querySelector('.curtain'), {
        scaleY: 0,
    })
    t1.to(d.querySelectorAll('h1'), {
        y: 0,
        onComplete: ()=>{
            resolve()
        }
    })
  });
}
