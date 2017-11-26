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
