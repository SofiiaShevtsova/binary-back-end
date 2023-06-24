import { fighterRepository } from "../repositories/fighterRepository.js";

class FighterService {
  getAll() {
    const fighters = fighterRepository.getAll();
    if (!fighters) {
      return null;
    }
    return fighters;
  }

  search(search) {
    const item = fighterRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }

  create(data) {
    const { name, health } = data;
    const fighterExists = this.search({ name: name });
    if (fighterExists) {
      return `Fighter ${name} exists!`;
    }
    data.health = health ?? 100;
    const newFighter = fighterRepository.create(data);
    if (!newFighter) {
      return "Can't create fighter!";
    }
    return newFighter;
  }

  update(id, data) {
    const { name } = data;
    const fighterExists = this.search({ name: name });
    if (fighterExists) {
      return `Fighter ${name} exists!`;
    }
    const fighterForUpdate = this.search({ id: id });
    if (!fighterForUpdate) {
      return "Can't find fighter!";
    }
    const updateFighter = fighterRepository.update(id, data);
    if (!updateFighter) {
      return "Can't find fighter!";
    }
    return updateFighter;
  }

  delete(id) {
    const fighterForDelete = this.search({ id: id });
    if (!fighterForDelete) {
      return null;
    }
    const deleteFighter = fighterRepository.delete(id);
    if (!deleteFighter) {
      return null;
    }
    return deleteFighter;
  }
}

const fighterService = new FighterService();

export { fighterService };
