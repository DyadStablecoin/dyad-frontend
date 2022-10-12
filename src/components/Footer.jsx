import TwitterOutlined from "@ant-design/icons/lib/icons/TwitterOutlined";
import MediumOutlined from "@ant-design/icons/lib/icons/MediumOutlined";
import { SiDiscord } from "react-icons/si";

export default function Footer() {
  return (
    <div className="p-8 flex justify-between bg-[#0f0f0f]">
      <div className="flex gap-[3rem] ml-3">
        <div>Privacy Policy</div>
        <div>Disclaimer</div>
      </div>
      <div className="flex gap-4">
        <TwitterOutlined />
        <MediumOutlined />
        <SiDiscord />
      </div>
    </div>
  );
}
