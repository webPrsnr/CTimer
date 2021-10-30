class Timer {
  form = document.querySelector(".btn > button");
  constructor() {
    this.days = document.querySelector(".days > input");
    this.hours = document.querySelector(".hours > input");
    this.mins = document.querySelector(".mins > input");
    this.secs = document.querySelector(".secs > input");
    this.countDay =
      new Date().getTime() +
      1000 * 60 * 60 * 24 * this.days.valueAsNumber +
      1000 * 60 * 60 * this.hours.valueAsNumber +
      1000 * 60 * this.mins.valueAsNumber +
      1000 * this.secs.valueAsNumber;
    this.clickOnButton();
  }
  clickOnButton() {
    this.form.addEventListener("click", () => {
      this._startCountdown();
    });
  }
  _startCountdown(countDay) {
    let currentDay = this.countDay - new Date().getTime();
  }
}

const timer = new Timer();
