export default class TimeStorage {
  private times: DateInfo[];
  private startTime: DateInfo;

  constructor() {
    this.startTime = new DateInfo("start", new Date());
    this.times = [];
  }

  restart() {
    this.startTime = new DateInfo("start", new Date());
    this.times = [this.startTime];
  }

  getStart() {
    return this.times[0];
  }

  addTime(dateInfo: DateInfo) {
    this.times.push(dateInfo);

  }

  undo() {
    this.times.pop();
  }

  /**
   * 
   * @param type Type of data
   * @returns seconds since last cycle
   */
  lastCycleTimeOfType(type: string): number {
    
    const typed = this.times.filter(t => ['start', type].includes(t.type));

    if(typed.length < 2) {
      return 0;
    }
    return typed[typed.length - 1].time.getTime() - typed[typed.length - 2].time.getTime();
  }

  lastCycleTime(type: string): number {
    
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

  getTimes() {
    return this.times;
  }

  
}

export class DateInfo {
  type: string;
  time: Date;
  constructor(type: string, time: Date) {
    this.type = type;
    this.time = time;
  }
}