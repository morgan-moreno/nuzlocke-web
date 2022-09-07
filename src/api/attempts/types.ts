import { Attempt } from "../models/Attempt";
import { SuccessResponse } from "../types";

export interface GetActiveAttemptResponse
  extends SuccessResponse<{ attempt: Attempt }> {}
