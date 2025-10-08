import { sequelize } from '../config/db';
import { User } from '../models/user.model';

import bcrypt from 'bcrypt';

async function seed(){
  await sequelize.sync({ force: true });
  const adminPass = await bcrypt.hash('admin123',10);
  const admin = await User.create({ name: 'Admin', email: 'admin@example.com', password: adminPass, role: 'superadmin' });

  console.log('Seeded');
  process.exit(0);
}
seed();
