export interface GptMessageResponse {
  answer_type: string;
  language_use: string;
  answer: string | GptRecipeSuggestions[];
}

export interface GptRecipeSuggestions {
  title: string;
  categories: string[];
}

export default GptMessageResponse;
