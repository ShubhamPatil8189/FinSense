const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// Routes
const authRoutes = require('./src/routes/auth.route');
const expenseRoutes = require('./src/routes/expense.route');
const incomeRoutes = require('./src/routes/income.route');
const goalRoutes = require('./src/routes/goal.route');
const groupRoutes = require('./src/routes/group.route');
const emotionRoutes = require('./src/routes/emotion.route');


const app = express();

/* ---------- Middleware ---------- */
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/* ---------- CORS ---------- */
const allowedOrigins = [
  'http://localhost:5000',
  'http://localhost:5173',
  'http://localhost:8080',
  'http://localhost:4000'
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
}));

/* ---------- Routes ---------- */
app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/income', incomeRoutes);
app.use('/api/goals', goalRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/emotion', emotionRoutes);

/* ---------- Health Check ---------- */
app.get('/', (req, res) => {
  res.json({ message: '✅ FinSense Backend Running' });
});

module.exports = app;
