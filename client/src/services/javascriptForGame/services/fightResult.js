class FightResult {
  #fighter1;

  #fighter2;

  #log = [];

  #winner;

  getResult() {
    return {
      fighter1: this.#fighter1,
      fighter2: this.#fighter2,
      log: this.#log,
      winner: this.#winner,
    };
  }

  setFighters(firstFighter, secondFighter) {
    this.#fighter1 = firstFighter;
    this.#fighter2 = secondFighter;
  }

  setLog(action) {
    this.#log = [...this.#log, action];
  }

  setWinner(winner) {
    this.#winner = winner;
  }
}

const fightResults = new FightState();

export default fightResults;
