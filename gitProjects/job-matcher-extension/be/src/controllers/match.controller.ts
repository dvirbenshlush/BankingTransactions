import { Request, Response } from 'express';
import { generateMatchScore } from '../services/match.service';
import { MatchRequestBody } from '../models/match-request.model';


export const getMatchScore = async (
  req: Request<{}, {}, MatchRequestBody>,
  res: Response
): Promise<void> => {
  const { resume, preferences, jobDesc } = req.body;

  try {
    const result = await generateMatchScore(resume, preferences, jobDesc);
    res.json(result);
  } catch (err) {
    if (err instanceof Error) {
      console.error('❌ Error in matchController:', err.message);
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'Unknown error' });
    }
  }
};
