import { SetStateAction } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
interface InputDateType {
  selected: Date | null;
  onChange: (
    date: Date | null,
    event?:
      | React.MouseEvent<HTMLElement, MouseEvent>
      | React.KeyboardEvent<HTMLElement>
      | undefined
  ) => void;
  isError: string;
  setIsError: React.Dispatch<SetStateAction<string>>;
  label: string;
}

export default function InputDate({
  selected,
  onChange,
  isError,
  setIsError,
  label,
}: InputDateType) {
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    console.log(selected, typeof selected?.getFullYear());
    if (!selected) {
      setIsError("Required");
    } else if (selected.getFullYear() < 1860) {
      setIsError("Invalid date");
    } else {
      setIsError("");
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-black font-[700]">{label}</label>
      <DatePicker
        className="px-3 py-2 border border-neutral-300 rounded-sm focus:outline-4 focus:outline-blue-200 w-full transition-all duration-300 ease-in-out"
        selected={selected}
        onChange={onChange}
        onBlur={handleBlur}
        placeholderText="DD/MM/YYYY"
      />
      {isError && <p style={{ color: "red" }}>{isError}</p>}
    </div>
  );
}
