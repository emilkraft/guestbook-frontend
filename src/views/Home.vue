<template>
  <div class="container">
    <h1>Guestbook</h1>
    <div class="row">
      <form class="search-form search-form-header">
        <label class="search-input-wrap">
          <input
            type="text"
            class="search-input"
            placeholder="Username"
            autocomplete="off"
            v-model="entry.username"
          />
        </label>
        <label>
          <textarea placeholder="Message" v-model="entry.message" />
        </label>
      </form>
      <a
        onmousedown="return false"
        @click="createEntry"
        class="btn btn-lg"
        data-test-id="login-button"
        >Submit
      </a>
    </div>
    <div class="row">
      <ul class="list">
        <li v-for="entry in entries" :key="entry.id" @click="confet">
          <h3>{{ entry.username }}</h3>
          <h4>{{ entry.message }}</h4>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import GuestbookService from "@/services/GuestbookService";
import { AxiosError } from "axios";

export default class Home extends Vue {
  private entry = {
    username: "",
    message: "",
  };
  private submitted: boolean = false;
  private error = null;

  private entries: any[] = [];

  defaults: any = {
    angle: 180,
    spread: 500,
    startVelocity: 25,
    elementCount: 100,
    width: "10px",
    height: "10px",
    colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
    duration: 4000,
    stagger: 0,
    dragFriction: 0.1,
    random: Math.random,
  };

  beforeMount() {
    this.load();
    var self = this;
    setInterval(
      function () {
        self.load();
      }.bind(this),
      60000
    );
  }

  load() {
    GuestbookService.getAll()
      .then((response: any) => {
        this.entries = response.data;
      })
      .catch((e: any) => {
        console.log(e);
      });
  }

  createEntry() {
    if (this.entry.username != "" && this.entry.message != "") {
      GuestbookService.create(this.entry)
        .then((response: any) => {
          console.log(response.status);
          this.submitted = true;
          this.load();
        })
        .catch((reason: AxiosError) => {
          this.error = reason.response!.data;
          this.submitted = true;
        });
    }
  }

  // confetti
  createElements(
    root: any,
    elementCount: number,
    colors: string[],
    width: number,
    height: number
  ) {
    return Array.from({
      length: elementCount,
    }).map((_, index) => {
      const element: any = document.createElement("div");
      const color = colors[index % colors.length];
      element.style["background-color"] = color;
      element.style.width = width;
      element.style.height = height;
      element.style.position = "absolute";
      element.style.willChange = "transform, opacity";
      element.style.visibility = "hidden";
      root.appendChild(element);
      return element;
    });
  }
  randomPhysics(
    angle: number,
    spread: number,
    startVelocity: number,
    random: any
  ) {
    const radAngle = angle * (Math.PI / 180);
    const radSpread = spread * (Math.PI / 180);
    return {
      x: 0,
      y: 0,
      wobble: random() * 10,
      wobbleSpeed: 0.1 + random() * 0.1,
      velocity: startVelocity * 0.5 + random() * startVelocity,
      angle2D: -radAngle + (0.5 * radSpread - random() * radSpread),
      angle3D: -(Math.PI / 4) + random() * (Math.PI / 2),
      tiltAngle: random() * Math.PI,
      tiltAngleSpeed: 0.1 + random() * 0.3,
    };
  }
  updateFetti(
    fetti: any,
    progress: number,
    dragFriction: number,
    decay: number
  ) {
    fetti.physics.x += Math.cos(fetti.physics.angle2D) * fetti.physics.velocity;
    fetti.physics.y += Math.sin(fetti.physics.angle2D) * fetti.physics.velocity;
    fetti.physics.z += Math.sin(fetti.physics.angle3D) * fetti.physics.velocity;
    fetti.physics.wobble += fetti.physics.wobbleSpeed;
    if (decay) {
      fetti.physics.velocity *= decay;
    } else {
      fetti.physics.velocity -= fetti.physics.velocity * dragFriction;
    }
    fetti.physics.y += 3;
    fetti.physics.tiltAngle += fetti.physics.tiltAngleSpeed;

    const { x, y, tiltAngle, wobble } = fetti.physics;
    const wobbleX = x + 10 * Math.cos(wobble);
    const wobbleY = y + 10 * Math.sin(wobble);
    const transform = `translate3d(${wobbleX}px, ${wobbleY}px, 0) rotate3d(1, 1, 1, ${tiltAngle}rad)`;

    fetti.element.style.visibility = "visible";
    fetti.element.style.transform = transform;
    fetti.element.style.opacity = 1 - progress;
  }
  animate(
    root: any,
    fettis: any,
    dragFriction: number,
    decay: number,
    duration: number,
    stagger: number
  ) {
    let startTime: number = 0;

    return new Promise((resolve) => {
      const app = this;

      function update(time: any) {
        if (!startTime) startTime = time;
        const elapsed = time - startTime;
        const progress = startTime === time ? 0 : (time - startTime) / duration;
        fettis.slice(0, Math.ceil(elapsed / stagger)).forEach((fetti: any) => {
          app.updateFetti(fetti, progress, dragFriction, decay);
        });

        if (time - startTime < duration) {
          requestAnimationFrame(update);
        } else {
          fettis.forEach((fetti: any) => {
            if (fetti.element.parentNode === root) {
              return root.removeChild(fetti.element);
            }
          });
          resolve(0);
        }
      }

      requestAnimationFrame(update);
    });
  }
  confetti(root: any) {
    const {
      elementCount,
      colors,
      width,
      height,
      angle,
      spread,
      startVelocity,
      decay,
      dragFriction,
      duration,
      stagger,
      random,
    } = Object.assign({}, this.defaults);
    const elements = this.createElements(
      root,
      elementCount,
      colors,
      width,
      height
    );
    const fettis = elements.map((element) => ({
      element,
      physics: this.randomPhysics(angle, spread, startVelocity, random),
    }));

    return this.animate(root, fettis, dragFriction, decay, duration, stagger);
  }

  confet(event: any) {
    setTimeout(() => {
      this.confetti(event.target);
    }, 330);
  }
}
</script>

<style>
.confetti-canon {
  width: 1px;
  height: 1px;
}
</style>