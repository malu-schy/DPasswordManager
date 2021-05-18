pragma solidity ^0.8.3;


import "hardhat/console.sol";

contract PasswordManager {

    struct PasswordItem{
        uint id; 
        string title; 
        string username; 
        string password; 
    }

    PasswordItem[] passwords; 

    constructor(){
        console.log("Successfully deployed PasswordManager-Contract");
        passwords.push(PasswordItem(0, "Facebook", "bla@blub,de", "Flasche1"));
    }

    function getNumberOfPasswords() public view returns(uint) {
        return passwords.length;
    }

    function fetchPassword(uint _id) public view returns (string memory){
        return passwords[_id].password;
    }

    function setPassword(string memory _password) public {
        PasswordItem memory newPassword; 
        newPassword.id = passwords.length -1;
        newPassword.title = "Facebook";
        newPassword.username = "LocalerHost@1337.de";
        newPassword.password = _password; 
        passwords.push(newPassword);
    }

    // function decryptPassword(){}

    // function encryptPassword(){}

    // function deletePassword() {}

}