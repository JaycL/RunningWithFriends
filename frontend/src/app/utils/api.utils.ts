import { ApiResponse } from "../core/models/api.model.js";
import { map } from "rxjs";

export function mapApiData<T>() {
  return map((res: ApiResponse<T>) => res.data);
}

