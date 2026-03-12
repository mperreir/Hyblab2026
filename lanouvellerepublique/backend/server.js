import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import restaurantRoutes from './routes/restaurantRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use('/img', express.static(path.join(__dirname, 'data', 'img')));
app.use('/api/restaurant', restaurantRoutes);

app.listen(port, () => {
  console.log(`Serveur back-end démarré sur http://localhost:${port}`);
});
