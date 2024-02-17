export default class TimeStorage {
  private times: Date[];
  private startTime: Date;

  constructor() {
    this.times = [];
  }

  start() {
    this.startTime = new Date();
  }

  addTime(date: Date) {
    this.times.push(date);
  }

  undo() {
    this.times.pop();
  }

  lastCycleTime() {
    if(this.times.length < 1) {
      return null;
    }

    //run calc
  }

  bestCycle() {
    // run calc
  }

  worstCycle() {
    // run calc
  }

  averageCycle() {
    // run calc
  }
}

