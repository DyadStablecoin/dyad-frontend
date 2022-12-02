import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";

export default function LeaderboardRow() {
  return (
    <tr className="" style={{ border: "1px solid #3A403C" }}>
      <td>
        <img
          className="w-10 h-10"
          src="https://images.t3n.de/news/wp-content/uploads/2022/02/cryptopunk-feb-2021.jpeg?class=hero-small"
          alt=""
        />
      </td>
      <td>#8234</td>
      <td>200,325</td>
      <td>$50,325</td>
      <td>
        <div className="flex gap-2 items-center justify-center">
          <div>
            <ArrowUpOutlined style={{ color: "#00FF00" }} />
          </div>
          <div>5</div>
        </div>
      </td>
      <td>
        <div className="flex gap-2 items-center justify-center">
          <div>
            <ArrowDownOutlined style={{ color: "red" }} />
          </div>
          <div>5</div>
        </div>
      </td>
      <td>
        <div className="flex gap-2 items-center justify-center">
          <div>
            <ArrowUpOutlined style={{ color: "#00FF00" }} />
          </div>
          <div>5</div>
        </div>
      </td>
      <td>monkeydluffy.eth</td>
    </tr>
  );
}
