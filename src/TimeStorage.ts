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

  getMostRecentScore() {
    const scores = this.times.filter(t => {return t.isScore});
    if (scores.length === 0) {
      return -1;
    }
    return scores[scores.length-1].time;
  }

  bestCycle(type: Type) {
    const scores = this.times.filter(t => {return t.isScore});

    if (scores.length == 0) {
      return;
    }

    let bestTime = scores[0].type === type ? scores[0].time : Number.MAX_VALUE;
    
    for (let i = 1; i < scores.length; i++) {
      if (scores[i].type === type) {
        const currTime = scores[i].time - scores[i-1].time;
        if (currTime < bestTime) {
          bestTime = currTime;
        }
      }
    }
    if (bestTime != Number.MAX_VALUE) return bestTime;
  }

  worstCycle(type: Type) {
    const scores = this.times.filter(t => {return t.isScore});

    if (scores.length == 0) {
      return;
    }

    let worstTime = scores[0].type === type ? scores[0].time : Number.MIN_VALUE;
    
    for (let i = 1; i < scores.length; i++) {
      if (scores[i].type === type) {
        const currTime = scores[i].time - scores[i-1].time;
        if (currTime > worstTime) {
          worstTime = currTime;
        }
      }
    }
    if (worstTime != Number.MIN_VALUE) return worstTime;
  }

  // averageCycle(type: Type) {
    
  // }
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