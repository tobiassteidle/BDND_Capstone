pragma solidity >=0.4.21 <0.6.0;

import 'openzeppelin-solidity/contracts/utils/Address.sol';
import './ERC721Mintable.sol';
import "./Verifier.sol";

// define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
contract SquareVerifier is Verifier {
}

// define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class
contract SolnSquareVerifier is REstXERC721Token {

    // define a solutions struct that can hold an index & an address
    struct Solution {
        uint256 tokenId;
        address to;
    }

    // define a mapping to store unique solutions submitted
    mapping(bytes32 => Solution) private solutions;

    // Create an event to emit when a solution is added
    event SolutionAdded(address to, uint256 index);

    // Create a function to add the solutions to the array and emit the event
    function _addSolution(bytes32 key, address to, uint256 tokenId) internal {
        Solution storage solution = solutions[key];

        // store solution to prevent reuse
        solution.to = msg.sender;
        solution.tokenId = tokenId;

        // emit SolutionAdded event
        emit SolutionAdded(to, tokenId);
    }

    event VerifierChanged(address newVerifier);

    SquareVerifier public _verifier;

    constructor (address verifier_address) public {
        _verifier = SquareVerifier(verifier_address);
    }

    function setVerifier(address verifier_address) public onlyOwner {
        // make sure the new verifier is a contract
        require(Address.isContract(verifier_address), "Owner must be a contract address");

        // set new verifier
        _verifier = SquareVerifier(verifier_address);

        // emit verifier changed event
        emit VerifierChanged(verifier_address);
    }

    // Create a function to mint new NFT only after the solution has been verified
    function mintUniqueTokenTo(
        address to,
        uint256 tokenId,
        uint[2] memory a,
        uint[2] memory a_p,
        uint[2][2] memory b,
        uint[2] memory b_p,
        uint[2] memory c,
        uint[2] memory c_p,
        uint[2] memory h,
        uint[2] memory k,
        uint[2] memory input) public {
        // check if solution is valid
        require(_verifier.verifyTx(a, a_p, b, b_p, c, c_p, h, k, input), "invalid solution");

        // hash solution key and check if is valid
        bytes32 key = keccak256(abi.encodePacked(a, a_p, b, b_p, c, c_p, h, k, input));

        // check if solution already used
        require(solutions[key].to == address(0), "solution already used, try another one");

        // add solution to mapping
        _addSolution(key, to, tokenId);

        // mint it
        super.mint(to, tokenId);
    }
}

























