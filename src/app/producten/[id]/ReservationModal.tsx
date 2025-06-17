"use client";
import React, { useState } from "react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

export default function ReservationModal({
  productId,
  productPrice,
  maxAmount,
  open,
  onClose,
}: {
  productId: number;
  productPrice: number;
  maxAmount: number; // <-- voeg toe!
  open: boolean;
  onClose: () => void;
}) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    amount: 1,
    note: "",
  });
  const [message, setMessage] = useState("");

  if (!open) return null;

  const total = form.amount && productPrice ? form.amount * productPrice : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Blur background */}
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Modal */}
      <div className="relative bg-container rounded-lg shadow-lg p-8 z-10 w-full max-w-md">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-black text-2xl"
          onClick={onClose}
          aria-label="Sluit"
        >
          &times;
        </button>
        <h3 className="font-bold mb-2 text-lg">Dit product reserveren</h3>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setMessage("");
            const res = await fetch("/api/reservations", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                productId,
                ...form,
              }),
            });
            if (res.ok) {
              setMessage("Reservering geplaatst!");
              setForm({ name: "", email: "", phone: "", amount: 1, note: "" });
            } else {
              setMessage("Er ging iets mis.");
            }
          }}
          className="flex flex-col gap-2"
        >
          <input
            required
            type="text"
            placeholder="Naam"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className="border p-2 rounded"
          />
          <input
            required
            type="email"
            placeholder="E-mail"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            className="border p-2 rounded"
          />
          <input
            required
            type="tel"
            placeholder="Telefoonnummer"
            value={form.phone}
            onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
            className="border p-2 rounded"
          />
          <div className="flex items-center gap-2">
            <input
              required
              type="number"
              min={1}
              max={maxAmount}
              placeholder="Aantal"
              value={form.amount}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  amount: Math.max(
                    1,
                    Math.min(Number(e.target.value), maxAmount)
                  ),
                }))
              }
              className="border p-2 rounded w-24"
            />
            <span className="ml-2 bg-green-100 text-green-700 px-3 py-1 rounded font-semibold flex items-center gap-1 shadow-sm">
              <span>
                {form.amount} x €{productPrice.toFixed(2)}
              </span>
              <span className="mx-1">=</span>
              <span className="text-green-900 font-bold text-lg">
                €{total.toFixed(2)}
              </span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="note" className="flex items-center gap-1">
              <span>Opmerking</span>
              <div className="relative group">
                <InformationCircleIcon className="w-5 h-5 text-gray-400 cursor-pointer" />
                <span className="absolute left-6 top-1/2 -translate-y-1/2 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-10">
                  Bijvoorbeeld: gewenste ophaaldatum of andere wensen
                </span>
              </div>
            </label>
          </div>
          <textarea
            id="note"
            placeholder="Bijvoorbeeld: Ik wil het product zaterdag ophalen."
            value={form.note}
            onChange={(e) => setForm((f) => ({ ...f, note: e.target.value }))}
            className="border p-2 rounded"
            rows={2}
          />
          {/* Melding over maximale reserveringsduur */}
          <div className="text-xs text-gray-500 mt-1">
            Let op: Een product kan maximaal{" "}
            <span className="font-semibold">5 dagen</span> voor je gereserveerd
            blijven.
          </div>
          <button
            type="submit"
            className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-light"
          >
            Dit product reserveren
          </button>
          {message && (
            <div
              className={`mt-2 px-3 py-2 rounded font-semibold text-center ${
                message === "Reservering geplaatst!"
                  ? "bg-green-100 text-green-800 border border-green-400"
                  : "bg-red-100 text-red-800 border border-red-400"
              }`}
            >
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
