import { BaseModel } from './base';

class User extends BaseModel {
  user_id: string;
  name: string;
  email: string;
  password: string;

  protected guard = ['password'];

  constructor({
    user_id,
    name,
    email,
    password,
  }: Pick<User, 'user_id' | 'name' | 'email' | 'password'>) {
    super();
    this.user_id = user_id;
    this.name = name;
    this.email = email;
    this.password = password;
  }
}

export default User;
