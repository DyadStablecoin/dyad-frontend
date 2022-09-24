import { useEffect, useState } from "react";
import Row from "./Row";

export default function NFTs({ reload, address, ETH2USD }) {
  return (
    <div>
      <div className="flex flex-col gap-2">
        {[...Array(5).keys()].map((i) => {
          // TODO: comment
          return (
            <Row
              reload={reload}
              address={address}
              id={i}
              ETH2USD={ETH2USD}
              // show header only for the first item
              // TODO: super hacky, needs refactoring
              showHeader={i === 0}
            />
          );
        })}
      </div>
    </div>
  );
}
