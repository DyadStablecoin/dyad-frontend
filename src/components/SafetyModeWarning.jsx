import { WarningFilled } from "@ant-design/icons";
import { COLORS } from "../consts/colors";

export default function SafetyModeWarning() {
  return (
    <div className="flex gap-2 items-center justify-center">
      <WarningFilled style={{ color: COLORS.Red }} />
      <div style={{ color: COLORS.Red }}>Safety Mode Activated</div>
    </div>
  );
}
