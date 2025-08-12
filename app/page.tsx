"use client";
import { useState } from "react";
import AdhaarVerificationCard from "./components/AdhaarVerificationCard";
import UpperHeader from "./components/UpperHeader";
import PanVerificationCard from "./components/PanVerificationCard";

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1);
  return (
    <div className="font-source ">
      <UpperHeader />
      <AdhaarVerificationCard />
      <PanVerificationCard />
    </div>
  );
}
