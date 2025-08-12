type InputType = "Name" | "PAN" | "ADHAAR";

const validationForType: Record<
  InputType,
  { maxLength: number; pattern: string }
> = {
  Name: {
    maxLength: 100,
    pattern: "^[\\w\\W]{1,100}$",
  },
  PAN: {
    maxLength: 10,
    pattern: "^[A-Z]{5}[0-9]{4}[A-Z]$",
  },
  ADHAAR: {
    maxLength: 12,
    pattern: "^[\\w\\W]{1,100}$",
  },
};

export default function Input({
  label,
  type = "Name",
  isError,
  setIsError,
  ref,
  inputValue,
  setInputValue,
  placeholder,
}: {
  label: string;
  type: InputType;
  isError: string;
  setIsError: React.Dispatch<React.SetStateAction<string>>;
  ref: React.Ref<HTMLInputElement> | undefined;
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
}) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (type === "ADHAAR" && isNaN(Number(value))) {
      return;
    }
    setInputValue(value);
  };
  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "") {
      setIsError("Required");
      return;
    } else {
      setIsError("");
    }
    const { pattern, maxLength } = validationForType[type];
    const regex = new RegExp(pattern);
    if (!regex.test(value)) {
      setIsError(`Invalid ${type}`);
    } else {
      setIsError("");
    }
    if (value.length > maxLength) {
      setIsError(`${type} exceeds max length`);
    }
  };
  return (
    <div className="flex flex-col gap-1">
      <label className="text-black font-[700]">{label}</label>
      <input
        placeholder={placeholder}
        onBlur={handleBlur}
        ref={ref}
        type={"text"}
        maxLength={validationForType[type].maxLength}
        pattern={validationForType[type].pattern}
        value={inputValue}
        onChange={handleChange}
        className="px-3 py-2 border border-neutral-300 rounded-sm w-full"
      />
      {isError && <p style={{ color: "red" }}>{isError}</p>}
    </div>
  );
}
