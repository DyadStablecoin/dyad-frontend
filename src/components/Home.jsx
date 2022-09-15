import Claim from "./Claim";
import Row from "./Row";

export default function Home() {
  return (
    <div className="mt-8">
      <Claim />
      <div className="flex flex-col gap-2 mt-32">
        <Row />
        <Row />
        <Row />
      </div>
    </div>
  );
}
