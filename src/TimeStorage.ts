export default class TimeStorage {
  private times: Event[];
  private startTime = new Date();

  constructor() {
    this.times = [];
  }

  // consoleLog() {
  //   let total = 0;
  //   for (let i = 1; i < this.times.length - 1; i++) {
  //     if (this.times[i].type === Type.Amp && this.times[i].wasScore === resultType.Score) {
  //       total++
  //       console.log("increments")
  //     }
  //   }
  //   console.log(total)
  // }

  // restart() {
  //   this.startTime = new Event("start", new Date(), resultType.Start);
  //   this.times = [this.startTime];
  // }

 

  addTime(Event: Event) {
    this.times.push(Event);
    // const updatedTD = this.times
    // return this.times
  }

  undo(type: Type, wasMissing: resultType) {
    for (let i = this.times.length-1; i > 0; i--) {
      if (this.times[i].type === type && this.times[i].wasScore === wasMissing) {
        this.times.splice(i, 1);
      }
    }
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

  lastCycleTime(): number {
    if(this.times.length < 2) {
      return 0;
    }
    return this.times[this.times.length - 1].time.getTime() - this.times[this.times.length - 2].time.getTime();
  }

  ampCount(): number {
    // return this.times.filter(t => {t.type === "amp" && t.wasScore === resultType.Score}).length
    let total = 0;
    for (let i = 0; i < this.times.length - 1; i++) {
      if (this.times[i].type === "amp" && this.times[i].wasScore === resultType.Score) {
        total++;
      }
    }
    return total;
  }

  speakerCount(): number {
    return this.times.filter(t => {["speaker"].includes(t.type) && [resultType.Score].includes(t.wasScore)} ).length
  }

  trapCount(): number {
    return this.times.filter(t => {["trap"].includes(t.type) && [resultType.Score].includes(t.wasScore)} ).length
  }
  ampCountM(): number {
    return this.times.filter(t => {["amp"].includes(t.type) && [resultType.Miss].includes(t.wasScore)} ).length
  }

  speakerCountM(): number {
    return this.times.filter(t => {["speaker"].includes(t.type) && [resultType.Miss].includes(t.wasScore)} ).length
  }

  trapCountM(): number {
    return this.times.filter(t => {["trap"].includes(t.type) && [resultType.Miss].includes(t.wasScore)} ).length
  }

  bestCycle() {
    // run calc
  }

  worstCycle() {
    // run calc
  }

  averageCycle(type: string) {
    let total = 0;
    let totalElements = 0;
    for (let i = 1; i < this.times.length - 1; i++) {
      if (this.times[i].type === type) {
        total += this.times[i].time.getTime() - this.times[i-1].time.getTime();
        totalElements++;
      }
    }
    return (total / totalElements) / 100;

  }

  percentageScored(type: string):number {
    if (type === "amp") {
      if (this.ampCount()+this.ampCountM() === 0) {
        return 100;
      }
      return this.ampCount() / (this.ampCount()+this.ampCountM()) * 100;
    } 
    else if (type === "speaker") {
      if (this.speakerCount()+this.speakerCountM() === 0) {
        return 100;
      }
      return this.speakerCount() / (this.speakerCount()+this.speakerCountM()) * 100;
    } 
    else if (type === "trap") {
      if (this.trapCount()+this.trapCountM() === 0) {
        return 100;
      }
      return this.trapCount() / (this.trapCount()+this.trapCountM()) * 100;
    } 
    else {
      return -1;
    }
  }

  getTimes() {
    return this.times;
  }

  
}


export enum Type {
  Amp = "AMP",
  Speaker = "SPEAKER",
  Trap = "TRAP"
}
export class Event {
  type: Type;
  time: Date;
  isScore: boolean;
  constructor(type: Type, time: Date, isScore: boolean) {
    this.type = type;
    this.time = time;
    this.isScore = isScore;
  }
}