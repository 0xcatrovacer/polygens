//SPDX-License-Identifier: Unlicensed 

pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Counters.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/security/ReentrancyGuard.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract Art is Ownable,ReentrancyGuard,ERC721Enumerable{
    
    using Counters for Counters.Counter;
    Counters.Counter private tokenId_;
    
    bool private paused;
    string private baseURI;
    
    modifier isNotPaused{
        require(!paused,"Execution is paused currently");
        _;
    }
    
    uint public MAX_SUPPLY;
    uint public PRICE;
    
    constructor(uint maxSupply,string memory base,uint price) ERC721("Poly Art","PRT") {
        MAX_SUPPLY = maxSupply;
        baseURI = base;
        PRICE = price;
    }
    
    function mint() external isNotPaused nonReentrant payable{
        require(tokenId_.current() < MAX_SUPPLY,"Minting Exceeds max supply");
        require(msg.value >= PRICE,"Amount paid is less than price");
        tokenId_.increment();
        uint256 tokenId = tokenId_.current();
        _safeMint(msg.sender,tokenId);
    }
    
    function _baseURI() internal view override returns (string memory){
        return baseURI;
    }
    
    function changeBaseURI(string memory newURI) external onlyOwner{
        baseURI = newURI;
    }
    
    function togglePause() external onlyOwner{
        paused = !paused;
    }
    
}