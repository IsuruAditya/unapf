import { handleSubmission } from "@/lib/submit";

export const POST = (req: Request) => handleSubmission(req, "contact");
