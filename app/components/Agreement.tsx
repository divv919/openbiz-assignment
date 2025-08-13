import React from "react";

interface AgreementType {
  //   id: string;
  isChecked: boolean;
  label: string;
  error: string;
  setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
  disabled: boolean;
}
export default function Agreement({
  isChecked,
  setIsChecked,
  label,
  error,
  disabled,
}: AgreementType) {
  return (
    <div className="text-justify">
      <input
        // id={id}
        disabled={disabled}
        type="checkbox"
        checked={isChecked}
        onChange={(e) => setIsChecked(!!e.target.checked)}
        className="inline-block align-top mt-1 mr-2"
      ></input>
      <label className="inline text-justify ">{label}</label>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
