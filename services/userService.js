import { userRepository } from "../repositories/userRepository.js";

class UserService {
  getAll() {
    const users = userRepository.getAll();
    if (!users) {
      return null;
    }
    return users;
  }

  search(search) {
    const item = userRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }

  create(data) {
    const { email, phoneNumber } = data;
    const userExists =
      this.search({ email: email }) ||
      this.search({ phoneNumber: phoneNumber });
    if (userExists) {
      return "This email or phone number exists!";
    }
    const newUser = userRepository.create(data);
    if (!newUser) {
      return "Can't create user!";
    }
    return newUser;
  }

  update(id, data) {
    const { email, phoneNumber } = data;
    const userExists =
      this.search({ email: email }) ||
      this.search({ phoneNumber: phoneNumber });

    if (userExists) {
      return "This email or phone number exists!";
    }
    const user = this.search({ id: id });
    if (!user) {
      return "User not found!";
    }
    const updateUser = userRepository.update(id, data);
    return updateUser;
  }

  delete(id) {
    const userForDelete = this.search({ id: id });
    if (!userForDelete) {
      return null;
    }
    const deleteUser = userRepository.delete(id);
    if (!deleteUser) {
      return null;
    }
    return deleteUser;
  }
}

const userService = new UserService();

export { userService };
