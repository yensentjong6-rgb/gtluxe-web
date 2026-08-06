type GenderFilterProps = {
  selected: string;
  onSelect: (gender: string) => void;
};

const genders = [
  "All",
  "Women",
  "Men",
];

export default function GenderFilter({
  selected,
  onSelect,
}: GenderFilterProps) {
  return (
    <div className="mb-8">
      <p className="mb-3 text-sm font-medium tracking-[2px] text-gray-500 uppercase">
        Shop By
      </p>

      <div className="flex flex-wrap gap-3">
        {genders.map((gender) => (
          <button
            key={gender}
            onClick={() => onSelect(gender)}
            className={`rounded-full px-4 py-2 transition ${
              selected === gender
                ? "bg-[#8B1E2D] text-white"
                : "border border-gray-300 bg-white text-gray-700 hover:border-[#8B1E2D]"
            }`}
          >
            {gender}
          </button>
        ))}
      </div>
    </div>
  );
}