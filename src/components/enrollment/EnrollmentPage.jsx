import { useState } from "react";
import PersonalInformation from "./PersonalInformation";
import UploadRequirements from "./UploadRequirements";
import SelectProgram from "./SelectProgram";
import ChooseSchedule from "./ChooseSchedule";
import SubmitRequirements from "./SubmitRequirements";
import StepsBar from "./StepsBar";

export default function EnrollmentPage({ onScheduleSaved, onGoToStudyLoad }) {
  const [step, setStep] = useState(1);
  const [studentType, setStudentType] = useState("continuing");
  const [irregular, setIrregular] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const TYPE_LABEL = {
    new: "New Student",
    transferee: "Transferee",
    continuing: "Continuing Student",
  };

  return (
    <div style={{ padding:"20px 16px", flex:1 }}>
      <div style={{ marginBottom:12 }}>
        <h1 style={{ fontFamily:"'Sora',sans-serif", fontSize:18, fontWeight:700 }}>Enrollment</h1>
        <p style={{ fontSize:12, color:"#94a3b8", marginTop:2 }}>
          BS Information Technology — 2nd Year · {TYPE_LABEL[studentType]} · SY 2026
        </p>
      </div>

      <StepsBar currentStep={step} onStepClick={(n) => setStep(n)} studentType={studentType} irregular={irregular} submitted={submitted} />

      {/* Step 1 — Personal Information */}
      {step === 1 && (
        <PersonalInformation onNext={(type, irr) => { setStudentType(type); setIrregular(irr); setStep(2); }} />
      )}

      {/* Step 2 — Upload Requirements */}
      {step === 2 && (
        <UploadRequirements
          studentType={studentType}
          irregular={irregular}
          onBack={() => setStep(1)}
          onNext={() => {
            if (studentType === "continuing" && irregular === "yes") return setStep(5);
            if (studentType === "continuing") return setStep(4);
            return setStep(3);
          }}
        />
      )}

      {/* Step 3 — Select Program (skipped for continuing) */}
      {step === 3 && (
        <SelectProgram onBack={() => setStep(2)} onNext={() => setStep(4)} />
      )}

      {/* Step 4 — Choose Schedule (skipped for irregular) */}
      {step === 4 && (
        <ChooseSchedule onBack={() => studentType === "continuing" ? setStep(2) : setStep(3)} onNext={() => setStep(5)} />
      )}

      {/* Step 5 — Submit Requirements → admin review */}
      {step === 5 && (
        <SubmitRequirements onBack={() => setStep(4)} onNext={onGoToStudyLoad} onSubmitted={() => setSubmitted(true)} studentType={studentType} irregular={irregular} />
      )}
    </div>
  );
}