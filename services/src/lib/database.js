import 'mysql';
import makeKnex from 'knex';

const getConnection = () => {
  const knex = makeKnex({
    client: 'mysql',
    version: '5.7',
    connection: {
      host: '127.0.0.1',
      user: 'healthreveal',
      password: 'healthreveal',
      database: 'healthreveal-db',
      timezone: 'utc',
    },
    pool: { min: 1, max: 10, propagateCreateError: false },
    acquireConnectionTimeout: 10000,
  });

  return knex;
};

class Database {
  constructor() {
    this.connection = null;
  }

  async getConnection() {
    if (!this.connection) {
      this.connection = await getConnection();
    }
    return this.connection;
  }
}

export default new Database();
