import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { sequelize } from './config/db';
import loggerMiddleware from './middlewares/logger.middleware';
import authRoutes from './auth/auth.routes';
import newsRoutes from './api/news/routes';
import eventsRoutes from './api/events/routes';
import announcementsRoutes from './api/announcement/routes';

dotenv.config();

const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cors());
app.use(loggerMiddleware);

app.use('/auth', authRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/events', eventsRoutes);
app.use('/api/announcements', announcementsRoutes);
app.get('/', (req, res) => {
  res.send('🚀 Server is up and running!');
});


const PORT = process.env.PORT || 8000;

async function start() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    console.log('✅✅✅ Database connected Sucessfully!');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error('Failed to start', err);
  }
}
start();
