import { action, observable, computed } from 'mobx';
import autobind from 'autobind-decorator';

@autobind
export default class MobXCountdownTimer {
  @observable startTimeMs = 0;

  @observable lastUpdateTimeMs = 0;

  @observable durationMs = 30000;

  @observable updateFrequencyMs = 10;

  @observable isRunning = false;

  constructor(updateFrequencyMs = 10) {
    this.updateFrequencyMs = updateFrequencyMs;
  }

  @action
  start(startTimeMs, durationMs) {
    if (!this.isRunning) {
      this.reset();
      this.durationMs = durationMs;
      this.startTimeMs = startTimeMs || Date.now();
      this.isRunning = true;
      this.update();
    }
  }

  @action
  reset() {
    this.isRunning = false;
    this.startTimeMs = Date.now();
    this.lastUpdateTimeMs = this.startTimeMs;
  }

  @action
  update() {
    if (this.isRunning) {
      this.lastUpdateTimeMs = Date.now();

      if (this.millisecondsRemaining > 0) {
        setTimeout(this.update, this.updateFrequencyMs);
      } else {
        this.isRunning = false;
      }
    }
  }

  @computed
  get millisecondsPassed() {
    return this.lastUpdateTimeMs - this.startTimeMs;
  }

  @computed
  get millisecondsRemaining() {
    const differencMs = this.durationMs - this.millisecondsPassed;

    return differencMs > 0 ? differencMs : 0;
  }

  @computed
  get secondsRemaining() {
    return this.millisecondsRemaining / 1000;
  }

  @computed
  get roundedSecondsRemaining() {
    return Math.round(this.secondsRemaining);
  }

  @computed
  get display() {
    return `${this.roundedSecondsRemaining}s`;
  }
}
