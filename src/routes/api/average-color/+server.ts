import { json, type RequestHandler } from '@sveltejs/kit';
import sharp from 'sharp';

export const GET: RequestHandler = async ({ url, fetch }) => {
  const imageURL = url.searchParams.get('image');

  if (!imageURL) return json({ color: null });

  const image = await fetch(imageURL).then((res) => res.arrayBuffer());
  const stats = await sharp(Buffer.from(image)).stats();
  const [r, g, b] = stats.channels.map((c) => c.mean);
  return json({ color: `rgb(${r}, ${g}, ${b})` });
};
