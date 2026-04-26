const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'data.json');

app.use(cors());
app.use(express.json());

// ─── GET resume data ───────────────────────────────────────────────────────────
app.get('/api/resume', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Помилка читання файлу' });
  }
});

// ─── POST save name ────────────────────────────────────────────────────────────
app.post('/api/resume', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
    data.firstName = req.body.firstName;
    data.lastName = req.body.lastName;
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    res.json({ message: 'Імʼя збережено успішно' });
  } catch (err) {
    res.status(500).json({ error: 'Помилка запису файлу' });
  }
});

// ─── POST register ─────────────────────────────────────────────────────────────
app.post('/api/register', (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({ error: 'Всі поля обовʼязкові' });
    }

    const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
    if (!data.users) data.users = [];

    const exists = data.users.find(u => u.email === email);
    if (exists) {
      return res.status(409).json({ error: 'Користувач з таким email вже існує' });
    }

    data.users.push({ email, password, firstName, lastName });
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));

    res.json({ message: 'Реєстрація успішна', user: { email, firstName, lastName } });
  } catch (err) {
    res.status(500).json({ error: 'Помилка сервера' });
  }
});

// ─── POST login ────────────────────────────────────────────────────────────────
app.post('/api/login', (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Введіть email та пароль' });
    }

    const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
    if (!data.users) data.users = [];

    const user = data.users.find(u => u.email === email && u.password === password);
    if (!user) {
      return res.status(401).json({ error: 'Невірний email або пароль' });
    }

    res.json({ message: 'Вхід успішний', user: { email: user.email, firstName: user.firstName, lastName: user.lastName } });
  } catch (err) {
    res.status(500).json({ error: 'Помилка сервера' });
  }
});

app.listen(PORT, () => {
  console.log(`Сервер запущено на http://localhost:${PORT}`);
});
