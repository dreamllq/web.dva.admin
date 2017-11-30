import { userGet, userLogin, userLogout } from './api';
import User from '../../entities/User';


export default class {
  static async get() {
    const { data } = await userGet();
    return new User(data);
  }

  static async login(params) {
    await await userLogin(params);
  }

  static async logout() {
    await await userLogout();
  }
}
