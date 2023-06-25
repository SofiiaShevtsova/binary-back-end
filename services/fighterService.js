import { fighterRepository } from "../repositories/fighterRepository.js";

class FighterService {
  search(search) {
    const item = fighterRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }

  getAll() {
    const fighters = fighterRepository.getAll();
    if (!fighters) {
      throw new Error("Can't find fighters!");
    }
    return fighters;
  }

  getOne(id) {
    const fighter = this.search({ id: id });
    if (!fighter) {
      throw new Error("Can't find fighter!");
    }
    return fighter;
  }

  create(data) {
    const { name, health } = data;
    const fighterExists = this.search({ name: name });
    if (fighterExists) {
      throw new Error(`Fighter ${name} exists!`);
    }
    data.health = health ?? 100;
    const newFighter = fighterRepository.create(data);
    if (!newFighter) {
      throw new Error("Can't create fighter!");
    }
    return newFighter;
  }

  update(id, data) {
    const { name } = data;
    const fighterExists = this.search({ name: name });
    if (fighterExists) {
      throw new Error(`Fighter ${name} exists!`);
    }
    const fighterForUpdate = this.search({ id: id });
    if (!fighterForUpdate) {
      throw new Error("Can't find fighter!");
    }
    const updateFighter = fighterRepository.update(id, data);
    if (!updateFighter) {
      throw new Error("Can't find fighter!");
    }
    return updateFighter;
  }

  delete(id) {
    const fighterForDelete = this.search({ id: id });
    if (!fighterForDelete) {
      throw new Error("Can't find fighter!");
    }
    const deleteFighter = fighterRepository.delete(id);
    if (!deleteFighter) {
      throw new Error("Can't find fighter!");
    }
    return deleteFighter;
  }
}

const fighterService = new FighterService();

export { fighterService };
