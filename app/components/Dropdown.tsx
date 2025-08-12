import { organisationTypes } from "@/app/util";

interface DropdownInput {
  options: string[];
  label: string;
  isError: string;
  setIsError: React.Dispatch<React.SetStateAction<string>>;
  dropdownValue: string;
  setDropdownValue: React.Dispatch<React.SetStateAction<string>>;
  ref: React.Ref<HTMLSelectElement> | undefined;
}
export default function Dropdown({
  options,
  label,
  isError,
  setIsError,
  dropdownValue,
  setDropdownValue,
  ref,
}: DropdownInput) {
  const handleBlur = (e: React.FocusEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === organisationTypes[0]) {
      setIsError("Required");
    }
  };
  return (
    <div className="flex flex-col gap-2">
      <label className="text-black font-[700]">{label}</label>
      <select
        // defaultValue={options[0]}
        // onBlur={handleBlur}
        ref={ref}
        className="px-3 py-2 border border-neutral-300 transition-all duration-100 ease-in-out rounded-sm focus:outline-4 focus:outline-blue-200"
        value={dropdownValue}
        onChange={(e) => setDropdownValue(e.target.value)}
      >
        {options.map((option, idx) => (
          <option key={"option-" + idx}>{option}</option>
        ))}
      </select>
      {isError && <p style={{ color: "red" }}>{isError}</p>}
    </div>
  );
}
