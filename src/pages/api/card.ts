// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import isDateBeforeToday from "./helpers/isBeforeToday";

type Data = {
  name?: string;
  failed?: string;
  success?: string;
};

interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    card: Number;
    cvv: Number;
    date: any;
  };
}

export default function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const { card, cvv, date } = req.body;
    console.log(card);
    console.log(cvv);
    console.log(date);
    console.log(new Date() < new Date(date));

    if (new Date() < new Date(date) === false) {
      res
        .status(406)
        .json({ failed: "The card expiration date is before today" });
    }

    if (
      String(card)[0] == "3" &&
      (String(card)[1] == "4" || String(card)[1] == "7")
    ) {
      if (String(cvv).length != 4) {
        res.status(406).json({ failed: "The card CVV seems to be incorrect" });
      }
    } else {
      if (String(cvv).length != 3) {
        res.status(406).json({ failed: "The card CVV seems to be incorrect" });
      }
    }

    if (String(card).length < 16 || String(card).length > 19) {
      res.status(406).json({ failed: "The card number length is incorrect" });
    }

    console.log(String(card).length);

    Luhns(card);

    res.status(200).json({ success: "The card seems to be correct!" });
  }
}

function Luhns(card: Number) {
  const payload = String(card).slice(1, -1);
  const key = String(card)[String(card).length - 1];
}
