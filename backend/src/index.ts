import express from 'express';
import * as tf from '@tensorflow/tfjs';
import * as toxicity from '@tensorflow-models/toxicity';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors({
    origin: 'http://localhost:8080'
  }));

app.use(bodyParser.json());

app.post('/classify', async (req, res) => {
    const toxicityLabels = [
        'identity_attack',
        'insult',
        'obscene',
        'severe_toxicity',
        'sexual_explicit',
        'threat',
        'toxicity'
      ];
  const { text } = req.body;

  if (!text) {
    return res.status(400).send('Text is required');
  }

  const threshold = 0.9;
  const model = await toxicity.load(threshold, toxicityLabels);

  const predictions = await model.classify([text]);

  res.json(predictions);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
