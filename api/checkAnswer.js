export const maxDuration = 15; // Vercel hobby limit

export async function POST(req) {
    try {
        const body = await req.json();
        const { question, answer } = body;

        if (!question || !answer) {
            return Response.json({ error: "Missing question or answer" }, { status: 400 });
        }

        const GROQ_API_KEY = process.env.GROQ_API_KEY;

        if (!GROQ_API_KEY) {
            return Response.json({ error: "Server API Key not configured" }, { status: 500 });
        }

        const systemPrompt = `You are a strict but encouraging 10th-grade Math Board Exam evaluator for Telangana State (SSC).
The student is answering the question: "${question}".
Their answer is: "${answer}".
Your ONLY job is to output a single raw JSON object (with NO formatting, markdown, or extra text) containing:
1. "isCorrect": true/false
2. "feedback": A brief 1-2 sentence explanation of why it is right or wrong, offering a hint if wrong.
3. "score": For a 4-mark question, give a score from 0 to 4 based on their steps and final answer.
JSON EXACT FORMAT: {"isCorrect": true, "feedback": "...", "score": 4}`;

        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${GROQ_API_KEY}`
            },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile",
                messages: [{ role: "user", content: systemPrompt }],
                temperature: 0.1,
                response_format: { type: "json_object" }
            })
        });

        if (!response.ok) {
            const errData = await response.json();
            console.error("Groq API Error:", errData);
            return Response.json({ error: "Failed to verify answer with AI" }, { status: response.status });
        }

        const data = await response.json();
        const text = data.choices[0].message.content || "";

        // Clean and parse
        const clean = text.replace(/```json|```/g, "").trim();
        const result = JSON.parse(clean);

        return Response.json(result);

    } catch (error) {
        console.error("Serverless Function Error:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
