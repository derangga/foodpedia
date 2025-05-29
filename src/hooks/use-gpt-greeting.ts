import { useEffect, useState } from "react";

export type Greeting = {
  title: string;
  description: string;
};

// generate a random greeting based on the input
export function useGreeting(greetings: Greeting[]) {
  const [randomString, setRandomString] = useState<Greeting>({
    title: "",
    description: "",
  });
  useEffect(() => {
    if (!greetings || greetings.length === 0) {
      return;
    }

    const randomIndex = Math.floor(Math.random() * greetings.length);
    setRandomString(greetings[randomIndex]);
  }, [greetings]);

  return randomString;
}
