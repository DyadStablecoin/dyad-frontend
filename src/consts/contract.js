// rinkeby - dNFT
// export const CONTRACT_dNFT = "0x7fF5c8269F62eF6c551Bc8DB5FdB26AC96f3a7e1";
// export const CONTRACT_dNFT = "0xecb504d39723b0be0e3a9aa33d646642d1051ee1";

// goerli
// breaks sync
// export const CONTRACT_dNFT = "0xEf569857eF000566272cDfc5Bf5E8681f347A871";
// export const CONTRACT_DYAD = "0x23D4b7E8A70F844E23C734F7405A32103ffA24D7";
// export const CONTRACT_POOL = "0x46349c27362aB3779e65f4540d569f419575a8E7";

// new deployment - not breaking sync
// export const CONTRACT_dNFT = "0xEDf228001cF7b9f3ce718684284F72142F3B6Dd8";
// export const CONTRACT_DYAD = "0xe887bBF9eEFC6e1E9A4dA9fb36A8318Be3B9b226";
// export const CONTRACT_POOL = "0xa5243fc4c333a1a9d8ceEfa92b784c3E1dfEBa5A";

// goerli v0.1
// export const CONTRACT_dNFT = "0x5D6eA417eA856235337ed1D5Ff333A02f74803dD";
// export const CONTRACT_DYAD = "0x3a4940226a9265553291b0Bfe08a914E12ed7deb";
// export const CONTRACT_POOL = "0x7CA609C23371d62614d7e88B91Af0a2D730E6CA1";

// goerli v0.2
// export const CONTRACT_dNFT = "0x0eDb1483320DbdA0C804C1F5673F1733382e37E7";
// export const CONTRACT_DYAD = "0x5600f31Aea044A82067bF6b9466dd658100b8fF0";
// export const CONTRACT_POOL = "0xAf593430b86a0560818a9dF5858B14dDC469Ab98";

// goerli v0.21
//    fixes:
//    - xp with 18 decimals
//    - claim function wrong ethRequired calculatio
// export const CONTRACT_dNFT = "0x93c23f661F11E5cF62791294E03ee353AD1009a3";
// export const CONTRACT_DYAD = "0xb936dc3F7C826A1358FB5881DD4fe0F7688aEF1f";
// export const CONTRACT_POOL = "0x67488Df72673d85c42a83e5ECAdBBEeA16C01A22";

// goerli v0.3: First Testnet Launch
//    fixes:
//    - xp burn limit
//    - 300 dnfts
// export const CONTRACT_dNFT = "0x2544bA4Bc4A1d4Eb834a2770Fd5B52bAfa500B44";
// export const CONTRACT_DYAD = "0xb9a5a09B5a58c56bBC0fE1890DbB035994028035";
// export const CONTRACT_POOL = "0xC98D30Cf8837dE6ae019D37084f1893751D47C4E";

// goerli v0.4: Second Testnet Launch
//    fixes:
//    - fix liquidation bug where the amount to deposit was not calculated correctly
//    - 500 dnfts
// export const CONTRACT_dNFT = "0x9346eF7e251E6D8CBee4297e30E8b02fb4FC5309";
// export const CONTRACT_DYAD = "0xFd4Db9769F87Bd148700aFd2686D139256A3ffb9";
// export const CONTRACT_POOL = "0x87b32b90ff9e3ec0DE0D3287F570841e9C2f634d";

// goerli v0.5: Third Testnet Launch
//    fixes:
//    - fix cr calculation
//    - 888 dnfts
// export const CONTRACT_dNFT = "0xFEb1247DF4360C0F16a64b1De37d97E0FD5BE81d";
// export const CONTRACT_DYAD = "0xaa0a5b538410A0d62b06168b0bfF537C356f8DFE";
// export const CONTRACT_POOL = "0x906ad164Bd7B717B57a975898A0bD1FF767005dC";

// goerli v0.6: 4th Testnet Launch
//   changes:
//    - dNFT quantity back to 500.
//    - dNFTs can transfer and receive deposited DYAD to and from any other dNFT
//    directly between their balance sheets, without removing DYAD from the
//    damping vault.
//    - maximum TVL/500 withdrawal limit for all dNFTs. This is in addition to
//    the 150% minimum protocol-wide CR. It will prevent the formation of
//    too-powerful dNFTs that could break the game.
//    - 1.15x DYAD accrual bonus for calling sync on a positive delta (ETH up).
//    - major refactoring of the contracts which reduced the sync gas costs by
//    30%. Still a lot of room for gas efficiency improvement here.
// export const CONTRACT_DYAD = "0x240B5c699C002173c8c76dE5427f864ACAb097E1";
// export const CONTRACT_dNFT = "0x29E94B4E3Cc978C232909c4a78836AC52d6A610e";

// goerli v0.7: 5th Testnet Launch
// export const CONTRACT_DYAD = "0x874ED83CFf2857b39B6F5583eb33E7763a68Fb95";
// export const CONTRACT_dNFT = "0x8Dc0Cb544367ac0425686e05f1b7E19688A1c5b3";

// first v2 deployment
// export const CONTRACT_DYAD = "0xdbb17e0c3970A1A477CAe6FBeE8fd83Bd501421a";
// export const CONTRACT_dNFT = "0xe08613072099dC5b83669bBef104Ac49271e3BF9";

// second v2 deployment
//    - added deposit as a term in mint/burn equations
//    - removed transferFrom from deposit
// export const CONTRACT_DYAD = "0x85293BaDA293ed4Fbc8297221Bd121C110Be0E38";
// export const CONTRACT_dNFT = "0x225B3C1D7104b0614707DAAFC5D45FBDF5f4a3Ca";

// 3rd v2 deployment
//    - fixed totalDeposit
//    - sync can only run on price change and time change
// export const CONTRACT_DYAD = "0x943F21320709087189141a3E29F23F524757fB1A";
// export const CONTRACT_dNFT = "0xD5351689Dcd8AC2F10B5DEe0649410038ccaE6Ae";

// 4th v2 deployment
//    - new events
// export const CONTRACT_DYAD = "0x12AF5401ab00Ee632E7d520c9686371E70C7F99F";
// export const CONTRACT_dNFT = "0xAcC54Ce3Eb4fE8a6680666fB118E4b7d2bC3775F";

// 5th v2 deployment
//    - more XP
// export const CONTRACT_DYAD = "0x25466e50825b17ACB70Eef591559a571e097baF2";
// export const CONTRACT_dNFT = "0x458C79002e94331f7f77568Cc2C3925556BA63be";

// 6th v2 deployment
//    - xp reward based on deposited dyad
export const CONTRACT_DYAD = "0x3a2Be54400D7FaC29f6500E0130c00Af960a48fd";
export const CONTRACT_dNFT = "0xeC182DefC3Bb9d3D87A635375F23111080DFfeDb";
