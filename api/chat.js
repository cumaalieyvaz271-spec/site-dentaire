import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { message } = req.body;
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "Tu es un assistant intelligent pour un cabinet dentaire." },
          { role: "user", content: message }
        ]
      });

      res.status(200).json({ reply: response.choices[0].message.content });
    } catch (err) {
      console.error(err);
      res.status(500).json({ reply: "Désolé, une erreur est survenue." });
    }
  } else {
    res.status(405).json({ reply: "Méthode non autorisée" });
  }
}
