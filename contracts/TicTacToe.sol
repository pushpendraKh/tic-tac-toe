// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

import "./Token.sol";
import "./NFT.sol";

// TOKEN CONTRACT ACCOUNT - 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4

// TOKEN CONTRACT ADDRESS - 0x3328358128832A260C76A4141e19E2A943CD4B6D 

// PLAYER 1 = 0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2 - push [0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2,push]
// PLAYER 2 = 0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db - rohan [0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db,Rohan] 

// TICK TAC TOE CONTRACT ADDRESS - 0x8862090A79412D034d9Fb8C9DBFd3194C8D2a2EE 

contract TicTacToe {
    struct Player {
        address payable playerAddress;
        string playerName;
    }

    enum GameState {
        NOTSTART, // 0
        RUNNING,  // 1
        WINNING,  // 2
        DRAW      // 3
    }

    struct Room {
        Player[2] players;
        uint256 activePlayer;  // it can be either 0 or 1
        bool isRoomActive; // if player are playing, room will be active, otherwise inactive
        Player winnerPlayer; // it will store the address of winner, if match is draw, then it will be zero address
        uint256[9] board;   // board array to record moves of players
        uint256 lastPlayedTime; // when last moved was played by a player
        uint8 movedRecorded; // To note number of moves played on the board
        GameState state; // Game's current state
    }

    // Deployed Address for the Token  
    address private constant TOKEN_CONTRACT_ADDRESS = 0x3328358128832A260C76A4141e19E2A943CD4B6D;

    // Define Timeout for the game
    uint public constant GAME_TIMEOUT = 5 minutes;

    // STAKING required by players of the game
    uint public constant STAKE = 100;  

    // Possible moves to win the game
    uint8[3][8] winningMoves = [
        [0,1,2], [3,4,5], [6,7,8], [0,4,8], [2,4,6], [0,3,6], [1,4,7], [2,5,8]
    ];

    /// Mapping to store multiple Games
    mapping (uint => Room) rooms;

    // Latest room ID
    uint private currentRoomId = 0;

    // To check if any player is waiting for another player to join the game.
    bool private isPlayerWaiting = false;

    // Events
    event GameStarted(uint256 indexed gameId, Room room);
    event GameEnded(uint256 indexed gameId, Room room);

    /// Allow a player to join the room and return the game ID
    ///
    /// If there is no player, it will create a room where player can wait for another player
    /// if there is a player waiting, it adds another player to the game and start the game.

    function joinRoom(Player calldata player) public returns (uint256) {
        console.log("Joining room");
        console.log(msg.sender);
        // Before joining the game, stake the required Token to play the game.
        stakeAmount(player.playerAddress, STAKE);

        if(isPlayerWaiting) {
            rooms[currentRoomId].players[1] = player;
            rooms[currentRoomId].isRoomActive = true;
            rooms[currentRoomId].state = GameState.RUNNING;
            rooms[currentRoomId].lastPlayedTime = block.timestamp;
            isPlayerWaiting = false;
            tossGame();
            emit GameStarted(currentRoomId, rooms[currentRoomId]);
            console.log("Player 2 also entered into game, Let's begin!! and the turn is for %s", rooms[currentRoomId].players[rooms[currentRoomId].activePlayer].playerName);
        } else {
           rooms[++currentRoomId].players[0] = player; // Player(payable(player.playerAddress),player.playerName);
           isPlayerWaiting = true;
           console.log("Player 1 entered into game, waiting for player 2");
           rooms[currentRoomId].state = GameState.NOTSTART;
        }
        return currentRoomId;
    }

    /// Record a move by a player on the board for a given game ID
    function move(uint gameId, uint8 boardIndex) public {
        require(currentRoomId >= gameId, "Room does not exist");
        require(msg.sender == rooms[gameId].players[0].playerAddress || msg.sender == rooms[gameId].players[1].playerAddress, "Unknown player");
        require(rooms[gameId].isRoomActive, "Game is Over");
        require(rooms[gameId].board[boardIndex] == 0, "Another Player already played this move. Try another"); 
        require(msg.sender == rooms[gameId].players[rooms[gameId].activePlayer].playerAddress, "It's not your turn. Please wait");
        // require(block.timestamp < rooms[gameId].lastPlayedTime + rooms[gameId].timeout, "Timeout: you took too long to make your move man");

        if(block.timestamp > rooms[gameId].lastPlayedTime + GAME_TIMEOUT) {
            console.log("%s, sadly you have exceeded time to record a move :(. You lost the game", rooms[gameId].players[rooms[gameId].activePlayer].playerName);
            endGameAndAnnounceWinner(gameId, (rooms[gameId].activePlayer + 1) % 2);
        }

        // record the move in the game
        uint256 whichPlayer = rooms[gameId].activePlayer + 1;
        rooms[gameId].board[boardIndex] = whichPlayer;
        rooms[gameId].movedRecorded++;


        //check winner or game over conditions
        if (checkWinner(whichPlayer, rooms[gameId].board)) {
            endGameAndAnnounceWinner(gameId,rooms[gameId].activePlayer);
        } else if (rooms[gameId].movedRecorded == 9) {
            console.log("Alias!! It's a draw. Returning your hard earned token back to you.");
            rooms[gameId].isRoomActive = false;
            rooms[gameId].state = GameState.DRAW;

            // return the staked money back to players
            IERC20 token = IERC20(TOKEN_CONTRACT_ADDRESS);
            token.transfer(rooms[gameId].players[0].playerAddress, STAKE);
            token.transfer(rooms[gameId].players[1].playerAddress, STAKE);
            return;
        }

        rooms[gameId].activePlayer = whichPlayer % 2;
        rooms[gameId].lastPlayedTime = block.timestamp;
    }

    // @dev Check if a player has won the game.
    // @params player index and board state 
    function checkWinner(uint player, uint256[9] memory board) private view returns (bool) {
        for (uint8 i = 0; i < winningMoves.length; i++) {
            uint8[3] memory filter = winningMoves[i];
            if (board[filter[0]] == player && board[filter[1]]==player && board[filter[2]]==player) return true;
        }
        return false;
    }


    // End the game and announce the winner
    function endGameAndAnnounceWinner(uint gameId, uint winnerPlayerIndex) private {
        rooms[gameId].isRoomActive = false;
        rooms[gameId].winnerPlayer = rooms[gameId].players[winnerPlayerIndex];
        rooms[gameId].state = GameState.WINNING;
        rewardWinner(gameId);

        emit GameEnded(gameId,rooms[gameId]);

        console.log("Congratulations %s for winning the game.", rooms[gameId].winnerPlayer.playerName);
    }

 
    // Randoming tosses and assigns to the active player.
    function tossGame() private {
        rooms[currentRoomId].activePlayer = uint(keccak256(abi.encodePacked(block.timestamp,msg.sender, currentRoomId))) % 2;
    }

    // A function to check whether a game is running or not.
    function isGameRunning(uint gameId) public view returns (bool) {
        return rooms[gameId].isRoomActive;
    }

    /// A function to check game state. 
    /// It can be used to know when a player does not make a move and you want to check and update game state.
    function CheckGameState(uint gameId) public returns (bool, GameState) {
        if(block.timestamp > rooms[gameId].lastPlayedTime + GAME_TIMEOUT && rooms[gameId].state == GameState.RUNNING) {
            endGameAndAnnounceWinner(gameId, (rooms[gameId].activePlayer + 1) % 2);    
        }
        return (rooms[gameId].isRoomActive, rooms[gameId].state);
    }

    // Used to reward the winner of a game.
    function rewardWinner(uint gameId) private {
        require(rooms[gameId].winnerPlayer.playerAddress != address(0), "There is no winner yet");    

        IERC20 token = IERC20(TOKEN_CONTRACT_ADDRESS);
        require(token.balanceOf(address(this)) >= STAKE*2, "You do not have suffient balance to reward");
        
        token.transfer(rooms[gameId].winnerPlayer.playerAddress, STAKE * 2);
    }

    // To check balance of the contract
    function contractBalance() view external returns (uint256) {
        IERC20 token = IERC20(TOKEN_CONTRACT_ADDRESS);
        return token.balanceOf(address(this));
    }

    // Stake amount while playing the game
    function stakeAmount(address sender, uint256 amount) private {
        IERC20 token = IERC20(TOKEN_CONTRACT_ADDRESS);
        console.log(token.allowance(sender, address(this)));
        
        require(
            token.allowance(sender, address(this)) >= amount,
            "Player has not given authority to transfer token from his account. Please ask him to approve the transfer."
        );

        token.transferFrom(sender, address(this), amount);
    }
     
    // Get the board state for a game Id 
    function getBoardForRoom(uint gameId) external view returns(uint256[9] memory) {
        require(rooms[gameId].players[0].playerAddress != address(0), "Game does not exist");
        return rooms[gameId].board;
    }
}