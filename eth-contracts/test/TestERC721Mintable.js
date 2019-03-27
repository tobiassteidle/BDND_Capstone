var ERC721MintableComplete = artifacts.require('SolnSquareVerifier');

contract('TestERC721Mintable', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];
    const account_three = accounts[2];
    const account_four = accounts[3];
    const account_five = accounts[4];
    const account_six = accounts[5];

    describe('have ownership properties', function () {
        beforeEach(async function () {
            this.contract = await ERC721MintableComplete.new({from: account_one});
        });

        it('should fail when minting when address is not contract owner', async function () {
          let exeeption_catched = false;
          let exception_message = "";

          // try to mint from account_two
          try {
            await this.contract.mintUniqueTokenTo(account_two, 0, {from: account_two});
          } catch (e) {
            exeeption_catched = true;
            exception_message = e.message;
          }

          assert.equal(exeeption_catched, true, "exception should be thrown");
          assert.equal(exception_message, "Returned error: VM Exception while processing transaction: revert Caller is not contract owner -- Reason given: Caller is not contract owner.", "unexcpected error message");
        });

        it('should return contract owner', async function () {
          let contract_owner = await this.contract._owner.call({from: account_two});
          assert.equal(contract_owner, account_one, "owner should be account_one");
        });

        it('should fail when illegal ownership transfer', async function () {
          // contract owner is accout_one
          let contract_owner = await this.contract._owner.call({from: account_two});
          assert.equal(contract_owner, account_one, "owner should be account_one");

          // account_two try to transfer ownership to himself
          let exeeption_catched = false;
          let exception_message = "";
          try {
            await this.contract.transferOwnership(account_two, {from: account_two});
          } catch (e) {
            exeeption_catched = true;
            exception_message = e.message;
          }
          assert.equal(exeeption_catched, true, "exception should be thrown");
          assert.equal(exception_message, "Returned error: VM Exception while processing transaction: revert Caller is not contract owner -- Reason given: Caller is not contract owner.", "unexcpected error message");

          contract_owner = await this.contract._owner.call({from: account_two});
          assert.equal(contract_owner, account_one, "owner should still be account_one");

          // transfer owernship to accout_two
          await this.contract.transferOwnership(account_two, {from: account_one});
          contract_owner = await this.contract._owner.call({from: account_two});
          assert.equal(contract_owner, account_two, "owner should now be account_two");

          // for furher test switch back to account_one ownership
          await this.contract.transferOwnership(account_one, {from: account_two});
          contract_owner = await this.contract._owner.call({from: account_two});
          assert.equal(contract_owner, account_one, "owner should now be account_one");
        });

    });

    describe('check approvals', function () {
      beforeEach(async function () {
        this.contract = await ERC721MintableComplete.new({from: account_one});

        await this.contract.mintUniqueTokenTo(account_two, 0, {from: account_one});
      });

      it('check approve for single token', async function () {
        const tokenId = 0;

        // check approve
        let approvedAddress = await this.contract.getApproved.call(tokenId, {from: account_one});
        assert.equal(parseInt(approvedAddress), 0, "token should not be approved.");

        // Approve to account_two
        await this.contract.approve(account_three, tokenId, {from: account_two});

        // check approve
        approvedAddress = await this.contract.getApproved.call(tokenId, {from: account_one});
        assert.equal(approvedAddress, account_three, "token should be approved for account_three.");
      });

      it('check approve for all', async function () {
        // check account_two approvals
        let approved = await this.contract.isApprovedForAll.call(account_one, account_two, {from: account_one});
        assert.equal(approved, false, "account_two should not be approved");

        // approve account_two for all
        await this.contract.setApprovalForAll(account_two, true, {from: account_one});

        // check account_two approvals
        approved = await this.contract.isApprovedForAll.call(account_one, account_two, {from: account_one});
        assert.equal(approved, true, "account_two should be approved for all");

        // un-approve accout_two
        await this.contract.setApprovalForAll(account_two, false, {from: account_one});

        // check account_two approvals
        approved = await this.contract.isApprovedForAll.call(account_one, account_two, {from: account_one});
        assert.equal(approved, false, "account_two should not be approved for all");
      });

    });

    describe('match erc721 spec', function () {
      beforeEach(async function () {
          this.contract = await ERC721MintableComplete.new({from: account_one});

          // mint multiple tokens
          await this.contract.mintUniqueTokenTo(account_two, 0, {from: account_one});
          await this.contract.mintUniqueTokenTo(account_three, 1, {from: account_one});
          await this.contract.mintUniqueTokenTo(account_four, 2, {from: account_one});
          await this.contract.mintUniqueTokenTo(account_five, 3, {from: account_one});
          await this.contract.mintUniqueTokenTo(account_six, 4, {from: account_one});
      });

      it('should return total supply', async function () {
        let result = await this.contract.totalSupply.call({from: account_one});
        assert.equal(result.toNumber(), 5, "unexcpected total supply");
      });

      it('should get token balance', async function () {
        let result = await this.contract.balanceOf.call(account_four, {from: account_one});
        assert.equal(result.toNumber(), 1, "initial balance of account_four should be 1");
      });

      // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
      it('should return token uri', async function () {
        let result = await this.contract.tokenURI.call(1, {from: account_one});
        assert.equal(result, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1", "invalid token uri");
      });

      it('should transfer token from one owner to another (check ownership and balances)', async function () {
        const tokenId = 0;

        // check if token is approved
        let approvedAddress = await this.contract.getApproved.call(tokenId, {from: account_one});
        assert.equal(parseInt(approvedAddress), 0, "token should not be approved.");

        // Approve to account_three
        await this.contract.approve(account_three, tokenId, {from: account_two});

        // account_three should be approved
        approvedAddress = await this.contract.getApproved.call(tokenId, {from: account_one});
        assert.equal(approvedAddress, account_three, "Should be approved for account_three");

        // check current owner
        let currentOwner = await this.contract.ownerOf.call(tokenId, {from: account_one});
        assert.equal(currentOwner, account_two, "Owner should be account_two");

        // check balances
        let balanceAccount_two = await this.contract.balanceOf.call(account_two, {from: account_one});
        assert.equal(balanceAccount_two.toNumber(), 1, "balance for account_two should be 1");

        let balanceAccount_four = await this.contract.balanceOf.call(account_four, {from: account_one});
        assert.equal(balanceAccount_four.toNumber(), 1, "balance for account_four should be 1");

        // transfer for account_two to account_four
        await this.contract.transferFrom(account_two, account_four, tokenId, {from: account_two});

        // check new owner
        currentOwner = await this.contract.ownerOf.call(tokenId, {from: account_one});
        assert.equal(currentOwner, account_four, "Owner should be account_four");

        // check new balances
        balanceAccount_two = await this.contract.balanceOf.call(account_two, {from: account_one});
        assert.equal(balanceAccount_two.toNumber(), 0, "balance for account_two should be 0");

        balanceAccount_four = await this.contract.balanceOf.call(account_four, {from: account_one});
        assert.equal(balanceAccount_four.toNumber(), 2, "balance for account_four should be 2");
      })
    });
});

