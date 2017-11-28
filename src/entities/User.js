import { userAdd, usersGets, usersGet, usersUpdate, usersDelete, usersResetPassword } from '../services/users/api';

export default class {
  username = '';
  password = '';
  email = '';
  phone = '';
  id = '';

  constructor(payload) {
    ['username', 'password', 'email', 'phone', 'id'].forEach((item) => {
      this[item] = payload[item];
    });
  }

  async update() {
    await usersUpdate({
      id: this.id,
      email: this.email,
      phone: this.phone,
    });
  }

  async delete() {
    await usersDelete({
      id: this.id,
    });
  }

  async resetPassword({ newPassword }) {
    await usersResetPassword({
      id: this.id,
      password: newPassword,
    });
  }

  toJSON() {
    return {
      id: this.id,
      username: this.username,
      password: this.password,
      email: this.email,
      phone: this.phone,
    };
  }
}
