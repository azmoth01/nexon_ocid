export default async function handler(req, res) {
  const { character_name } = req.query;

  if (!character_name) {
    return res.status(400).json({
      error: "character_name is required"
    });
  }

  try {
    const response = await fetch(
      `https://open.api.nexon.com/maplestory/v1/id?character_name=${encodeURIComponent(character_name)}`,
      {
        headers: {
          "x-nxopen-api-key": process.env.NEXON_API_KEY
        }
      }
    );

    const data = await response.json();

    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch ocid"
    });
  }
}
