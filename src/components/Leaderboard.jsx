export default function Leaderboard() {
  const ROW = (
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
      <td>5</td>
      <td>5</td>
      <td>5</td>
      <td>monkeydluffy.eth</td>
    </tr>
  );

  return (
    <table className="leaderboard">
      <tr>
        <th></th>
        <th>Rank</th>
        <th>XP</th>
        <th>value</th>
        <th>D</th>
        <th>W</th>
        <th>M</th>
        <th>ens</th>
      </tr>
      {ROW}
      {ROW}
      {ROW}
      {ROW}
    </table>
  );
}
