import { BASE_URL} from "../consts/consts";
import { failedToFetch } from "../consts/strings";

export const fetchTop = async (path) => {
  try {
    const res = await fetch(`${BASE_URL}${path}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(failedToFetch, error);
  }
};

