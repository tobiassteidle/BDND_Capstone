# Udacity Blockchain Capstone "Real Estate Marketplace"

Real Estate Marketplace is the capstone project for Udacity's Blockchain course. 

## Install

This repository contains Smart Contract code in Solidity (using Truffle), tests (also using Truffle)

To install, download or clone the repo, then:

`npm install`

In directory `eth-contracts/`  
`truffle compile`

## Tests
To run truffle tests:
In directory `eth-contracts/`

For all tests:    
`truffle test` 

All 13 tests should pass.

![truffle test](assets/test_run.png)

For single file tests:  
`truffle test test/TestERC721Mintable.js`  
`truffle test test/TestSquareVerifier.js`  
`truffle test test/TestSolnSquareVerifier.js`  

## TODO: Addresses and Links 
Contract address (Token) : `XXX`  
Contract address (Verifier):  
Contract Abi's: `XXX`  
OpenSea Marketplace Storefront link's: `XXX`  

## ZoKrates (generate zk-Snarks Validator)
#### Step 1: Run ZoKrates in Docker
``` 
docker run -v <path to your project folder>:/home/zokrates/code -ti zokrates/zokrates:0.3.0 /bin/bash
```

#### Change directory
``` 
cd code/zokrates/code/square/
``` 

#### Step 2: Compile the program written in ZoKrates DSL
``` 
../../../../zokrates compile -i square.code
``` 

#### Step 3: Generate the Trusted Setup
``` 
../../../../zokrates setup
```

#### Step 4: Compute Witness
``` 
../../../../zokrates compute-witness -a 3 9
```

#### Step 5: Generate Proof
```
../../../../zokrates generate-proof
```

#### Step 6: Export Verifier
```  
../../../../zokrates export-verifier
```

# Deploy to rinkeby
Update <**your metamask seed**>, <**your infura key**> and <**your contract owner address**> in 
`/eth-contracts/truffle-config.js` before migrate to Rinkeby Network. 
```
truffle migrate --network rinkeby
```

# Project Resources

* [Remix - Solidity IDE](https://remix.ethereum.org/)
* [Visual Studio Code](https://code.visualstudio.com/)
* [Truffle Framework](https://truffleframework.com/)
* [Ganache - One Click Blockchain](https://truffleframework.com/ganache)
* [Open Zeppelin ](https://openzeppelin.org/)
* [Interactive zero knowledge 3-colorability demonstration](http://web.mit.edu/~ezyang/Public/graph/svg.html)
* [Docker](https://docs.docker.com/install/)
* [ZoKrates](https://github.com/Zokrates/ZoKrates)
