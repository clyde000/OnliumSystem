const STEPS = [
  "Personal Info",
  "Upload Requirements",
  "Select Program",
  "Choose Schedule",
  "Upload Picture",
  "Submit Requirements",
  "Appoint Payment",
];

export default function StepsBar({ currentStep }) {
  return (
    <div style={{
      display: "flex", alignItems: "center",
      background: "#eaf0f8", border: "1px solid #c5d5e8",
      borderRadius: 10, padding: "10px 14px",
      gap: 4, marginBottom: 20,
    }}>
      {STEPS.map((label, i) => {
        const num = i + 1;
        const isDone = num < currentStep;
        const isActive = num === currentStep;
        const state = isDone ? "done" : isActive ? "active" : "pending";

        const colors = {
          active:  { circle: "#2d4fcc", badge: "#2d4fcc" },
          done:    { circle: "#2d7d46", badge: "#2d7d46" },
          pending: { circle: "#7a9cc8", badge: "#7a9cc8" },
        }[state];

        return (
          <>
            <div key={label} style={{ display: "flex", alignItems: "center", gap: 8, flex: 1, minWidth: 0 }}>
              <div style={{
                width: 30, height: 30, borderRadius: "50%",
                background: colors.circle, color: "#fff",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 13, fontWeight: "bold", flexShrink: 0,
              }}>
                {isDone ? "✓" : num}
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 12, fontWeight: "bold", color: "#1a1a2e", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {label}
                </div>
                <span style={{
                  display: "inline-block", fontSize: 9.5, fontWeight: "bold",
                  padding: "1px 7px", borderRadius: 3, marginTop: 2,
                  background: colors.badge, color: "#fff",
                }}>
                  {isDone ? "Done" : isActive ? "In Progress" : "Pending"}
                </span>
              </div>
            </div>
            {i < STEPS.length - 1 && (
              <div style={{ width: 18, flexShrink: 0, height: 2, background: "#b0c4de", margin: "0 2px" }} />
            )}
          </>
        );
      })}
    </div>
  );
}