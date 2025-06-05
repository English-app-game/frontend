import { BASE_URL} from "../consts/consts";

export const fetchTop = async (path) => {
  try {
    const res = await fetch(`${BASE_URL}${path}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch:", error);
  }
};

