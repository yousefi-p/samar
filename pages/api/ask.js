export default async function handler(req, res) {
    if (req.method === "POST") {
        const { text } = req.body;
        const aiResponse = await fetch("http://localhost:5000/ask", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text }),
        }).then((res) => res.json());

        res.status(200).json({ response: aiResponse.response });
    } else {
        res.status(405).end();
    }
}
