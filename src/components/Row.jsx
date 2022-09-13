import Button from "./Button";

export default function Row() {
  return (
    <div className="flex gap-8 border-[1px] border-white p-4 items-center">
      <div className="underline underline-offset-4">#3852</div>
      <div className="underline underline-offset-4">$58,000</div>
      <div className="underline underline-offset-4">100,000</div>
      <Button>mint</Button>
      <div className="underline underline-offset-4">70,500</div>
      <Button>deposit</Button>
      <Button>withdraw</Button>
      <div className="underline underline-offset-4">5,000</div>
      <Button>sync</Button>
    </div>
  );
}
