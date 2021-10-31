class Timer {
  btn = document.querySelector(".btn > button");
  constructor() {
    this.days = document.querySelector(".days > input");
    this.hours = document.querySelector(".hours > input");
    this.mins = document.querySelector(".mins > input");
    this.secs = document.querySelector(".secs > input");
    this.inputs = document.querySelectorAll("input");
    this.countValue;
    this.checkInput();
    this.clickOnButton();
  }

  checkInput() {
    const warningSpan = document.createElement("span");
    warningSpan.innerHTML = "enter the correct value 0-60";
    this.inputs.forEach((el) => {
      el.oninput = function () {
        if (
          isNaN(el.valueAsNumber) ||
          el.valueAsNumber < 0 ||
          el.valueAsNumber > 60
        ) {
          el.after(warningSpan);
        } else {
          warningSpan.remove();
        }
      };
    });
  }
  clickOnButton() {
    this.btn.addEventListener("click", () => {
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
    this._changeAttribute();
  }
  _changeAttribute() {
    [this.days, this.hours, this.mins, this.secs].map((el) => {
      if (el.getAttribute("readonly")) {
        el.removeAttribute("readonly");
      } else {
        el.setAttribute("readonly", true);
      }
    });
  }
  _startCountdown() {
    this._changeAttribute();
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
