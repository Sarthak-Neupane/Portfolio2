import gsap from "gsap";

export default function microAnimAbout(){
    console.log('hello')

    const backLink = document.querySelector(".back__link");

        backLink.addEventListener("mouseenter", (e) => {
          console.log(e.target.firstChild.lastChild);
        //   gsap.to(e.target.firstChild.lastChild, {
        //     duration: 0.2,
        //     scaleX: 1,
        //   });
        });
        backLink.addEventListener("mouseleave", (e) => {
            console.log(e)
        //   gsap.to(e.target.firstChild.lastChild, {
        //     duration: 0.2,
        //     scaleX: 0,
        //   });
        });
}