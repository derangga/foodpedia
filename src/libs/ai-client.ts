import { GptRecipeGuide, GptRecipeSuggestions } from "@/model/gpt";
import {
  SUGGESTION_FOOD_PROMPT,
  FOOD_RECIPE_BASED_ON_NAME,
} from "@/utils/system-prompts";
import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPEN_ROUTER_API_KEY,
});

export default openai;

const removeBackticks = (input: string | null) => {
  if (!input) return "";
  return input.replace(/```json\s*|\s*```/g, "");
};

export async function promptSuggestionRecipe(command: string) {
  try {
    const completion = await openai.chat.completions.create({
      model: "google/gemini-2.0-flash-thinking-exp-1219:free",
      messages: [
        { role: "system", content: SUGGESTION_FOOD_PROMPT },
        { role: "user", content: command },
      ],
    });

    const finalOutput = removeBackticks(completion.choices[0].message.content);
    const result = JSON.parse(finalOutput);
    return result as GptRecipeSuggestions;
  } catch (error) {
    console.error(`prompt [ERROR]: ${error}`);
    return null;
  }
}

export async function promptDetailRecipe(command: string) {
  try {
    const completion = await openai.chat.completions.create({
      model: "google/gemini-2.0-flash-thinking-exp-1219:free",
      messages: [
        { role: "system", content: FOOD_RECIPE_BASED_ON_NAME },
        {
          role: "user",
          content: `Can you provide a detail recipe of ${command}`,
        },
      ],
    });

    const finalOutput = removeBackticks(completion.choices[0].message.content);
    const result = JSON.parse(finalOutput);

    // sometimes GPT is not consistent generate array of string
    // const some data might missing due to filter
    const ingredients = result.recipe.ingredients.filter(
      (e: any) => typeof e === "string"
    );

    result.ingredients = ingredients;
    const serializer = result as GptRecipeGuide;
    return serializer;
  } catch (error) {
    console.error(`prompt [ERROR]: ${error}`);
    return null;
  }
}
