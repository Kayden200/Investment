const express = require('express');
const Transaction = require('../models/Transaction');
const User = require('../models/User');
const router = express.Router();

// Deposit
router.post('/deposit', async (req, res) => {
  try {
    const { userId, amount } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(400).json({ message: 'User not found' });

    user.balance += amount;
    await user.save();

    const transaction = new Transaction({ user: userId, amount, type: 'deposit' });
    await transaction.save();
    res.json({ message: 'Deposit successful', transaction });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Withdrawal
router.post('/withdraw', async (req, res) => {
  try {
    const { userId, amount } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(400).json({ message: 'User not found' });

    if (user.balance < amount) return res.status(400).json({ message: 'Insufficient balance' });

    user.balance -= amount;
    await user.save();

    const transaction = new Transaction({ user: userId, amount, type: 'withdrawal' });
    await transaction.save();
    res.json({ message: 'Withdrawal successful', transaction });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
