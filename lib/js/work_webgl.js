import * as THREE from "three";
import imagesLoaded from "imagesloaded";
import gsap from "gsap";
import Scroll from './scroll'
import fragment from "../shaders/work/fragment.glsl";
import vertex from "../shaders/work/vertex.glsl";

import image1 from "../../static/img-about/1_0005.png"
import image2 from "../../static/img-about/2_0003.png"
import image3 from "../../static/img-about/3_0006.png"
import image4 from "../../static/img-about/4_0000.png"
import image5 from "../../static/img-about/5_0004.png"

export default class Sketch {
  constructor(options) {

    this.time = 0;
    this.container = options.dom;
    this.scene = new THREE.Scene();

    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;

    console.log(this.width, this.height)

    this.camera = new THREE.PerspectiveCamera(
      70,
      this.width / this.height,
      100,
      2000
    );
    this.camera.position.z = 600;

    this.camera.fov = 2 * Math.atan(this.height / 2 / 600) * (180 / Math.PI);

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });

    this.container.appendChild(this.renderer.domElement);

    this.images = [...document.querySelectorAll("img")];
    this.allImportImages = [
      image1,
      image2,
      image3,
      image4,
      image5,
    ]

    this.countTextures = 0;

    // Preload images
    const preloadImages = new Promise((resolve, reject) => {
      imagesLoaded(
        document.querySelectorAll("img"),
        { background: true },
        resolve
      );
    });

    let allDone = [preloadImages];
    this.currentScroll = 0;
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    Promise.all(allDone).then(() => {
      this.scroll = new Scroll();
      this.addImages();
      this.setPosition();

      this.mouseMovement();
      this.resize();
      this.setupResize();
      // this.addObjects();
      this.render();
      
    });
  }
  mouseMovement() {
    window.addEventListener(
      "mousemove",
      (event) => {
        this.mouse.x = (event.clientX / this.width) * 2 - 1;
        this.mouse.y = -(event.clientY / this.height) * 2 + 1;

        // update the picking ray with the camera and mouse position
        this.raycaster.setFromCamera(this.mouse, this.camera);

        // calculate objects intersecting the picking ray
        const intersects = this.raycaster.intersectObjects(this.scene.children);

        if (intersects.length > 0) {
          let obj = intersects[0].object;
          obj.material.uniforms.hover.value = intersects[0].uv;
        }
      },
      false
    );
  }

  setupResize() {
    window.addEventListener("resize", this.resize.bind(this));
  }

  resize() {
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;
    this.renderer.setSize(this.width, this.height);
    this.camera.aspect = this.width / this.height;


    // this.imageAspect = this.textures[0].image.height/this.textures[0].image.width;
    // let a1; let a2;
    // if(this.height/this.width>this.imageAspect) {
    //   a1 = (this.width/this.height) * this.imageAspect ;
    //   a2 = 1;
    // } else{
    //   a1 = 1;
    //   a2 = (this.height/this.width) / this.imageAspect;
    // }

    // this.material.uniforms.resolution.value.x = this.width;
    // this.material.uniforms.resolution.value.y = this.height;
    // this.material.uniforms.resolution.value.z = a1;
    // this.material.uniforms.resolution.value.w = a2;

    this.camera.updateProjectionMatrix();
  }

  addImages() {
    this.material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        uTexture1: { value: 0 },
        uTexture2: { value: 0 },
        hover: { value: new THREE.Vector2(0.5, 0.5) },
        hoverState: { value: 0.8 },
        defaultState: {value : 0},
        // oceanTexture: { value: new THREE.TextureLoader().load(bit) },
        // resolution: { type: "v4", value: new THREE.Vector4() },
      },
      side: THREE.DoubleSide,
      fragmentShader: fragment,
      vertexShader: vertex,
      defines: {
        PR: window.devicePixelRatio.toFixed(1),
      },
      // wireframe: true
    });

    this.materials = [];

    this.imageStore = this.images.map((img, i) => {
      let bounds = img.getBoundingClientRect();

      let geometry = new THREE.PlaneBufferGeometry(
        bounds.width,
        bounds.height,
        10,
        10
      );
      // console.dir(img.dataset.hover)
      let texture = new THREE.TextureLoader().load(img.src, (t)=>{
        this.countTextures++
        if(this.countTextures === this.images.length) {
          this.onload()
        }
      });
      let texture2 = new THREE.TextureLoader().load(this.allImportImages[i]);
      texture.needsUpdate = true;
      texture2.needsUpdate = true;
      // let material = new THREE.MeshBasicMaterial({
      //     // color: 0xff0000,
      //     map: texture
      // })


      let material = this.material.clone();

      img.addEventListener("mouseenter", () => {
        gsap.to(material.uniforms.hoverState, {
          duration: 1,
          value: 1,
        });
        gsap.to(material.uniforms.defaultState, {
          duration: 1,
          value: 1,
        });
      });
      img.addEventListener("mouseout", () => {
        gsap.to(material.uniforms.hoverState, {
          duration: 1,
          value: 0.8,
        });
        gsap.to(material.uniforms.defaultState, {
          duration: 1,
          value: 0,
        });
      });

      this.materials.push(material);

      material.uniforms.uTexture1.value = texture;
      material.uniforms.uTexture2.value = texture2;

      let mesh = new THREE.Mesh(geometry, material);

      this.scene.add(mesh);

      return {
        img: img,
        mesh: mesh,
        top: bounds.top,
        left: bounds.left,
        width: bounds.width,
        height: bounds.height,
      };
    });
  }

  setPosition() {
    this.imageStore.forEach((o) => {
      o.mesh.position.y =
        this.currentScroll - o.top + this.height / 2 - o.height / 2;
      o.mesh.position.x = o.left - this.width / 2 + o.width / 2;
    });
  }

  addObjects() {
    this.geometry = new THREE.PlaneBufferGeometry(200, 400, 10, 10);
    // this.geometry = new THREE.SphereBufferGeometry( 0.4, 40,40 );
    this.material = new THREE.MeshNormalMaterial();

    this.material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        // oceanTexture: { value: new THREE.TextureLoader().load(ocean) },
      },
      side: THREE.DoubleSide,
      fragmentShader: fragment,
      vertexShader: vertex,
      wireframe: true,
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.mesh);
  }

  render() {
    this.time += 0.05;

    this.scroll.render();
    this.currentScroll = this.scroll.scrollToRender;
    this.setPosition();

    // this.material.uniforms.time.value = this.time;

    this.materials.forEach((m) => {
      m.uniforms.time.value = this.time;
    });

    this.renderer.render(this.scene, this.camera);
    window.requestAnimationFrame(this.render.bind(this));
  }
}
