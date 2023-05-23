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
    card: Number;
  };
}

export default function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const { card } = req.body;

    if (String(card).length < 16 || String(card).length > 19) {
      return res.status(406).json({
        failed: "The card number length is incorrect",
        wrongInput: "CardNumber",
      });
    }

    if (!Luhns(card)) {
      return res.status(406).json({
        failed: "The card number is incorrect - Luhms.",
        wrongInput: "CardNumber",
      });
    }

    return res.status(200).json({
      success: "Seems to be correct",
    });
  }
}
