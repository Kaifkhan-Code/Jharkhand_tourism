const Place = require("../models/place");
const { askGroq } = require("../utils/groqClient");

// GET /assistant — render the chat page
module.exports.renderChat = (req, res) => {
  res.render("assistant/chat", { answer: null, question: null, error: null });
};

// POST /assistant — answer a free-text question, grounded in real places only
module.exports.ask = async (req, res) => {
  const { question } = req.body;

  try {
    const places = await Place.find({}).select("name district category tourismType bestSeason description");

    const systemPrompt = `You are a friendly Jharkhand tourism assistant. Only recommend places from
the list below — never invent places that aren't in it. Keep answers short (3-5 sentences), warm,
and practical. If nothing in the list fits the question, say so honestly.

Places available:
${places.map((p) => `- ${p.name} (${p.district}, ${p.category}, ${p.tourismType}, best in ${p.bestSeason}): ${p.description}`).join("\n")}`;

    const answer = await askGroq(systemPrompt, question);
    res.render("assistant/chat", { answer, question, error: null });
  } catch (err) {
    res.render("assistant/chat", { answer: null, question, error: err.message });
  }
};
