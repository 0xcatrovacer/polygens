//SPDX-License-Identifier: Unlicensed 

pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Counters.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/security/ReentrancyGuard.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "https://github.com/smartcontractkit/chainlink/blob/develop/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract Art is Ownable,ReentrancyGuard,ERC721Enumerable{
    
    using Counters for Counters.Counter;
    Counters.Counter private tokenId_;

    using Strings for uint256;
    
    bool private paused;
    string private baseURI;
    
    AggregatorV3Interface[] internal priceFeed;

    modifier isNotPaused{
        require(!paused,"Execution is paused currently");
        _;
    }
    
    uint public MAX_SUPPLY;
    uint public PRICE;

    struct tokenTether{
        uint8 index;
        int baseValue;
    }
    mapping(uint=>tokenTether) public tetherMapping;
    
    constructor(uint maxSupply,string memory base,uint price) ERC721("Poly Art","PRT") {
        MAX_SUPPLY = maxSupply;
        baseURI = base;
        PRICE = price;
        //BTC
        priceFeed.push(AggregatorV3Interface(0x007A22900a3B98143368Bd5906f8E17e9867581b));
        //DAI
        priceFeed.push(AggregatorV3Interface(0x0FCAa9c899EC5A91eBc3D5Dd869De833b06fB046));
        //ETH
        priceFeed.push(AggregatorV3Interface(0x0715A7794a1dc8e42615F059dD6e406A6594651A));
        //MATIC
        priceFeed.push(AggregatorV3Interface(0xd0D5e3DB44DE05E9F294BB0a3bEEaF030DE24Ada));
    }
    
    function mint(uint8 priceFeedIndex) external isNotPaused nonReentrant payable{
        require(tokenId_.current() < MAX_SUPPLY,"Minting Exceeds max supply");
        require(msg.value >= PRICE,"Amount paid is less than price");
        require(priceFeedIndex < getFeedsCount(),"Invalid feed index");
        tokenId_.increment();
        uint256 tokenId = tokenId_.current();
        _safeMint(msg.sender,tokenId);
        tetherMapping[tokenId_.current()] = tokenTether(
                                                priceFeedIndex,
                                                getPriceFeed(priceFeedIndex)
                                            );
    }
    
    function _baseURI() internal view override returns (string memory){
        return baseURI;
    }
    
    function changeBaseURI(string memory newURI) external onlyOwner{
        baseURI = newURI;
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        tokenTether storage tether = tetherMapping[tokenId];
        int currentPrice = getPriceFeed(tether.index);
        string memory base = _baseURI();

        if(currentPrice < (tether.baseValue*9)/10){
            return string(abi.encodePacked(base,uint(0).toString(),"/",tokenId.toString()));
        }
        else if(currentPrice > (tether.baseValue*11)/10){
            return string(abi.encodePacked(base,uint(2).toString(),"/",tokenId.toString()));
        }
        else{
            return string(abi.encodePacked(base,uint(1).toString(),"/",tokenId.toString()));
        }
    }

    function addPriceFeed(address priceFeedAddress) external onlyOwner {
        priceFeed.push(AggregatorV3Interface(priceFeedAddress));
    }
    
    function modifyPriceFeed(uint index,address priceFeedAddress) external onlyOwner{
        require(index<priceFeed.length,"Invalid index");
        priceFeed[index] = AggregatorV3Interface(priceFeedAddress);
    }
    
    function getFeedsCount() public view returns(uint){
        return priceFeed.length;
    }

    function getPriceFeed(uint index) public view returns(int){
        (
            uint80 roundID, 
            int price,
            uint startedAt,
            uint timeStamp,
            uint80 answeredInRound
        ) = priceFeed[index].latestRoundData();
        return price;
    }

    function togglePause() external onlyOwner{
        paused = !paused;
    }

    function withdraw() external onlyOwner{
        payable(owner()).transfer(address(this).balance);
    }   
}