const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://user:098@cluster0.wrblu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/loan-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const loanSchema = new mongoose.Schema({
  amount: Number,
  term: Number,
  repayments: [
    {
      week: Number,
      amount: Number,
      status: { type: String, enum: ['PENDING', 'PAID'], default: 'PENDING' },
    },
  ],
  status: { type: String, enum: ['PENDING', 'APPROVED', 'PAID'], default: 'PENDING' },
});

const Loan = mongoose.model('Loan', loanSchema);

// Routes

// 1. Submit a new loan
app.post('/loans', async (req, res) => {
  const { amount, term } = req.body;
  console.log(req.body)
  const weeklyAmount = (amount / term).toFixed(2);

  const repayments = Array.from({ length: term }, (_, i) => ({
    week: i + 1,
    amount: weeklyAmount,
    status: 'PENDING',
  }));

  const loan = new Loan({ amount, term, repayments });
  await loan.save();
  res.status(201).json(loan);
});

// 2. Get all loans (customer-specific loans can be filtered with user ID in production)
app.get('/loans', async (req, res) => {
  const loans = await Loan.find();
  res.json(loans);
});

// 3. Admin approves a loan
app.patch('/loans/:id/approve', async (req, res) => {
  const loan = await Loan.findById(req.params.id);
  if (!loan) {
    return res.status(404).json({ error: 'Loan not found' });
  }
  loan.status = 'APPROVED';
  await loan.save();
  res.json(loan);
});


// 4. Submit a repayment
app.patch('/loans/:id/repay', async (req, res) => {
  const loan = await Loan.findById(req.params.id);
  if (!loan) {
    return res.status(404).json({ error: 'Loan not found' });
  }

  const { amount } = req.body;

  // Find the first PENDING repayment
  const repayment = loan.repayments.find((r) => r.status === 'PENDING');
  if (!repayment) {
    return res.status(400).json({ error: 'All repayments are already completed' });
  }

  // Ensure repayment amount is greater or equal
  if (amount < repayment.amount) {
    return res.status(400).json({ error: 'Repayment amount is too low' });
  }

  // Mark the repayment as paid
  repayment.status = 'PAID';

  // Check if all repayments are PAID
  if (loan.repayments.every((r) => r.status === 'PAID')) {
    loan.status = 'PAID';
  }

  await loan.save();
  res.json(loan);
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
