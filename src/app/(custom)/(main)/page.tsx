import Article from "./components/estimate";

export default function FormElements() {
  return (
    <div>
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="space-y-6">
          <Article />
        </div>
      </div>
    </div>
  );
}
