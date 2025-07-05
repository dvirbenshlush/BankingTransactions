const express = require('express');
const { getMatchScore } = require('../controllers/match.controller');
const router = express.Router();

// POST /match
router.post('/', getMatchScore);

export default router; // ⚠️ זה חשוב!
