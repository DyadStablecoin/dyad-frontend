import TwitterOutlined from "@ant-design/icons/lib/icons/TwitterOutlined";
import MediumOutlined from "@ant-design/icons/lib/icons/MediumOutlined";
import { SiDiscord } from "react-icons/si";
import Icon from "./Icon";
import { COLORS } from "../consts/colors";
import { VERSION } from "../consts/consts";

export default function Footer() {
  return (
    <div className="flex justify-between items-center p-4">
      <div className="flex gap-8">
        <div>Privacy Policy</div>
        <div>Disclaimer</div>
      </div>
      <div style={{ color: COLORS.Beige }}>v{VERSION}</div>
      <div className="flex gap-3 items-center ">
        <Icon onClick={() => window.open("https://twitter.com/DYADstable")}>
          <TwitterOutlined />
        </Icon>
        <Icon onClick={() => window.open("https://medium.com/@dyadstable")}>
          <MediumOutlined />
        </Icon>
        <Icon onClick={() => window.open("http://discord.gg/DYAD")}>
          <SiDiscord />
        </Icon>
      </div>
    </div>
  );
}
