import express from 'express';
import cors from 'cors';
import { randomUUID } from 'crypto';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = process.env.PORT || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.join(__dirname, '..', 'data');
const bookingsFile = path.join(dataDir, 'bookings.json');

async function ensureStorage() {
  await fs.mkdir(dataDir, { recursive: true });

  try {
    await fs.access(bookingsFile);
  } catch {
    await fs.writeFile(bookingsFile, '[]', 'utf8');
  }
}

async function readBookings() {
  const fileContents = await fs.readFile(bookingsFile, 'utf8');

  try {
    return JSON.parse(fileContents);
  } catch {
    return [];
  }
}

async function writeBookings(bookings) {
  await fs.writeFile(bookingsFile, `${JSON.stringify(bookings, null, 2)}\n`, 'utf8');
}

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ message: 'Honest Inn backend is running' });
});

app.get('/api/bookings', async (req, res) => {
  const bookings = await readBookings();
  res.json({ bookings });
});

app.post('/api/bookings', async (req, res) => {
  const {
    name,
    email,
    phone = '',
    date,
    endDate,
    guests,
    message = '',
    bookingType = 'Booking',
    paymentMethod = 'unknown',
    totalAmount = '250',
  } = req.body ?? {};

  if (!name || !email || !date || !endDate || !guests) {
    return res.status(400).json({
      message: 'Missing required booking information.',
    });
  }

  const booking = {
    id: randomUUID(),
    name,
    email,
    phone,
    date,
    endDate,
    guests,
    message,
    bookingType,
    paymentMethod,
    totalAmount,
    status: 'confirmed',
    createdAt: new Date().toISOString(),
  };

  const bookings = await readBookings();
  bookings.unshift(booking);
  await writeBookings(bookings);

  res.status(201).json({
    message: 'Booking saved successfully.',
    booking,
  });
});

async function startServer() {
  await ensureStorage();

  app.listen(port, () => {
    console.log(`Backend running on http://localhost:${port}`);
  });
}

startServer().catch((error) => {
  console.error('Failed to start backend:', error);
  process.exit(1);
});