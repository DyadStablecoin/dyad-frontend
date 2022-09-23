import { useEffect, useState } from "react";
import Row from "./Row";

export default function NFTs({ reload, address }) {
  return (
    <div>
      <div className="flex flex-col gap-2">
        {[...Array(100).keys()].map((i) => {
          // TODO: comment
          return <Row reload={reload} address={address} id={i} />;
        })}
      </div>
    </div>
  );
}
