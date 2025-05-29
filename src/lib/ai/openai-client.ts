import OpenAI from "openai";
import { askingRecipePrompt, CHEF_AI_PROMPT } from "./prompt";
import { env } from "../environment";
import GptMessageResponse from "@/models/gpt";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: env.OPEN_ROUTER_API_KEY,
});

const removeBackticks = (input: string | null) => {
  if (!input) return "";
  return input.replace(/```json\s*|\s*```/g, "");
};

export async function promptSuggestionRecipe(command: string) {
  try {
    const completion = await openai.chat.completions.create({
      model: "qwen/qwen3-32b:free",
      messages: [
        { role: "system", content: CHEF_AI_PROMPT },
        { role: "user", content: command },
      ],
      response_format: { type: "json_object" },
    });

    const finalOutput = removeBackticks(completion.choices[0].message.content);
    const response: GptMessageResponse = JSON.parse(finalOutput);
    return response;
  } catch (error) {
    console.error(`prompt [ERROR]: ${error}`);
    return null;
  }
}

export async function promptAskRecipe(language: string, command: string) {
  try {
    const completion = await openai.chat.completions.create({
      model: "qwen/qwen3-32b:free",
      messages: [
        { role: "system", content: askingRecipePrompt(language) },
        { role: "user", content: command },
      ],
      response_format: { type: "json_object" },
    });

    const finalOutput = removeBackticks(completion.choices[0].message.content);
    const response: GptMessageResponse = JSON.parse(finalOutput);
    return response;
  } catch (error) {
    console.error(`prompt [ERROR]: ${error}`);
    return null;
  }
}
