import { useRef, useState } from "react";
import Agreement from "./Agreement";
import Dropdown from "./Dropdown";
import Input from "./Input";
import Button from "./Button";
import { organisationTypes } from "@/app/util";
import InputDate from "./InputDate";

export default function PanVerificationCard({
  setCurrentStep,
  aadhaarValue,
}: {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  aadhaarValue: string;
}) {
  const [isChecked, setIsChecked] = useState(false);
  const [agreementError, setAgreementError] = useState("");
  const [panError, setPanError] = useState("");
  const [nameError, setNameError] = useState("");
  const [DOBError, setDOBError] = useState("");
  const [dropdownError, setDropdownError] = useState("");
  const [dropdownValue, setDropdownValue] = useState(organisationTypes[0]);
  const [nameValue, setNameValue] = useState("");
  const [panValue, setPanValue] = useState("");
  const [DOBValue, setDOBValue] = useState<Date | null>(null);

  const panRef = useRef<HTMLInputElement | null>(null);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const dobRef = useRef<HTMLInputElement | null>(null);
  const dropdownRef = useRef<HTMLSelectElement | null>(null);
  const handleSubmit = async () => {
    let hasError = false;

    if (dropdownValue === organisationTypes[0]) {
      setDropdownError("Required");
      hasError = true;
    } else {
      setDropdownError("");
    }

    if (panValue === "") {
      setPanError("Required");
      hasError = true;
    } else {
      setPanError("");
    }

    if (nameValue === "") {
      setNameError("Required");
      hasError = true;
    } else {
      setNameError("");
    }

    if (!DOBValue) {
      setDOBError("Required");
      hasError = true;
    } else {
      setDOBError("");
    }

    if (!isChecked) {
      setAgreementError("You must Agree Declarations.");
      hasError = true;
    } else {
      setAgreementError("");
    }

    console.log("has error", hasError);
    if (hasError) return;

    try {
      const res = await fetch("/api/pan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          aadhaar: aadhaarValue,
          panName: nameValue,
          pan: panValue,
          type: (dropdownValue.match(/^(\d+)\./)?.[1] ?? "").trim(),
          dob: DOBValue?.toISOString(),
        }),
      });

      if (!res.ok) throw new Error();

      const parsed = await res.json();
      if (parsed.success) {
        alert(parsed.message);
        setCurrentStep(parsed.user.currentStep);
      }
    } catch (err) {
      console.log("Error posting pan details", err);
    }
  };

  return (
    <article className="shadow-2xl mt-6 mx-4 md:mx-[30px] lg:mx-[36px] xl:mx-[160px]">
      <header className="bg-[#28A745] text-[17.6px] py-3 px-5 text-white rounded-t-sm">
        PAN Verification
      </header>

      <div className="p-5 flex flex-col items-start gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <Dropdown
            ref={dropdownRef}
            isError={dropdownError}
            setIsError={setDropdownError}
            dropdownValue={dropdownValue}
            setDropdownValue={setDropdownValue}
            label="3. Type of Organisation / संगठन के प्रकार"
            options={organisationTypes}
          ></Dropdown>
          <Input
            placeholder="ENTER PAN NUMBER"
            inputValue={panValue}
            setInputValue={setPanValue}
            setIsError={setPanError}
            isError={panError}
            ref={panRef}
            label="4.1 PAN/ पैन"
            type="PAN"
          />
          <Input
            placeholder="Name as per PAN"
            inputValue={nameValue}
            ref={nameRef}
            isError={nameError}
            setIsError={setNameError}
            setInputValue={setNameValue}
            label="4.1.1 Name of PAN Holder / पैन धारक का नाम"
            type="Name"
          />

          <InputDate
            label="4.1.2 DOB or DOI as per PAN / पैन के अनुसार जन्म तिथि या निगमन तिथि"
            isError={DOBError}
            setIsError={setDOBError}
            selected={DOBValue}
            onChange={(date: Date | null) => {
              const today = new Date();
              today.setHours(0, 0, 0, 0);
              if (date && date > today) {
                alert("You can not select future Date");
                return;
              }
              if (date && date.getFullYear() < 1860) {
                setDOBError("Invalid date");
              } else {
                setDOBError("");
              }
              setDOBValue(date);
            }}
          />
        </div>
        <Agreement
          error={agreementError}
          isChecked={isChecked}
          setIsChecked={setIsChecked}
          label="  I, the holder of the above PAN, hereby give my consent to Ministry of MSME, Government of India, for using my data/ information available in the Income Tax Returns filed by me, and also the same available in the GST Returns and also from other Government organizations, for MSME classification and other official purposes, in pursuance of the MSMED Act, 2006."
        />
        <Button onClick={handleSubmit} text="PAN Validate" />
        {/* green for success - #008000 red for error #FF0000 */}
        <div className="min-h-[100px] font-[700]">Notification</div>
      </div>
    </article>
  );
}
