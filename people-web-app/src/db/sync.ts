import sequelize from '@/db/database';

async function syncDatabase() {
  try {
    await sequelize.sync();
    console.log('[INFO]', 'Database connected');
  } catch (err) {
    console.log('Unable to connect to database:', err);
  }
}

syncDatabase();
