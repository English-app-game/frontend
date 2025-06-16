import { useEffect, useState } from "react";

export default function useWords() {
  const [words, setWords] = useState([]);

  useEffect(() => {
    fetch("https://random-word-api.vercel.app/api?words=500&swear=0")
      .then((r) => r.json())
      .then(setWords)
      .catch(console.error);
  }, []);

  return words;
}
