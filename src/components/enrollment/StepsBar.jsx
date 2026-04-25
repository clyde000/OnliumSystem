import React from "react";

const STEPS = [
  "Personal Info",
  "Upload Requirements",
  "Select Program",
  "Choose Schedule",
  "Submit Requirements",
  "Finalize Enrollment",
];

export default function StepsBar({ currentStep = 1, onStepClick = () => {} }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
      {STEPS.map((label, i) => {
        const num = i + 1;
        const isDone = num < currentStep;
        const isActive = num === currentStep;

        const circleColor = isDone ? "#16a34a" : isActive ? "#2563eb" : "#e6eef9";
        const textColor = isDone || isActive ? "#0f172a" : "#64748b";

        return (
          <div key={label} style={{ display: "flex", alignItems: "center", flex: 1, minWidth: 0 }}>
            <button
              onClick={() => onStepClick(num)}
              aria-current={isActive}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                background: "transparent",
                border: "none",
                padding: 8,
                cursor: "pointer",
                width: "100%",
                textAlign: "left",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1, minWidth: 0 }}>
                <div style={{
                  width: 34,
                  height: 34,
                  borderRadius: "50%",
                  background: circleColor,
                  color: isDone || isActive ? "#fff" : "#94a3b8",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 14,
                  fontWeight: 700,
                  flexShrink: 0,
                  border: isActive ? "4px solid rgba(37,99,235,0.08)" : "none",
                }}>
                  {isDone ? "✓" : num}
                </div>

                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: textColor, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {label}
                  </div>
                  <div style={{ fontSize: 11, marginTop: 4 }}>
                    {isDone ? <span style={{ color: "#16a34a", fontWeight: 700 }}>Done</span> : isActive ? <span style={{ color: "#f97316", fontWeight: 700 }}>In Progress</span> : <span style={{ color: "#94a3b8" }} />}
                  </div>
                </div>
              </div>
            </button>

            {i < STEPS.length - 1 && (
              <div style={{ width: 18, flexShrink: 0, height: 2, background: num < currentStep ? "#16a34a" : "#e6eef9", margin: "0 8px" }} />
            )}
          </div>
        );
      })}
    </div>
  );
}