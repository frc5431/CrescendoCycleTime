export default class TimeStorage {
  private times: Event[] = [];

  constructor(times: Event[]) {
    this.times = times;
  }

  // restart() {
  //   this.startTime = new Event("start", new Date(), resultType.Start);
  //   this.times = [this.startTime];
  // }

  getCount(type: Type, isScore: boolean): number {
    return this.times.filter(t => {return t.type === type && t.isScore === isScore}).length;
  } 

  bestCycle() {
    // let bestTime = this.times[0].time;
    
    // for (let i = 1; i < this.times.length; i++) {
    //   const currTime = this.times[i].time - this.times[i-1].time;
    //   if (currTime > bestTime) {
    //     bestTime = currTime;
    //   }
    // }
    // return 
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
}


export enum Type {
  Amp = "AMP",
  Speaker = "SPEAKER",
  Trap = "TRAP"
}
export class Event {
  type: Type;
  time: number;
  isScore: boolean;
  constructor(type: Type, time: number, isScore: boolean) {
    this.type = type;
    this.time = time;
    this.isScore = isScore;
  }
}