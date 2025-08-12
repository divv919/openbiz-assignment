import { useRef, useState } from "react";
import Agreement from "./Agreement";
import Input from "./Input";
import Button from "./Button";

export default function AdhaarVerificationCard() {
  const [isChecked, setIsChecked] = useState(false);
  const adhaarRef = useRef<HTMLInputElement | null>(null);
  const nameRef = useRef<HTMLInputElement | null>(null);

  const [adhaarError, setAdhaarError] = useState("");
  const [nameError, setNameError] = useState("");
  const [agreementError, setAgreementError] = useState("");
  const [adhaarValue, setAdhaarValue] = useState("");
  const [nameValue, setNameValue] = useState("");
  const handleSubmit = () => {
    if (adhaarError !== "" && adhaarRef.current) {
      adhaarRef.current.focus();
      return;
    }
    if (nameError !== "" && nameRef.current) {
      nameRef.current.focus();
      return;
    }
    if (!isChecked) {
      setAgreementError("You must Agree Declerations");
    } else {
      setAgreementError("");
    }
    if (adhaarValue === "") {
      setAdhaarError("Required");
    } else {
      setAdhaarError("");
    }
    if (nameValue === "") {
      setNameError("Required");
      return;
    } else {
      setNameError("");
    }

    //logic for adhar handling
  };

  return (
    <article className="shadow-2xl mt-15 mx-4 md:mx-[30px]">
      <header className="bg-[#007BFF] text-[17.6px] py-3 px-5 text-white rounded-t-sm">
        Aadhaar Verification With OTP
      </header>
      <div className="p-5 font-source flex flex-col items-start gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <Input
            placeholder="Your Aadhaar No"
            isError={adhaarError}
            setIsError={setAdhaarError}
            ref={adhaarRef}
            type="ADHAAR"
            label="1. Aadhaar Number/ आधार संख्या"
            inputValue={adhaarValue}
            setInputValue={setAdhaarValue}
          />
          <Input
            placeholder="Name as per Aadhaar"
            isError={nameError}
            setIsError={setNameError}
            ref={nameRef}
            type="Name"
            label="2. Name of Entrepreneur / उद्यमी का नाम"
            inputValue={nameValue}
            setInputValue={setNameValue}
          />
        </div>
        <ul className="list-disc pl-10">
          <li>Aadhaar number shall be required for Udyam Registration.</li>{" "}
          <li>
            The Aadhaar number shall be of the proprietor in the case of a
            proprietorship firm, of the managing partner in the case of a
            partnership firm and of a karta in the case of a Hindu Undivided
            Family (HUF).{" "}
          </li>
          <li>
            In case of a Company or a Limited Liability Partnership or a
            Cooperative Society or a Society or a Trust, the organisation or its
            authorised signatory shall provide its GSTIN(As per applicablity of
            CGST Act 2017 and as notified by the ministry of MSME vide S.O.
          </li>
          <li>
            1055(E) dated 05th March 2021) and PAN along with its Aadhaar
            number.
          </li>
        </ul>
        <Agreement
          // id="Adhaar-Agreement"
          isChecked={isChecked}
          setIsChecked={setIsChecked}
          label={
            "  I, the holder of the above Aadhaar, hereby give my consent to Ministry of MSME, Government of India, for using my Aadhaar number as alloted by UIDAI for Udyam Registration. NIC / Ministry of MSME, Government of India, have informed me that my aadhaar data will not be stored/shared. / मैं, आधार धारक, इस प्रकार उद्यम पंजीकरण के लिए यूआईडीएआई के साथ अपने आधार संख्या का उपयोग करने के लिए सू0ल0म0उ0 मंत्रालय, भारत सरकार को अपनी सहमति देता हूं। एनआईसी / सू0ल0म0उ0 मंत्रालय, भारत सरकार ने मुझे सूचित किया है कि मेरा आधार डेटा संग्रहीत / साझा नहीं किया जाएगा।"
          }
          error={agreementError}
        />
        <Button text="Validate & Generate OTP" onClick={handleSubmit} />
        <div className="min-h-[100px] font-[700]">Notification</div>
      </div>
    </article>
  );
}
