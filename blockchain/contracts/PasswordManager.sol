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
    
    // keeps track of the address that owns a password
    mapping(uint => address) public passwordToOwner;
    mapping(address => uint) ownerPasswordCount;


    constructor(){
        console.log("Successfully deployed PasswordManager-Contract");
        passwords.push(PasswordItem(0, "InitialTitle", "InitialUsername", "InitialPassword"));
    }
 
    function getNumberOfPasswords() public view returns(uint) {
        return passwords.length;
    }

     function fetchId(uint _id) public view returns (uint){
        return passwords[_id].id;
    }

    function fetchTitle(uint _id) public view returns (string memory){
        return passwords[_id].title;
    }

    function fetchUsername(uint _id) public view returns (string memory){
        return passwords[_id].username;
    }

    function fetchPassword(uint _id) public view returns (string memory){
        return passwords[_id].password;
    }

    function setPassword(string memory _title, string memory _username, string memory _password) public {
        console.log(_title, _username, _password);
        PasswordItem memory newPassword; 
        newPassword.id = passwords.length -1;
        passwordToOwner[newPassword.id] = msg.sender; 
        ownerPasswordCount[msg.sender]++;
        newPassword.title = _title;
        newPassword.username = _username;
        newPassword.password = _password; 
        passwords.push(newPassword);
    }

    function getPasswordsByOwner(address _owner) external view returns(uint[] memory){
        uint[] memory result = new uint[](ownerPasswordCount[_owner]);
        uint counter = 0;
        // zählt i hoch so viele Passwörter es gibt
        for(uint i = 0; i <= passwords.length; i++){
            // wenn zu die id zur Adresse in der Map passt, 
            if(passwordToOwner[i] == _owner) {
                // dann packe die id in unser array 
                result[counter] = i;
                counter++;
            }
        }
        // gebe liste der ID s zurück der Passwörter des Owners
        return result;
    }
}