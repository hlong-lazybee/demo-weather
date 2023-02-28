import { getCurrentWeather } from '@src/services';
import type { NextApiRequest, NextApiResponse } from 'next';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { city } = req.query;

  if (!city) {
    return res.status(400).send({ error: { message: 'Missing city name' } });
  }

  if (!(typeof city === 'string')) {
    return res
      .status(400)
      .send({ error: { message: 'City must be a string' } });
  }

  const data = await getCurrentWeather(city);
  return res.json(data);
}
