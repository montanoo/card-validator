import { Inter } from "next/font/google";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import Head from "next/head";
import { useEffect, useState } from "react";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  /* React Hook Form initialization, getting errors,
   registering and handling Submit ❤️*/
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  // Useful for finding the response error and highlighting the input that contains the error!
  const [failedInput, setFailedInput] = useState<string[]>([]);
  const [cardNumber, setCardNumber] = useState();
  const [cvv, setCVV] = useState();
  const [date, setDate] = useState();

  /* onSubmit function that will only be triggered 
  once the form's validations (required) are correct.
  
  NOTE: Decided to create a onSubmit function rather than triggering a fetch request
  on every change for performance purposes. IMO, in a project we shouldn't request 
  16+ times when the user inputs its card, even though, this could be avoided using a debouncer, sending
  every piece of information at a time will show errors for the other inputs. (such as, imputing a card number)
  while having an empty CVV.

  Last problem described could be fixed by creating endpoints to different inputs 
  e.g (one input for the card number, one for the cvv, one for expiration)
  */
  const onSubmit = (): any => {};

  useEffect(() => {
    // Creating a debounce to fetch every time the user presses a key (with a delay of 500ms)
    const data = setTimeout(() => {
      // Making the request to the custom endpoint for checking card numbers
      
      // This structure is general boilerplate for following useEffect.
      axios
        .post(`/api/card-number`, {
          card: cardNumber,
        })
        .then((res) => {
          failedInput.includes("CardNumber")
            ? setFailedInput((prev) => {
                return prev.filter((val) => val != "CardNumber");
              })
            : "";
        })
        .catch((err) => {
          if (failedInput.includes("CardNumber")) return;
          setFailedInput((prev) => {
            return [...prev, "CardNumber"];
          });
        });
    }, 500);

    return () => clearTimeout(data);
  }, [cardNumber, failedInput]);

  useEffect(() => {
    const data = setTimeout(() => {
      axios
        .post(`/api/card-cvv`, {
          card: cardNumber,
          cvv: cvv,
        })
        .then((res) => {
          failedInput.includes("CVV")
            ? setFailedInput((prev) => {
                return prev.filter((val) => val != "CVV");
              })
            : "";
        })
        .catch((err) => {
          if (failedInput.includes("CVV")) return;
          setFailedInput((prev) => {
            return [...prev, "CVV"];
          });
        });
    }, 500);

    return () => clearTimeout(data);
  }, [cvv, failedInput, cardNumber]);

  useEffect(() => {
    const data = setTimeout(() => {
      axios
        .post(`/api/card-date`, {
          date: date,
        })
        .then((res) => {
          failedInput.includes("Expiration")
            ? setFailedInput((prev) => {
                return prev.filter((val) => val != "Expiration");
              })
            : "";
        })
        .catch((err) => {
          if (failedInput.includes("Expiration")) return;
          setFailedInput((prev) => {
            return [...prev, "Expiration"];
          });
        });
    }, 500);

    return () => clearTimeout(data);
  }, [date, failedInput]);

  // JSX!
  return (
    <main
      className={`font-inter flex justify-center items-center h-screen ${inter.className}`}
    >
      <Head>
        <title>Card Validator | Fernando Montano</title>
      </Head>
      <article className="max-w-[1300px] mx-auto px-4">
        <section>
          {/* Form section */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-2 gap-5"
          >
            <div className="flex flex-col">
              <label className="font-bold" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                placeholder="Name"
                className={`rounded-lg border-dashed px-2 py-5 text-black ${
                  errors?.name?.type == "required"
                    ? "border-2 border-red-500 hover:border-red-500 outline-none"
                    : "border-2 border-black hover:border-black outline-none"
                }`}
                {...register("name", { required: true })}
              />
            </div>
            <div className="flex flex-col">
              <label className="font-bold" htmlFor="">
                Lastname
              </label>
              <input
                type="text"
                placeholder="Lastname"
                className={`rounded-lg border-dashed px-2 py-5 text-black ${
                  errors?.lastname?.type == "required"
                    ? "border-2 border-red-500 hover:border-red-500 outline-none"
                    : "border-2 border-black hover:border-black outline-none"
                }`}
                {...register("lastname", { required: true })}
              />
            </div>
            {/* Validation won't be made in the Frontend 
            as the whole purpose of the practice is to valide it via backend. */}
            <div className="flex flex-col col-span-2">
              <label className="font-bold" htmlFor="">
                Card number
              </label>
              <input
                type="number"
                placeholder="Card number"
                className={`rounded-lg border-dashed px-2 py-5 text-black col-span-2 ${
                  errors?.cardNumber?.type == "required" ||
                  failedInput.includes("CardNumber")
                    ? "border-2 border-red-500 hover:border-red-500 outline-none"
                    : "border-2 border-black hover:border-black outline-none"
                }`}
                {...register("cardNumber", {
                  required: true,
                  onChange: (e) => {
                    setCardNumber(e.target.value);
                  },
                })}
              />
            </div>
            <div className="flex flex-col">
              <label className="font-bold" htmlFor="">
                Expiration date
              </label>
              <input
                type="date"
                placeholder="Expiration Date"
                className={`rounded-lg border-dashed px-2 py-5 text-black ${
                  errors?.date?.type == "required" ||
                  failedInput.includes("Expiration")
                    ? "border-2 border-red-500 hover:border-red-500 outline-none"
                    : "border-2 border-black hover:border-black outline-none"
                }`}
                {...register("date", {
                  required: true,
                  onChange: (e) => {
                    setDate(e.target.value);
                  },
                })}
              />
            </div>
            <div className="flex flex-col">
              <label className="font-bold" htmlFor="">
                CVV
              </label>
              <input
                type="number"
                placeholder="CVV"
                className={`rounded-lg border-dashed px-2 py-5 text-black ${
                  errors?.cvv?.type == "required" || failedInput.includes("CVV")
                    ? "border-2 border-red-500 hover:border-red-500 outline-none"
                    : "border-2 border-black hover:border-black outline-none"
                }`}
                {...register("cvv", {
                  required: true,
                  onChange: (e) => {
                    setCVV(e.target.value);
                  },
                })}
              />
            </div>
            {/* Submit button which first validates and then sends the request */}
            <button
              type="submit"
              className="w-full bg-black font-bold rounded-lg py-5 text-white col-span-2"
            >
              Check Card
            </button>
            <div>
              <div className="flex flex-col font-bold gap-2 justify-center w-full">
                Errors:
                {failedInput.map((err, key) => {
                  return (
                    <div key={key} className="h-5 font-bold text-red-600">
                      {err}
                    </div>
                  );
                })}
              </div>
            </div>
          </form>
          <Link
            href="/"
            className="flex mt-4 cursor-pointer justify-center underline font-bold bg-white px-5 py-2 rounded-xl"
          >
            <div>Check on submit</div>
          </Link>
        </section>
      </article>
    </main>
  );
}
