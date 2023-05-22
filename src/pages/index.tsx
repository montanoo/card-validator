import Image from "next/image";
import { Inter } from "next/font/google";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useEffect } from "react";
import Swal from "sweetalert2";
import isDateBeforeToday from "./api/helpers/isBeforeToday";
import Head from "next/head";

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

  /* onSubmit function that will only be triggered 
  once the form's validations (required) are correct.*/
  const onSubmit = (): any => {
    const values = getValues(); // Getting the values from the React Hook Form
    axios // Axios post request to my custom endpoint /api/card in which I send the card information.
      .post("/api/card", {
        card: values.cardNumber,
        cvv: values.cvv,
        date: new Date(values.date),
      })
      .then((res) => {
        // If the request is completed correctly (status 200), Fire Sweet Alert to show me a success modal.
        Swal.fire({
          title: "Success!",
          text: res?.data?.success,
          icon: "success",
          confirmButtonText: "Cool",
        });
      })
      // If the request is completed correctly (status 406), Fire Sweet Alert to show me an error modal.
      .catch((err) => {
        console.log(err?.response?.data);
        Swal.fire({
          title: "Error!",
          text: err?.response?.data?.failed,
          icon: "error",
          confirmButtonText: "Cool",
        });
      });
  };

  // JSX!
  return (
    <main
      className={`font-inter flex justify-center items-center bg-gray-600 h-screen ${inter.className}`}
    >
      <Head>
        <title>Card Validator | Fernando Montano</title>
      </Head>
      <article className="max-w-[1300px] mx-auto">
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
                className={`rounded-xl px-2 py-5 text-gray-500 ${
                  errors?.name?.type == "required"
                    ? "border border-red-500 hover:border-red-500 outline-none"
                    : "border border-black hover:border-black outline-none"
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
                className={`rounded-xl px-2 py-5 text-gray-500 ${
                  errors?.lastname?.type == "required"
                    ? "border border-red-500 hover:border-red-500 outline-none"
                    : "border border-black hover:border-black outline-none"
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
                className={`rounded-xl px-2 py-5 text-gray-500 col-span-2 ${
                  errors?.cardNumber?.type == "required"
                    ? "border border-red-500 hover:border-red-500 outline-none"
                    : "border border-black hover:border-black outline-none"
                }`}
                {...register("cardNumber", { required: true })}
              />
            </div>
            <div className="flex flex-col">
              <label className="font-bold" htmlFor="">
                Expiration date
              </label>
              <input
                type="date"
                placeholder="Expiration Date"
                className={`rounded-xl px-2 py-5 text-gray-500 ${
                  errors?.date?.type == "required"
                    ? "border border-red-500 hover:border-red-500 outline-none"
                    : "border border-black hover:border-black outline-none"
                }`}
                {...register("date", { required: true })}
              />
            </div>
            <div className="flex flex-col">
              <label className="font-bold" htmlFor="">
                CVV
              </label>
              <input
                type="number"
                placeholder="CVV"
                className={`rounded-xl px-2 py-5 text-gray-500 ${
                  errors?.cvv?.type == "required"
                    ? "border border-red-500 hover:border-red-500 outline-none"
                    : "border border-black hover:border-black outline-none"
                }`}
                {...register("cvv", { required: true })}
              />
            </div>
            {/* Submit button which first validates and then sends the request */}
            <button
              type="submit"
              className="w-full bg-black font-bold rounded-xl py-5 text-white col-span-2"
            >
              Send data
            </button>
          </form>
        </section>
      </article>
    </main>
  );
}
