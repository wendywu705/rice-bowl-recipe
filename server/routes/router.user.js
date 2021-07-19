const express = require('express');

const router = express.Router();

// Authenticate user
router.use((req, res, next) => {
  if (!req.user) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  next();
});

router.get('/current_user', async (req, res) => {
  console.log(req.profile);
  res.send(req.profile);
});

module.exports = router;
