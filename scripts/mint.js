const contract_file = require('../eth-contracts/build/contracts/SolnSquareVerifier');
const ABI = contract_file.abi;

const proofs = [
  require('../eth-contracts/test/data/proof'),
  require('../eth-contracts/test/data/proof_2'),
  require('../eth-contracts/test/data/proof_3'),
  require('../eth-contracts/test/data/proof_4'),
  require('../eth-contracts/test/data/proof_5'),
  require('../eth-contracts/test/data/proof_6'),
  require('../eth-contracts/test/data/proof_7'),
  require('../eth-contracts/test/data/proof_8'),
  require('../eth-contracts/test/data/proof_9')
];

const HDWalletProvider = require("truffle-hdwallet-provider");
const web3 = require('web3');
const MNEMONIC = process.env.MNEMONIC;
const INFURA_KEY = process.env.INFURA_KEY;
const OWNER_ADDRESS = process.env.OWNER_ADDRESS;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const NETWORK = process.env.NETWORK;

const NUM_MINTS = 10;

if (!MNEMONIC || !INFURA_KEY || !OWNER_ADDRESS || !CONTRACT_ADDRESS || !NETWORK) {
  console.error("Please set a mnemonic, infura key, owner, network, and contract address.");
  return
}

console.log("mnemonic:" + MNEMONIC);
console.log("infura key:" + INFURA_KEY);
console.log("owner address:" + OWNER_ADDRESS);
console.log("contract address:" + CONTRACT_ADDRESS);
console.log("network:" + NETWORK);

async function main() {
  const provider = new HDWalletProvider(MNEMONIC, `https://rinkeby.infura.io/v3/${INFURA_KEY}`);
  const web3Instance = new web3(
    provider
  );

  const contract = new web3Instance.eth.Contract(ABI, CONTRACT_ADDRESS, { gasLimit: "1000000" });
  proofs.forEach(async function(proof, index) {
    const result = await contract.methods.mintUniqueTokenTo(OWNER_ADDRESS, index, proof.proof.A, proof.proof.A_p, proof.proof.B, proof.proof.B_p, proof.proof.C, proof.proof.C_p, proof.proof.H, proof.proof.K, proof.input).send({ from: OWNER_ADDRESS, gas: 3000000 });
    console.log("Minted . Transaction: " + result.transactionHash)
  });
}

main();
