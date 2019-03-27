const valid_proof = require('./data/proof');
const proof = valid_proof.proof;
const input = valid_proof.input;

var SquareVerifier = artifacts.require('SquareVerifier');
var SolnSquareVerifier = artifacts.require('SolnSquareVerifier');

contract('SolnSquareVerifier', accounts => {

  const account_one = accounts[0];
  const account_two = accounts[1];
  const account_three = accounts[2];

  describe('check approvals', function () {
    beforeEach(async function () {
      const square_verifier = await SquareVerifier.new({from: account_one});
      this.contract = await SolnSquareVerifier.new(square_verifier.address, {from: account_one});
    });

    // Test if an ERC721 token can be minted for contract - SolnSquareVerifier
    it('ERC721 token can be minted for contract', async function () {
      await this.contract.mintUniqueTokenTo(account_two, 0, proof.A, proof.A_p, proof.B, proof.B_p, proof.C, proof.C_p, proof.H, proof.K, input, {from: account_one});
    });

    it('should fail to mint a token with the same solution', async function () {
      let exeeption_catched = false;
      let exception_message = "";

      // Try solution for the first time
      await this.contract.mintUniqueTokenTo(account_two, 0, proof.A, proof.A_p, proof.B, proof.B_p, proof.C, proof.C_p, proof.H, proof.K, input, {from: account_one});

      try {
        // try same solution again
        await this.contract.mintUniqueTokenTo(account_three, 1, proof.A, proof.A_p, proof.B, proof.B_p, proof.C, proof.C_p, proof.H, proof.K, input, {from: account_one});
      } catch (e) {
        exeeption_catched = true;
        exception_message = e.message;
      }
      assert.equal(exeeption_catched, true, "exception should be thrown");
      assert.equal(exception_message, "Returned error: VM Exception while processing transaction: revert solution already used, try another one -- Reason given: solution already used, try another one.");
    });

  });
});

