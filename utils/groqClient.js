// Small reusable wrapper around the Groq API (free tier), so every AI feature
// on the site — this chat assistant, and later a trip planner — calls through
// one place instead of duplicating fetch logic.

function formatGroqApiError(response, rawText) {
  let apiMessage = rawText || "The AI service is unavailable right now.";

  try {
    const parsed = JSON.parse(rawText);
    apiMessage = parsed?.error?.message || apiMessage;
  } catch (error) {
    // Ignore parse errors and keep the raw text fallback.
  }

  if (response.status === 429) {
    const retryAfter = response.headers.get("retry-after");
    if (retryAfter) {
      return new Error(
        `The guide is temporarily rate-limited. Please try again in about ${retryAfter} seconds.`
      );
    }

    return new Error(
      "The guide is temporarily rate-limited. Please wait a moment and try again."
    );
  }

  if (response.status === 401) {
    return new Error(
      "Groq rejected the API key. Check GROQ_API_KEY in .env and restart the server."
    );
  }

  if (response.status === 403) {
    return new Error(
      "Groq denied this request. Check that the API key is active, the account has API access, and the server can reach api.groq.com."
    );
  }

  return new Error(`Groq API error (${response.status}): ${apiMessage}`);
}

async function askGroq(systemPrompt, userMessage) {
  if (!process.env.GROQ_API_KEY) {
    throw new Error(
      "GROQ_API_KEY is not set. Get a free key at https://console.groq.com and add it to your .env file."
    );
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30000);

  let response;
  try {
    response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.GROQ_MODEL || "openai/gpt-oss-20b",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userMessage },
        ],
        temperature: 0.6,
      }),
      signal: controller.signal,
    });
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error("Groq took too long to respond. Please try again.");
    }

    throw new Error(`Could not reach Groq: ${error.message}`);
  } finally {
    clearTimeout(timeout);
  }

  if (!response.ok) {
    const errText = await response.text();
    throw formatGroqApiError(response, errText);
  }

  const data = await response.json();
  const answer = data.choices?.[0]?.message?.content;
  if (!answer) {
    throw new Error("Groq returned an empty answer. Please try again.");
  }

  return answer;
}

module.exports = { askGroq };
