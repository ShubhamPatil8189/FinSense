# 📊 FinSense

We all know *what* we buy, but we rarely look at *why* we buy it. **FinSense** is a smart, personal wealth assistant that connects the dots between your money and your mood. By combining simple expense tracking with conversational AI, FinSense helps you understand your spending habits, cut out wasted expenses, and save for what actually matters to you.

---

## 💡 What can FinSense do?

### 🧠 Spend DNA & Mood Tracking
* **Your Money Personality:** We analyze your habits to show if you lean towards being a *Frugal Saver*, *Big Spender*, *Frequent Buyer*, or *Emotional Spender*.
* **Mood-Based Spending:** Log how you felt (happy, stressed, sad, tired) when making a purchase. FinSense helps you notice if stress or boredom is driving your impulse buys, offering helpful tips to build healthier habits.

### 🔮 The "Financial Twin" Simulator
* **Test "What-If" Scenarios:** Ever wondered, *"Can I afford a new laptop if I start a side hustle?"* Plug it in. FinSense will run a 3 to 24-month projection to show you exactly how your bank balance reacts.
* **Smart Nudges:** Gentle, friendly reminders when your daily budget goes a bit too high or if you did a great job saving today. No annoying alarms—just helpful advice.

### 🔍 Waste & Subscription Scanner
* **Unused Subscriptions:** We look at your recurring bills (like Netflix, Spotify, or gym memberships) and flag any service you haven't actually used in over 2 months, showing you how much you'd save annually by canceling.
* **Duplicate Charges:** Mistakes happen. If you've been charged twice for the same amount within a day, we flag it so you can get a refund.

### 👥 Group Splits & Settlements
* **Keep Splits Simple:** Log group expenses, and let the app handle who owes what.
* **Smart Settlements:** Instead of everyone sending multiple small payments, our algorithm calculates the fewest transactions needed to square everyone up.

---

## 🛠️ The Tech Behind It

### Frontend (The Visuals)
* Built with **React** & **Vite** for a fast, responsive user interface.
* Styled using **Tailwind CSS** and **shadcn/ui** for a clean, modern look.
* Interactive charts powered by **Recharts** to visualize your progress.

### Backend (The Brains)
* Running on **Node.js** & **Express**.
* Data saved securely using **MongoDB** & **Mongoose**.
* AI features powered by **Google Gemini** (`gemini-2.5-flash`).
* Email alerts and OTP verification handled via **Nokemailer**.

---

## 📂 Folder Layout

```text
FinSense/
├── backend/
│   ├── src/
│   │   ├── config/          # Database, JWT, Gemini, and Email setups
│   │   ├── controllers/     # Handling requests (Auth, Goals, Income, Expenses, AI features)
│   │   ├── middleware/      # Security guards for login sessions
│   │   ├── models/          # Database structures (User, Expense, Income, Goal, etc.)
│   │   ├── routes/          # API endpoints
│   │   └── services/        # Logic for nudges, waste checks, and scores
│   ├── app.js               # Express application settings
│   └── server.js            # Start script
│
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable UI parts & layout blocks
│   │   ├── config/          # API connection rules
│   │   ├── pages/           # Pages (Dashboard, Simulation, SpendDNA, etc.)
│   │   ├── App.jsx          # Route management
│   │   └── index.css        # Styling sheet
│   └── package.json
└── README.md
```

---

## ⚙️ Setting Up

You'll need to set up a few environment variables before getting started.

### 1. Backend Config (`backend/.env`)
Create a new file named `.env` in the `backend/` folder:

```env
PORT=5000
CONNECTIONSTRING=your_mongodb_connection_string
JWTSecret=some_random_secure_secret_string
GEMINI_API_KEY=your_gemini_api_key

# Email Verification (OTP) Settings
EMAIL=your_sender_email@domain.com
EMAIL_URL=your_email_service_url
EMAIL_API_KEY=your_email_api_key
```

### 2. Frontend Config (`frontend/.env`)
Create a `.env` file in the `frontend/` folder:

```env
VITE_API_URL=http://localhost:5000/api
```

---

## 🚀 Running the Project Locally

Make sure you have [Node.js](https://nodejs.org) installed on your machine.

### Step 1: Clone the repository
```bash
git clone <your-repo-link>
cd FinSense
```

### Step 2: Start the Backend
1. Go to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

### Step 3: Start the Frontend
1. Open a new terminal and go to the frontend folder:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the web server:
   ```bash
   npm run dev
   ```
4. Open `http://localhost:5173` in your browser.

---


*Created by **Team Algonauts***
