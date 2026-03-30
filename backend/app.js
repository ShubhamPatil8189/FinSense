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
const simulationRoutes = require('./src/routes/simulation.route');
const negotiationRoutes = require('./src/routes/negotiation.route');
const nudgeRoutes = require('./src/routes/nudge.route');
const spendDnaRoutes = require('./src/routes/spendDNA.route');
const eventRoutes = require('./src/routes/event.route');
const wasteRoutes = require('./src/routes/waste.route');
const scoreRoutes = require('./src/routes/score.route');
const subscriptionRoutes = require('./src/routes/subscription.route');

const app = express();

/* ---------- CORS ---------- */

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    const allowedOrigins = [
      'http://localhost:5000',
      'http://localhost:5173',
      'http://localhost:8080',
      'http://localhost:4000',
      'https://fin-sense-blxwmn4qa-shubham-patils-projects-0c5937dd.vercel.app'
    ];

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
}));


/* ---------- Middleware ---------- */
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/* ---------- Routes ---------- */
app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/income', incomeRoutes);
app.use('/api/goals', goalRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/emotion', emotionRoutes);
app.use('/api/simulation', simulationRoutes);
app.use('/api/negotiation', negotiationRoutes);
app.use('/api/nudges', nudgeRoutes);
app.use('/api/spend-dna', spendDnaRoutes);
app.use('/api/event', eventRoutes);
app.use('/api/waste', wasteRoutes);
app.use('/api/score', scoreRoutes);
app.use('/api/subscription', subscriptionRoutes);

/* ---------- Health Check ---------- */
app.get('/', (req, res) => {
  res.json({ message: ' FinSense Backend Running' });
});

module.exports = app;