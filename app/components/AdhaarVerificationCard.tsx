import { SetStateAction, useRef, useState } from "react";
import Agreement from "./Agreement";
import Input from "./Input";
import Button from "./Button";
import Link from "next/link";

export default function AadhaarVerificationCard({
  setCurrentStep,
  currentStep,
  setAadhaarValue,
  aadhaarValue,
}: {
  setCurrentStep: React.Dispatch<SetStateAction<number>>;
  currentStep: number;
  aadhaarValue: string;
  setAadhaarValue: React.Dispatch<SetStateAction<string>>;
}) {
  const [isChecked, setIsChecked] = useState(false);
  const aadhaarRef = useRef<HTMLInputElement | null>(null);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const otpRef = useRef<HTMLInputElement | null>(null);

  const [aadhaarError, setAadhaarError] = useState("");
  const [nameError, setNameError] = useState("");
  const [agreementError, setAgreementError] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [otpError, setOtpError] = useState("");
  const [otpEnabled, setOtpEnabled] = useState(false);

  const [notification, setNotification] = useState<{
    visible: boolean;
    status: "error" | "success";
    message: string[];
  }>({
    visible: false,
    status: "error",
    message: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [otpValue, setOtpValue] = useState("");

  const handleSubmit = async () => {
    let hasError = false;
    if (aadhaarError !== "" && aadhaarRef.current) {
      aadhaarRef.current.focus();
      return;
    }
    if (nameError !== "" && nameRef.current) {
      nameRef.current.focus();
      return;
    }
    if (!isChecked) {
      setAgreementError("You must Agree Declerations");
      hasError = true;
    } else {
      setAgreementError("");
    }
    if (aadhaarValue === "") {
      setAadhaarError("Required");
      hasError = true;
    } else {
      setAadhaarError("");
    }
    if (nameValue === "") {
      setNameError("Required");
      hasError = true;
    } else {
      setNameError("");
    }
    if (otpEnabled && otpValue === "") {
      setOtpError("Required");
      hasError = true;
    } else {
      setAadhaarError("");
    }
    if (!otpError && otpEnabled && otpValue !== VALID_OTP) {
      setOtpError("Invalid OTP");
      hasError = true;
    }
    console.log("has error ", hasError);
    if (hasError) {
      return;
    }
    console.log(otpEnabled);
    if (!otpEnabled) {
      setOtpEnabled(true);
      return;
    }
    try {
      setIsLoading(true);
      const res = await fetch("/api/aadhaar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          aadhaar: aadhaarValue,
          aadhaarName: nameValue,
        }),
      });
      if (res.status === 500) {
        throw new Error("Internal Server Error");
      }

      const parsed = await res.json();
      if (res.status === 400) {
        setNotification({
          message: parsed.errors,
          status: "error",
          visible: true,
        });
        return;
      }
      if (parsed.success) {
        // console.log("data", parsed);
        setNotification({
          message: [parsed.message],
          status: "success",
          visible: true,
        });
        setCurrentStep(parsed.user.currentStep);
      }
    } catch (err) {
      console.log("error is ", err);

      setNotification({
        message: ["Internal Server Error"],
        status: "error",
        visible: true,
      });
    } finally {
      setIsLoading(false);
      setOtpEnabled(false);
    }
  };
  const VALID_OTP = "123123";

  return (
    <article className="shadow-2xl mt-15 mx-4 md:mx-[30px] lg:mx-[36px] xl:mx-[160px]">
      <header className="bg-[#007BFF] text-[17.6px] py-3 px-5 text-white rounded-t-sm">
        Aadhaar Verification With OTP
      </header>
      <div className="p-5 font-source flex flex-col items-start gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <Input
            placeholder="Your Aadhaar No"
            isError={aadhaarError}
            setIsError={setAadhaarError}
            ref={aadhaarRef}
            type="ADHAAR"
            label="1. Aadhaar Number/ आधार संख्या"
            inputValue={aadhaarValue}
            setInputValue={setAadhaarValue}
            disabled={currentStep > 1}
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
            disabled={currentStep > 1}
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
            CGST Act 2017 and as notified by the ministry of MSME
            <span className="text-[#007bff] hover:text-[#114275] cursor-pointer">
              <Link href={"https://udyamregistration.gov.in/docs/225669.pdf"}>
                {" "}
                vide S.O. 1055(E) dated 05th March 2021
              </Link>
            </span>
            ) and PAN along with its Aadhaar number.
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
          disabled={currentStep > 1}
        />
        {otpEnabled && (
          <div className="w-full">
            <Input
              ref={otpRef}
              type="OTP"
              disabled={false}
              inputValue={otpValue}
              setInputValue={setOtpValue}
              isError={otpError}
              setIsError={setOtpError}
              label="*Enter One Time Password(OTP) Code"
              placeholder="OTP code"
            />
            <p>OTP has been sent ({VALID_OTP} is the valid OTP for testing)</p>
          </div>
        )}
        {currentStep === 1 && (
          <Button
            disabled={isLoading}
            text="Validate & Generate OTP"
            onClick={handleSubmit}
          />
        )}{" "}
        {notification.visible && (
          <div
            className={`min-h-[100px] font-[700] ${
              notification.status === "error"
                ? "text-red-500"
                : "text-green-500"
            }`}
          >
            {notification.message.map((msg, idx) => {
              return <div key={idx}>{idx + 1 + ") " + msg}</div>;
            })}
          </div>
        )}
      </div>
    </article>
  );
}
