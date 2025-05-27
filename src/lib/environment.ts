import { z } from "zod";

const Environment = z.object({
  GOOGLE_CLIENT_ID: z.string().min(1),
  GOOGLE_CLIENT_SECRET: z.string().min(1),
});

const getEnvironment = (() => {
  let instance: z.infer<typeof Environment> | null = null;

  return () => {
    if (!instance) {
      instance = Environment.parse(process.env);
    }
    return instance;
  };
})();

export const env = getEnvironment();
