class Timer {
  form = document.querySelector(".btn > button");
  timerId;
  constructor() {
    this.days = document.querySelector(".days > input");
    this.hours = document.querySelector(".hours > input");
    this.mins = document.querySelector(".mins > input");
    this.secs = document.querySelector(".secs > input");
    this.countValue;
    this.clickOnButton();
  }
  clickOnButton() {
    this.form.addEventListener("click", () => {
      this.countValue = this._getCountValue();
      this._startCountdown();
    });
  }
  _getCountValue() {
    return (
      new Date().getTime() +
      1000 * 60 * 60 * 24 * (this.days.valueAsNumber || 0) +
      1000 * 60 * 60 * (this.hours.valueAsNumber || 0) +
      1000 * 60 * (this.mins.valueAsNumber || 0) +
      1000 * (this.secs.valueAsNumber || 0)
    );
  }
  _renderPage(time) {
    this.days.valueAsNumber = time.days || 0;
    this.hours.valueAsNumber = time.hours || 0;
    this.mins.valueAsNumber = time.minutes || 0;
    this.secs.valueAsNumber = time.seconds || 0;
  }

  _resetPage() {
    this._renderPage(NaN);
  }
  _startCountdown() {
    const timerId = setInterval(() => {
      const currentValue = this.countValue - new Date().getTime();
      const days = Math.floor(currentValue / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (currentValue % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (currentValue % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((currentValue % (1000 * 60)) / 1000);
      this._renderPage({ days, hours, minutes, seconds });
      if (currentValue <= 0) {
        clearInterval(timerId);
        this._resetPage();
      }
    }, 1000);
  }
}

const timer = new Timer();
