// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Luhns } from "./card";

type Data = {
  name?: string;
  failed?: string;
  success?: string;
  wrongInput?: string;
};

interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    date: Date;
  };
}

export default function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const { date } = req.body;

    if (new Date() < new Date(date) === false) {
      return res.status(406).json({
        failed: "The card expiration date is before today",
        wrongInput: "Expiration",
      });
    }

    return res.status(200).json({ success: "Card Date seems to be correct" });
  }
}
