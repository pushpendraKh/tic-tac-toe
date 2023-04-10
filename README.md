# Tic-Tac-Toe

## Demo
https://drive.google.com/file/d/1RYwircJuKvz_CyHshb98dQBJ60aZKcwg/view

### contracts
This folder contains contracts, deployed abis.

### UI
This is frontend part of tic tac toe. 


### prerequisite before running Game on UI
1. Deploy Token on Metamask (or any provider). 
2. Deploy NFT on Metamask (or any provider).
3. In TicTacToe contract, update `TOKEN_CONTRACT_ADDRESS` and `NFT_CONTRACT_ADDRESS`. 
4. Deploy TicTacToe Contract on Metamask (or any provider).
5. Mint tokens from deployed Token (say 5000)
6. Load token into player's acccont, so that they can play the game. (using transfer method)
7. Approve the contract to execute transactions from Player's behalf for some amount (Make sure you do it from player's account)
8. Now you are ready to play the game. (Do step 6,7 for all players who want to play the game).


Note: We stake 100 coins to play the game, so user should atleast have 100 points in his account.
