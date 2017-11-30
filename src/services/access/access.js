import userService from '../user';

export default class {
  _user = null;

  get current() {
    return this._user;
  }
  async signIn({ username, password }) {
    await userService.login({ username, password });
  }

  async signOut() {
    await userService.logout();
  }

  async sync() {
    try {
      const user = await userService.get();
      this._user = user;
      return this.current;
    } catch (e) {
      throw e;
    }
  }
}
