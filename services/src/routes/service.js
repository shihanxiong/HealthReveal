import database from '../lib/database';

export const getPatients = async () => {
  const connection = await database.getConnection();

  return connection('patients').select('*');
};
