import TwitterOutlined from "@ant-design/icons/lib/icons/TwitterOutlined";
import MediumOutlined from "@ant-design/icons/lib/icons/MediumOutlined";
import { SiDiscord } from "react-icons/si";

export default function Footer() {
  return (
    <div className="flex justify-between items-center p-4">
      <div className="flex gap-8">
        <div>Privacy Policy</div>
        <div>Disclaimer</div>
      </div>
      <div className="flex gap-3">
        <TwitterOutlined />
        <MediumOutlined />
        <SiDiscord />
      </div>
    </div>
  );
}
