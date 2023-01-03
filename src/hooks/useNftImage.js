import { useEffect, useState } from "react";
import { RANDOM_IMAGES } from "../consts/consts";

export default function useNftImage(nft) {
  const [nftImage, setNftImage] = useState();

  useEffect(() => {
    setNftImage(RANDOM_IMAGES[nft.id % RANDOM_IMAGES.length]);
  }, [nft]);

  return { nftImage };
}
