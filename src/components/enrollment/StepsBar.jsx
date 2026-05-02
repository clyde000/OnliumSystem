import React from "react";

const ALL_STEPS = [
  { num: 1, label: "Personal Info" },
  { num: 2, label: "Upload Requirements" },
  { num: 3, label: "Select Program" },
  { num: 4, label: "Choose Schedule" },
  { num: 5, label: "Submit Requirements" },
];

export default function StepsBar({ currentStep = 1, onStepClick = () => {}, studentType, irregular, submitted }) {
  const isMobile = window.innerWidth <= 640;
  const steps = (studentType === "continuing" && irregular === "yes")
    ? ALL_STEPS.filter(s => s.num !== 3 && s.num !== 4)
    : studentType === "continuing"
    ? ALL_STEPS.filter(s => s.num !== 3)
    : ALL_STEPS;

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 20, overflowX: "auto", paddingBottom: 4 }}>
      {steps.map(({ num, label }, i) => {
        const isLastStep = i === steps.length - 1;
        const isDone = submitted && isLastStep ? true : num < currentStep;
        const isActive = !isDone && num === currentStep;
        const circleColor = isDone ? "#16a34a" : isActive ? "#2563eb" : "#e6eef9";
        const textColor = isDone || isActive ? "#0f172a" : "#64748b";
        const displayNum = i + 1;

        return (
          <div key={num} style={{ display: "flex", alignItems: "center", flex: isMobile ? "0 0 auto" : 1, minWidth: 0 }}>
            <button
              onClick={() => onStepClick(num)}
              aria-current={isActive}
              style={{ display: "flex", alignItems: "center", gap: 8, background: "transparent", border: "none", padding: "6px 4px", cursor: "pointer", textAlign: "left" }}
            >
              <div style={{
                width: 32, height: 32, borderRadius: "50%",
                background: circleColor,
                color: isDone || isActive ? "#fff" : "#94a3b8",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 13, fontWeight: 700, flexShrink: 0,
                border: isActive ? "4px solid rgba(37,99,235,0.08)" : "none",
              }}>
                {isDone ? "✓" : displayNum}
              </div>

              {!isMobile && (
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: textColor, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {label}
                  </div>
                  <div style={{ fontSize: 11, marginTop: 4 }}>
                    {isDone ? <span style={{ color: "#16a34a", fontWeight: 700 }}>Done</span> : isActive ? <span style={{ color: "#f97316", fontWeight: 700 }}>In Progress</span> : <span style={{ color: "#94a3b8" }} />}
                  </div>
                </div>
              )}
            </button>

            {i < steps.length - 1 && (
              <div style={{ width: isMobile ? 12 : 18, flexShrink: 0, height: 2, background: num < currentStep ? "#16a34a" : "#e6eef9", margin: "0 2px" }} />
            )}
          </div>
        );
      })}

      {isMobile && (
        <div style={{ position: "absolute", marginTop: 48, fontSize: 12, fontWeight: 700, color: "#2563eb" }}>
          {steps.find(s => s.num === currentStep)?.label}
        </div>
      )}
    </div>
  );
}