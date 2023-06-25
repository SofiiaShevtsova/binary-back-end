import { fightRepository } from "../repositories/fightRepository.js";

class FightersService {
    search(search) {
    const item = fightRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }

  getAll() {
    const fight = fightRepository.getAll();
    if (!fight) {
      throw new Error("Can't find fights!");
    }
    return fight;
  }

  getOne(id) {
    const fight = this.search({ id: id });
    if (!fight) {
      throw new Error("Can't find fight!");
    }
    return fight;
  }

  create(data) {
    const {fighter1,fighter2,log, winner} = data;
    data.date = new Date().toUTCString()
    const newFight = fightRepository.create(data);
    if (!newFight) {
      throw new Error("Can't create fight!");
    }
    return newFight;
  }

  delete(id) {
    const fighterForDelete = this.search({ id: id });
    if (!fighterForDelete) {
      throw new Error("Can't find fight!");
    }
    const deleteFighter = fightRepository.delete(id);
    if (!deleteFighter) {
      throw new Error("Can't find fight!");
    }
    return deleteFighter;
  }
}

const fightersService = new FightersService();

export { fightersService };
