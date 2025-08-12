"use client";
import { useEffect, useState } from "react";
import AdhaarVerificationCard from "./components/AdhaarVerificationCard";
import UpperHeader from "./components/UpperHeader";
import PanVerificationCard from "./components/PanVerificationCard";
import SuccessScreen from "./components/SuccessScreen";

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1);
  const [aadhaarValue, setAadhaarValue] = useState("");
  useEffect(() => {
    console.log("current step is ", currentStep);
  }, [currentStep]);

  if (currentStep === 3) {
    return (
      <div className="font-source">
        <UpperHeader />
        <SuccessScreen />
      </div>
    );
  }

  return (
    <div className="font-source ">
      <UpperHeader />
      <AdhaarVerificationCard
        setCurrentStep={setCurrentStep}
        currentStep={currentStep}
        aadhaarValue={aadhaarValue}
        setAadhaarValue={setAadhaarValue}
      />
      {currentStep === 2 && (
        <PanVerificationCard
          setCurrentStep={setCurrentStep}
          aadhaarValue={aadhaarValue}
        />
      )}
    </div>
  );
}
