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

    if (new Date() < new Date(date) === false) {
      return res
        .status(406)
        .json({ failed: "The card expiration date is before today" });
    }

    if (
      String(card)[0] == "3" &&
      (String(card)[1] == "4" || String(card)[1] == "7")
    ) {
      if (String(cvv).length != 4) {
        return res
          .status(406)
          .json({ failed: "The card CVV seems to be incorrect" });
      }
    } else {
      if (String(cvv).length != 3) {
        return res
          .status(406)
          .json({ failed: "The card CVV seems to be incorrect" });
      }
    }

    if (String(card).length < 16 || String(card).length > 19) {
      return res
        .status(406)
        .json({ failed: "The card number length is incorrect" });
    }

    if (!Luhns(card)) {
      return res
        .status(406)
        .json({ failed: "The card number is incorrect - Luhms." });
    }

    return res.status(200).json({ success: "The card seems to be correct!" });
  }
}

function Luhns(num: Number) {
  let arr = (num + "")
    .split("")
    .reverse()
    .map((x) => parseInt(x));
  let lastDigit = arr.splice(0, 1)[0];
  let sum = arr.reduce(
    (acc, val, i) => (i % 2 !== 0 ? acc + val : acc + ((val * 2) % 9) || 9),
    0
  );
  sum += lastDigit;
  return sum % 10 === 0;
}
