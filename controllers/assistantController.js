const Place = require("../models/place");
const { askGroq } = require("../utils/groqClient");

function escapeHtml(value = "") {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function selectPromptPlaces(places, question) {
  const terms = question
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((term) => term.length > 2);

  const rankedPlaces = places
    .map((place) => {
      const searchable = [
        place.name,
        place.district,
        place.category,
        place.tourismType,
        place.bestSeason,
        place.description,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const score = terms.reduce(
        (total, term) => total + (searchable.includes(term) ? 1 : 0),
        0
      );

      return { place, score };
    })
    .sort((a, b) => b.score - a.score);

  return rankedPlaces.slice(0, 40).map(({ place }) => place);
}

function formatGuideAnswer(rawAnswer, places) {
  if (!rawAnswer) return "";

  const placeNames = [...new Set(places.map((place) => place.name).filter(Boolean))]
    .sort((a, b) => b.length - a.length);

  const preservedLinks = [];
  let normalizedAnswer = rawAnswer.replace(/\[([^\]]+)\]\((\/[^)]+)\)/g, (match, label, href) => {
    const token = `__GUIDE_LINK_${preservedLinks.length}__`;
    preservedLinks.push(`<a href="${href}" class="guide-place-link">${escapeHtml(label)}</a>`);
    return token;
  });

  normalizedAnswer = escapeHtml(normalizedAnswer).replace(/\n/g, "<br>");

  for (const placeName of placeNames) {
    const regex = new RegExp(`(^|[^A-Za-z0-9])(${escapeRegExp(placeName)})(?=$|[^A-Za-z0-9])`, "gi");
    normalizedAnswer = normalizedAnswer.replace(regex, (match, prefix, matchedName) => {
      const href = `/places?area=${encodeURIComponent(placeName)}`;
      return `${prefix}<a href="${href}" class="guide-place-link">${matchedName}</a>`;
    });
  }

  normalizedAnswer = normalizedAnswer.replace(/__GUIDE_LINK_(\d+)__/g, (_, index) => preservedLinks[Number(index)] || "");

  return normalizedAnswer;
}

// GET /assistant — render the chat page
module.exports.renderChat = (req, res) => {
  res.render("assistant/chat", { answer: null, question: null, error: null });
};

// POST /assistant — answer a free-text question, grounded in real places only
module.exports.ask = async (req, res) => {
  const { question } = req.body;
  const submittedQuestion = question?.trim();

  try {
    const places = await Place.find({}).select("name district category tourismType bestSeason description");
    const promptPlaces = selectPromptPlaces(places, submittedQuestion || "");

    const systemPrompt = `You are a friendly Jharkhand tourism assistant. Only recommend places from
the list below — never invent places that aren't in it. Keep answers short (3-5 sentences), warm,
and practical. If nothing in the list fits the question, say so honestly.

Formatting rules:
- Write in polished travel-guide prose, not in quotation-heavy or awkward text.
- When you mention a place, format it as a markdown link using this exact pattern: [Patratu Valley](/places?area=Patratu%20Valley).
- Do not use double apostrophes or quoted fragments like “Patratu Valley” or 'Patratu Valley'.
- Use a natural, readable style with place names embedded smoothly in the sentence.
- Keep the answer friendly, scenic, and actionable.

Places available:
${promptPlaces.map((p) => `- ${p.name} (${p.district}, ${p.category}, best in ${p.bestSeason}): ${String(p.description || "").slice(0, 100)}`).join("\n")}`;

    const answer = await askGroq(systemPrompt, submittedQuestion);
    const answerHtml = formatGuideAnswer(answer, places);

    res.render("assistant/chat", { answer: answerHtml, question: null, submittedQuestion, error: null });
  } catch (err) {
    res.render("assistant/chat", { answer: null, question: null, submittedQuestion: submittedQuestion || null, error: err.message });
  }
};
