export default class TimeStorage {
  private times: Event[] = [];
  private startTime: Date = new Date();

  constructor(times: Event[], startTime: Date) {
    this.times = times;
    this.startTime = startTime;
  }

  // consoleLog() {
  //   let total = 0;
  //   for (let i = 1; i < this.times.length - 1; i++) {
  //     if (this.times[i].type === Type.Amp && this.times[i].isScore === resultType.Score) {
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

  getCount(type: Type, isScore: boolean): number {
    return this.times.filter(t => {return t.type === type && t.isScore === isScore}).length;
  } 

  bestCycle() {
    // run calc
  }

  worstCycle() {
    // run calc
  }

  percentageScored(type: Type):number {
    if (this.getCount(type, true)+this.getCount(type, false) === 0) {
      return 100;
    }
    return this.getCount(type, true) / (this.getCount(type, false)+this.getCount(type, true)) * 100;
  }

   getTimes() {
    return this.times;
  }

  getStartTime() {
    return this.startTime;
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