import { resourceUpdate, resourceDelete } from '../services/resource/api';

export default class {
  id = '';
  name = '';
  key = '';
  parent = '';

  constructor(payload) {
    ['id', 'name', 'key', 'parent'].forEach((item) => {
      this[item] = payload[item] || '';
    });
  }

  async update() {
    await resourceUpdate({
      id: this.id,
      name: this.name,
      key: this.key,
    });
  }

  async delete() {
    await resourceDelete({
      id: this.id,
    });
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      key: this.key,
      parent: this.parent,
    };
  }
}
