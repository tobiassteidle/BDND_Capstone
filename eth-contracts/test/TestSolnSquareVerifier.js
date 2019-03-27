const valid_proof = require('./proof');
const proof = valid_proof.proof;
const input = valid_proof.input;

var SquareVerifier = artifacts.require('SquareVerifier');
var SolnSquareVerifier = artifacts.require('SolnSquareVerifier');

contract('SolnSquareVerifier', accounts => {

  const account_one = accounts[0];

  describe('check approvals', function () {
    beforeEach(async function () {
      const square_verifier = await SquareVerifier.new({from: account_one});
      this.contract = await SolnSquareVerifier.new(square_verifier.address, {from: account_one});
    });

    // Test if a new solution can be added for contract - SolnSquareVerifier
    it('new solution can be added for contract ', async function () {

    });

    // Test if an ERC721 token can be minted for contract - SolnSquareVerifier
    it('ERC721 token can be minted for contract', async function () {

    });

  });
});

