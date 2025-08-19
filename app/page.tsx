"use client";
import { useEffect, useState } from "react";
import AdhaarVerificationCard from "./components/AdhaarVerificationCard";
import UpperHeader from "./components/UpperHeader";
import PanVerificationCard from "./components/PanVerificationCard";
import SuccessScreen from "./components/SuccessScreen";
import Marquee from "react-fast-marquee";
import Link from "next/link";
import Loader from "./components/Loader";

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1);
  const [aadhaarValue, setAadhaarValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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
  //test commit for signature
  return (
    <div className="font-source ">
      {isLoading && <Loader />}
      <UpperHeader />
      <AdhaarVerificationCard
        setCurrentStep={setCurrentStep}
        currentStep={currentStep}
        aadhaarValue={aadhaarValue}
        setAadhaarValue={setAadhaarValue}
        setIsLoading={setIsLoading}
        isLoading={isLoading}
      />
      {currentStep === 2 && (
        <PanVerificationCard
          setCurrentStep={setCurrentStep}
          aadhaarValue={aadhaarValue}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      )}
      <Marquee pauseOnHover={true} className="my-5">
        <Link
          target="_blank"
          href={
            "https://udyamregistration.gov.in/docs/OM_regarding_inclusion_of_Traders02072021.pdf"
          }
        >
          <p className="font-[700] font-source text-[#007bff] hover:text-[#10539b] cursor-pointer">
            Activities (NIC codes) not covered under MSMED Act, 2006 for Udyam
            Registration
          </p>
        </Link>
      </Marquee>
    </div>
  );
}
