class Timer {
  btn = document.querySelector(".btn");
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
    const _insertWarningSpan = function (valMin, valMax) {
      warningSpan.textContent = `correct value ${valMin} - ${valMax}`;
      return warningSpan;
    };
    const _checkValues = function (el, valName, valMin, valMax) {
      if (el.name == valName) {
        if (
          isNaN(el.valueAsNumber) ||
          el.valueAsNumber < valMin ||
          el.valueAsNumber > valMax
        ) {
          return true;
        }
      }
    };
    this.inputs.forEach((el) => {
      el.oninput = function () {
        if (_checkValues(el, "days", 0, 100)) {
          el.after(_insertWarningSpan(0, 100));
        } else if (_checkValues(el, "hours", 0, 24)) {
          el.after(_insertWarningSpan(0, 24));
        } else if (_checkValues(el, "mins", 0, 60)) {
          el.after(_insertWarningSpan(0, 60));
        } else if (_checkValues(el, "secs", 0, 60)) {
          el.after(_insertWarningSpan(0, 60));
        } else {
          warningSpan.remove();
        }
      };
    });
  }
  clickOnButton() {
    this.btn.children[0].addEventListener("click", () => {
      this.countValue = this._getCountValue();
      this._ticking();
      this._startCountdown();
    });
  }

  _ticking() {
    if (this.btn.classList.toggle("btn-active")) {
      this.btn.children[0].innerHTML = "ticking";
    } else this.btn.children[0].innerHTML = "start";
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
    this._ticking();
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
