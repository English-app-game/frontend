import { BASE_URL} from "../consts/consts";

export const fetchTop = async (setTop, path, text) => {
  try {
    const res = await fetch(`${BASE_URL}${path}`);
    const data = await res.json();
    setTop(data);
  } catch (error) {
    console.error(`Failed to fetch ${text}:`, error);
  }
};

