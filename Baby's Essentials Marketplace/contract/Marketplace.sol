pragma solidity ^0.8.0;
// SPDX-License-Identifier: MIT
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Marketplace is ERC20 {
   //string public name;
    uint public productCount = 0;
    mapping(uint => Product) public products;
    
    struct Product {
        uint id;
        string name;
        uint price;
        address payable owner;
        bool purchased;
    }


    constructor() ERC20("Rinnegan", "Rin"){
        _mint(0xbAF8395cE964b37F0a2aB9ECa162287F985398E2, 1000000000000000000000);
        //name = "Baby's Essentials";
         //token = TokenContract();
    }
    
    event CreatedProduct(
        uint id,
        string name,
        uint price,
        address payable owner,
        bool purchased
    );

    event PurchasedProduct(
        uint id,
        string name,
        uint price,
        address payable owner,
        bool purchased
    );
    
    function Method_Product_Creation(string memory prod_name, uint prod_price) public {
        require(bytes(prod_name).length > 0 && prod_price > 0);
        productCount ++;
        products[productCount] = Product(productCount, prod_name, prod_price, payable(msg.sender), false);
        emit CreatedProduct(productCount, prod_name, prod_price, payable(msg.sender), false);
    }

    function Method_Product_Purchase(uint p_id) public payable {
        Product memory tmp_product = products[p_id];
        address payable _seller = tmp_product.owner;
        require(tmp_product.id > 0 && tmp_product.id <= productCount);
        require(balanceOf(msg.sender) >= tmp_product.price);
        require(!tmp_product.purchased);
        require(_seller != msg.sender);
        tmp_product.owner = payable(msg.sender);
        tmp_product.purchased = true;
        products[p_id] = tmp_product;
        //_seller.transfer(msg.value);
        transfer(address(_seller), tmp_product.price);
        //_transfer(msg.sender, _seller, msg.value);
        //address(payable(_seller)).transfer(msg.value);
        //emit PurchasedProduct(productCount, tmp_product.name, tmp_product.price, payable(msg.sender), true);
    }
}