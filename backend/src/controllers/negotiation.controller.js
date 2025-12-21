const { genAI } = require('../config/gemini');

exports.generateNegotiation = async (req, res) => {
  try {
    const {
      type,       // 'email' | 'whatsapp' | 'call'
      purpose,    // 'salary' | 'rent' | 'bill' | 'refund'
      amount,
      currentAmount,
      tone,       // 'polite' | 'firm' | 'aggressive'
      context
    } = req.body;

    const promptMap = {
      email: `Write a ${tone}, professional EMAIL to negotiate ${purpose}.`,
      whatsapp: `Write a ${tone}, concise WHATSAPP message to negotiate ${purpose}.`,
      call: `Write a ${tone} PHONE CALL script to negotiate ${purpose}.`
    };

    const prompt = `
You are a negotiation expert.
Be confident, respectful, and effective.

${promptMap[type]}

Current Amount: ₹${currentAmount}
Target Amount: ₹${amount}

Context:
${context}

Rules:
- Keep it realistic and human
- No emojis
- Clear ask and justification
- End with a positive closing

Return ONLY the message/script.
`;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash"
    });

    const result = await model.generateContent(prompt);
    const generatedText = result.response.text();

    res.json({
      message: 'Negotiation message generated',
      type,
      tone,
      purpose,
      generatedMessage: generatedText,
      tips: [
        '🎯 Be confident but respectful',
        '📊 Use data to support your request',
        '⏰ Choose the right timing',
        '🤝 Aim for win-win outcomes'
      ]
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
