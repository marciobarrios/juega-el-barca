export default async function handler(req, res) {
  const teamId = 81; // FC Barcelona
  const apiKey = process.env.FOOTBALL_API_KEY;

  const today = new Date().toISOString().split('T')[0];
  const twoWeeks = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  const response = await fetch(
    `https://api.football-data.org/v4/teams/${teamId}/matches?dateFrom=${today}&dateTo=${twoWeeks}`,
    { headers: { 'X-Auth-Token': apiKey } }
  );

  const data = await response.json();

  // 3h cache on edge/CDN
  res.setHeader('Cache-Control', 's-maxage=10800, stale-while-revalidate');

  res.status(200).json(data);
}
