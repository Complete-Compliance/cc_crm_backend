import { uuid } from 'uuidv4';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

import User from '@modules/users/infra/typeorm/entities/User';

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async findById(id: string): Promise<User | undefined> {
    const foundUser = this.users.find(user => user.id === id);

    return foundUser;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const foundUser = this.users.find(user => user.email === email);

    return foundUser;
  }

  public async findByLogin(login: string): Promise<User | undefined> {
    const foundUser = this.users.find(user => user.login === login);

    return foundUser;
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = new User();

    // assing takes an object and assing values to it. if another object is given, it will append anyway
    Object.assign(user, { id: uuid() }, userData);

    this.users.push(user);

    return user;
  }

  // find user index and saves new user on it
  public async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(
      userToFind => userToFind.id === user.id,
    );

    this.users[findIndex] = user;

    return user;
  }
}

export default FakeUsersRepository;
