import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyDtDwJxz2Pfo8Iybk_4oT-jKe6HacDfDnY";
const genAI = new GoogleGenerativeAI(API_KEY);

async function listModels() {
    try {
        // There isn't a direct listModels method on the client in all versions, 
        // but we can try to just run a generation with gemini-1.5-flash to prove it works.
        // Explicitly testing gemini-1.5-flash
        console.log("Testing gemini-1.5-flash...");
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent("Hello, are you online?");
        console.log("Success! gemini-1.5-flash response:", result.response.text());
    } catch (error) {
        console.error("gemini-1.5-flash failed:", error.message);
    }

    try {
        console.log("\nTesting gemini-pro...");
        const modelPro = genAI.getGenerativeModel({ model: "gemini-pro" });
        const resultPro = await modelPro.generateContent("Hello, are you online?");
        console.log("Success! gemini-pro response:", resultPro.response.text());
    } catch (error) {
        console.error("gemini-pro failed:", error.message);
    }
}

listModels();
