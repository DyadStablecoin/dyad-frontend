import { DownOutlined, UpOutlined } from "@ant-design/icons";
import Icon from "./Icon";

export default function NftExpand({ setExpanded, expanded }) {
  return (
    <div className="flex items-center justify-center -mt-[2.0rem]">
      <Icon onClick={() => setExpanded(!expanded)}>
        <div
          className="bg-black pr-1 pl-1"
          style={{ border: "1px solid #3A403C" }}
        >
          {expanded ? <UpOutlined /> : <DownOutlined />}
        </div>
      </Icon>
    </div>
  );
}
