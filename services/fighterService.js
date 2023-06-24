import { fighterRepository } from "../repositories/fighterRepository.js";

class FighterService {
  getAll() {
    const users = userRepository.getAll();
    if (!users) {
      return null;
    }
    return users;
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
    const updateUser = userRepository.update(id, data);
    if (!updateUser) {
      return null;
    }
    return updateUser;
  }

  delete(id) {
    const deleteUser = userRepository.delete(id);
    if (!deleteUser) {
      return null;
    }
    return deleteUser;
  }

  // TODO: Implement methods to work with fighters
}

const fighterService = new FighterService();

export { fighterService };
