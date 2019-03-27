pragma solidity >=0.4.21 <0.6.0;

import './ERC721Mintable.sol';
import "./Verifier.sol";

// define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
contract SquareVerifier is Verifier {
}

// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class
contract SolnSquareVerifier is REstXERC721Token {

    // TODO define a solutions struct that can hold an index & an address
    struct Solutions {
        uint256 index;
        address from;
    }

    // define an array of the above struct
    Solutions [] private solutions;

    // TODO define a mapping to store unique solutions submitted



// TODO Create an event to emit when a solution is added
    event SolutionAdded(uint256 indexed index, address indexed from);



// TODO Create a function to add the solutions to the array and emit the event

    SquareVerifier public verifier;

    constructor (address verifier_address) public {
        verifier = SquareVerifier(verifier_address);
    }


// TODO Create a function to mint new NFT only after the solution has been verified
//  - make sure the solution is unique (has not been used before)
//  - make sure you handle metadata as well as tokenSuplly
    function mintUniqueTokenTo(address to, uint256 tokenId) public {
        super.mint(to, tokenId);
    }
}


































