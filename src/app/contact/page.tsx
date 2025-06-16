import React from "react";
import Info from "./info";
import SpecialMessageBanner from "../components/SpecialMessageBanner";

export default function page() {
  return (
    <section className="min-h-screen flex flex-col justify-between">
      <div className="flex flex-col  mx-auto justify-center gap-8 p-4">
        <div>
          <Info />
        </div>
        <div>
          <SpecialMessageBanner />
        </div>

        <div className="bg-container shadow rounded p-4  md:w-[700px]">
          <h2 className="text-2xl text-text font-bold mt-4 ">
            Neem contact met ons op
          </h2>
          <div className="border-b border-border mb-2 w-full" />
          <p className="my-2">
            Heb je vragen of opmerkingen? Neem gerust contact met ons op via
            e-mail of telefoon. We helpen je graag verder!
          </p>
          <div className="flex flex-row justify-evenly items-center mt-4">
            <a
              href="mailto:"
              className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-light "
            >
              E-mail
            </a>

            <a
              href="callto:"
              className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-light"
            >
              Telefoon
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
