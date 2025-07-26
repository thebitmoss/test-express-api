const express = require('express');
const router = express.Router();
const prisma = require('../prisma')

// GET /users
router.get('/', async (req, res) => {
  const users = await prisma.user.findMany()
  res.json(users)
})

// POST /users
router.post('/', async (req, res) => {
  try {
    const { name, email } = req.body

    // バリデーション（簡易）
    if (!name || !email) {
      return res.status(400).json({ error: 'name and email are required' })
    }

    const user = await prisma.user.create({
      data: { name, email }
    })

    res.status(201).json(user)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

module.exports = router;
