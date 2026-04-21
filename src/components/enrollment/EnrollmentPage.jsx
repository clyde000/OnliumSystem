import { useState } from "react";
import StepsBar from "./StepsBar";
import PersonalInformation from "./PersonalInformation";
import UploadRequirements from "./UploadRequirements";
import SelectProgram from "./SelectProgram";
import UploadPicture from "./UploadPicture";
import SubmitRequirements from "./SubmitRequirements";
import FinalizeEnrollment from "./FinalizeEnrollment";

export default function EnrollmentPage({ onScheduleSaved, onGoToStudyLoad }) {
  const [step, setStep] = useState(1);
  const [studentType, setStudentType] = useState("continuing");

  const TYPE_LABEL = {
    new: "New Student",
    transferee: "Transferee",
    continuing: "Continuing Student",
  };

  return (
    <div style={{ padding:"28px 32px", flex:1 }}>
      <div style={{ marginBottom:24 }}>
        <h1 style={{ fontFamily:"'Sora',sans-serif", fontSize:20, fontWeight:700 }}>Enrollment</h1>
        <p style={{ fontSize:13, color:"#94a3b8", marginTop:2 }}>
          BS Information Technology — 2nd Year · {TYPE_LABEL[studentType]} · SY 2026
        </p>
      </div>

      <StepsBar currentStep={step} />

      {/* Step 1 — Personal Information */}
      {step === 1 && (
        <PersonalInformation onNext={(type) => { setStudentType(type); setStep(2); }} />
      )}

      {/* Step 2 — Upload Requirements (docs vary by student type) */}
      {step === 2 && (
        <UploadRequirements studentType={studentType} onBack={() => setStep(1)} onNext={() => setStep(3)} />
      )}

      {/* Step 3 — Select Program */}
      {step === 3 && (
        <SelectProgram onBack={() => setStep(2)} onNext={() => setStep(4)} />
      )}

      {/* Step 4 — Upload Picture (white background 2×2) */}
      {step === 4 && (
        <UploadPicture onBack={() => setStep(3)} onNext={() => setStep(5)} />
      )}

      {/* Step 5 — Submit Requirements → admin review */}
      {step === 5 && (
        <SubmitRequirements onBack={() => setStep(4)} onNext={() => setStep(6)} />
      )}

      {/* Step 6 — Finalize Enrollment */}
      {step === 6 && (
        <FinalizeEnrollment onGoToStudyLoad={onGoToStudyLoad} />
      )}
    </div>
  );
}