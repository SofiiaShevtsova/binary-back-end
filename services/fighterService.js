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
      return null;
    }
    data.health = health ?? 100;
    const newFighter = fighterRepository.create(data);
    if (!newFighter) {
      return null;
    }
    return newFighter;
  }

  update(id, data) {
    const { name } = data;
    const fighterExists = this.search({ name: name });
    if (fighterExists) {
      return null;
    }
    const fighterForUpdate = this.search({ id: id });
    if (!fighterForUpdate) {
      return null;
    }
    const updateFighter = fighterRepository.update(id, data);
    if (!updateFighter) {
      return null;
    }
    return updateFighter;
  }

  delete(id) {
    const deleteFighter = fighterRepository.delete(id);
    if (!deleteFighter) {
      return null;
    }
    return deleteFighter;
  }
}

const fighterService = new FighterService();

export { fighterService };
