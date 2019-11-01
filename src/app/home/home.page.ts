import { Component } from "@angular/core";
import { Insomnia } from "@ionic-native/insomnia/ngx";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  percent: number = 0;
  radius: number = 100;

  fullTime: any = "00:01:00";

  timer: any = false;
  progress: any = 0;
  minutes: number = 1;
  seconds: any = 0;

  elapsed: any = {
    hours: "00",
    minutes: "00",
    seconds: "00"
  };

  overallTimer: any = false;

  constructor(private insomnia: Insomnia) {}

  startTime() {
    if (this.timer) {
      clearInterval(this.timer);
    }

    this.timer = false;
    this.percent = 0;
    this.progress = 0;

    let timeSplit = this.fullTime.split(":");
    this.minutes = timeSplit[1];
    this.seconds = timeSplit[2];

    let totalSeconds = Math.floor(this.minutes * 60) + parseInt(this.seconds);

    this.timer = setInterval(() => {
      if (this.percent == this.radius) {
        clearInterval(this.timer);
      }

      this.progress++;
      this.percent = Math.floor((this.progress / totalSeconds) * 100);
    }, 1000);

    if (!this.overallTimer) {
      this.progressTimer();
      this.insomnia.keepAwake();
    }
  }

  progressTimer() {
    let countDownDate = new Date();

    this.overallTimer = setInterval(() => {
      let now = new Date().getTime();
      let distance = now - countDownDate.getTime();

      this.elapsed.hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      this.elapsed.minutes = Math.floor(
        (distance % (1000 * 60 * 60)) / (1000 * 60)
      );
      this.elapsed.seconds = Math.floor((distance % (1000 * 60)) / 1000);

      this.elapsed.hours = this.pad(this.elapsed.hours, 2);
      this.elapsed.minutes = this.pad(this.elapsed.minutes, 2);
      this.elapsed.seconds = this.pad(this.elapsed.seconds, 2);
    });
  }

  pad(num, size) {
    let s = num + "";
    while (s.length < size) {
      s = "0" + s;
    }
    return s;
  }

  stopTime() {
    clearInterval(this.timer);
    clearInterval(this.overallTimer);
    this.overallTimer = false;
    this.timer = false;
    this.percent = 0;
    this.progress = 0;
    this.elapsed = {
      hours: "00",
      minutes: "00",
      seconds: "00"
    };

    this.insomnia.allowSleepAgain();
  }
}
