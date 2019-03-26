var ERC721MintableComplete = artifacts.require('REstXERC721Token');

contract('TestERC721Mintable', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];

    describe('have ownership properties', function () {
        beforeEach(async function () {
            this.contract = await ERC721MintableComplete.new({from: account_one});
        })

        it('should fail when minting when address is not contract owner', async function () {
            // TODO: Implement test
        })

        it('should return contract owner', async function () {
            // TODO: Implement test
        })

        // TODO: Test Event 'OwnershipTransfered' Emitted
    });

    // TODO: Test Pausable Contract

    // TODO: Test (// TODO require the given address to not be the owner of the tokenId) - function "approve"
    // TODO: Test TODP require the msg sender to be the owner of the contract or isApprovedForAll() to be true - function "approve"
    // TODO: Test // TODO add 'to' address to token approvals - function "approve"
    // TODO: Test // // TODO emit Approval Event - function "approve"
    // TODO: Test // TODO return token approval if it exists - function "getApproved"

    describe('match erc721 spec', function () {
        beforeEach(async function () {
            this.contract = await ERC721MintableComplete.new({from: account_one});

            // TODO: mint multiple tokens
        })

        it('should return total supply', async function () {
            // TODO: Implement test
        })

        it('should get token balance', async function () {
            // TODO: Implement test
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () {
            // TODO: Implement test
        })

        it('should transfer token from one owner to another', async function () {
            // TODO: Implement test
        })
    });


})

