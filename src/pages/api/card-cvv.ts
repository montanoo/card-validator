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
    cvv: Number;
  };
}

export default function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const { card, cvv } = req.body;

    if (
      String(card)[0] == "3" &&
      (String(card)[1] == "4" || String(card)[1] == "7")
    ) {
      if (String(cvv).length != 4) {
        return res.status(406).json({
          failed: "The card CVV seems to be incorrect",
          wrongInput: "CVV",
        });
      }
    } else {
      if (String(cvv).length != 3) {
        return res.status(406).json({
          failed: "The card CVV seems to be incorrect",
          wrongInput: "CVV",
        });
      }
    }

    return res.status(200).json({ success: "Card CVV seems to be correct" });
  }
}
