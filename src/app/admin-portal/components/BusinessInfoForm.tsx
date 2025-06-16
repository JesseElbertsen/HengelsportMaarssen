"use client";
import React, { useEffect, useState } from "react";
import type { BusinessInfo, OpeningHours } from "@/app/types/types";

const defaultOpeningHours: OpeningHours = {
  maandag: "",
  dinsdag: "",
  woensdag: "",
  donderdag: "",
  vrijdag: "",
  zaterdag: "",
  zondag: "",
};

export default function BusinessInfoForm() {
  const [info, setInfo] = useState<BusinessInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/business-info")
      .then((res) => res.json())
      .then((data) => {
        setInfo({
          ...data,
          openingHours: data?.openingHours || defaultOpeningHours,
        });
        setLoading(false);
      });
  }, []);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setInfo((prev) =>
      prev
        ? {
            ...prev,
            [e.target.name]: e.target.value,
          }
        : prev
    );
  }

  function handleOpeningHoursChange(day: string, value: string) {
    setInfo((prev) =>
      prev
        ? {
            ...prev,
            openingHours: { ...prev.openingHours, [day]: value },
          }
        : prev
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!info) return;
    setSaving(true);
    setMessage("");
    const res = await fetch("/api/business-info", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(info),
    });
    setMessage(res.ok ? "Gegevens opgeslagen!" : "Opslaan mislukt.");
    setSaving(false);
  }

  if (loading) return <div>Gegevens laden...</div>;
  if (!info) return <div>Geen gegevens gevonden.</div>;

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-5xl mx-auto bg-container rounded shadow p-4"
    >
      <div className="flex flex-row gap-8">
        <div className="flex-1 w-1/2">
          <h2 className="text-xl font-bold mb-2">Bedrijfsgegevens aanpassen</h2>
          <div className="grid grid-cols-1 gap-2">
            <input
              name="adres"
              value={info.adres}
              onChange={handleChange}
              className="border border-border p-2 rounded bg-container-light"
              placeholder="Adres"
            />
            <input
              name="postcode"
              value={info.postcode}
              onChange={handleChange}
              className="border border-border p-2 rounded bg-container-light"
              placeholder="Postcode"
            />
            <input
              name="locatie"
              value={info.locatie}
              onChange={handleChange}
              className="border border-border p-2 rounded bg-container-light"
              placeholder="Locatie"
            />
            <input
              name="telefoon"
              value={info.telefoon}
              onChange={handleChange}
              className="border border-border p-2 rounded bg-container-light"
              placeholder="Telefoon"
            />
            <input
              name="email"
              value={info.email}
              onChange={handleChange}
              className="border border-border p-2 rounded bg-container-light"
              placeholder="E-mail"
            />
            <input
              name="kvk"
              value={info.kvk}
              onChange={handleChange}
              className="border border-border p-2 rounded bg-container-light"
              placeholder="KvK"
            />
            <input
              name="btw"
              value={info.btw}
              onChange={handleChange}
              className="border border-border p-2 rounded bg-container-light"
              placeholder="BTW"
            />
          </div>
        </div>

        <div className="flex-1 w-1/2">
          <h3 className="text-lg font-bold mt-4">Openingstijden</h3>
          <div className="grid grid-cols-1 gap-2">
            {Object.keys(defaultOpeningHours).map((dag) => (
              <div key={dag} className="flex gap-2 items-center">
                <label className="w-24 capitalize">{dag}:</label>
                <input
                  type="text"
                  value={info.openingHours[dag as keyof OpeningHours] || ""}
                  onChange={(e) =>
                    handleOpeningHoursChange(dag, e.target.value)
                  }
                  className="border border-border p-2 rounded flex-1 bg-container-light"
                  placeholder="Bijv. 9:00 - 18:00 of Gesloten"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-bold mt-4">Speciaal Bericht</h3>
        <textarea
          name="specialMessage"
          value={info.specialMessage || ""}
          onChange={handleChange}
          className="border border-border p-2 rounded bg-container-light w-full my-[1rem]"
          placeholder="Speciaal bericht (bijv. feestdagen, aankondigingen)"
          rows={3}
        />
      </div>
      <button
        type="submit"
        className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-light"
        disabled={saving}
      >
        {saving ? "Opslaan..." : "Opslaan"}
      </button>
      {message && <div className="mt-2">{message}</div>}
    </form>
  );
}
