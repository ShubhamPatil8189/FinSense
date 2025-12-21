const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

/**
 * Enhanced helper with Error Handling for Quotas
 */
const generateFinancialInsight = async (prompt) => {
  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    // Check if the error is a Rate Limit (429)
    if (error.status === 429 || error.message.includes('429')) {
      console.warn("⚠️ Gemini API Rate Limit Hit. Providing fallback advice.");
      return "Note: Our AI is processing many requests. General Advice: Focus on high-interest debt first and maintain an emergency fund of 3-6 months of expenses.";
    }
    
    console.error("Gemini Error:", error);
    return "AI is temporarily unavailable. Please try again in a few minutes.";
  }
};

module.exports = { generateFinancialInsight, genAI };