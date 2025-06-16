import { getPageContent } from "@/app/lib/api";

export default async function OverOnsPage() {
  const data = await getPageContent("over-ons");

  return (
    <div className="min-h-screen flex flex-col items-center   p-4">
      <div className="bg-container p-8 rounded shadow mb-8">
        <h1 className="text-3xl font-bold text-text mb-4">{data.intro}</h1>
        <p className="text-text text-lg mb-4 max-w-4xl">{data.introbody}</p>
      </div>
      <div className="bg-container p-8 rounded shadow">
        <h1 className="text-3xl font-bold text-text mb-4">{data.title}</h1>
        <p className="text-text text-lg mb-4 max-w-4xl">{data.body}</p>
      </div>
    </div>
  );
}
