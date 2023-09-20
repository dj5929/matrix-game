
import { useState } from 'react';
import Matrix from "./Matrix";
import Scoreboard from "./Scoreboard";
import { checkDistance, getOppMove, DefaultDict } from "../utils/Utils";
import { Button } from 'react-bootstrap';


const userMoveStates = ["Defend", "Attack"];
export default function Game({ matrixSize, numRounds, showToastMsg, showGameOver }) {
    const initialGameState = {
        userMoveState: 1,
        round: 1,
        userScore: 0,
        oppScore: 0,
        userMoveHistory: [],
        oppMoveHistory: [],
        colorDict: new DefaultDict("secondary"),
        disable: false,
        gameEndMsg: "",
    };
    const [gameState, updateGameState] = useState(initialGameState);
    const resetState = () => { updateGameState(initialGameState); };
    if (gameState.round > numRounds) {
        const newGameState = { ...gameState };
        newGameState.gameEndMsg = gameState.userScore > gameState.oppScore ? "You Won!" : gameState.userScore === gameState.oppScore ? "It's a Draw!" : "You Lost!";
        newGameState.disable = true;
        newGameState.round = numRounds;
        updateGameState(newGameState);
    }
    const movePlayed = (currUserMove) => {
        var { userMoveState, round, userScore, oppScore, userMoveHistory, oppMoveHistory, colorDict, disable, gameEndMsg } = gameState;
        const [prevUserMove, prevOppMove] = [userMoveHistory.at(-1), oppMoveHistory.at(-1)];
        if (currUserMove === prevOppMove) {
            showToastMsg("Sorry, you cannot select the previously attacked square by opponent!");
            return;
        }
        if (userMoveState && !checkDistance(prevUserMove, currUserMove)) {
            showToastMsg("Sorry, you have to select a square nearby the last attacked square!");
            return;
        }
        let currOppMove = getOppMove(userMoveState, prevOppMove, prevUserMove, matrixSize);
        console.log("Moves:", currUserMove, currOppMove);
        if (userMoveState) if (currOppMove === currUserMove) oppScore += 1; else userScore += 1;
        else if (currOppMove === currUserMove) userScore += 1; else oppScore += 1;
        if (userMoveState) {
            console.log("User change", prevUserMove, currUserMove);
            if (prevUserMove) colorDict[prevUserMove] = "secondary";
            colorDict[currUserMove] = "danger";
            userMoveHistory[userMoveHistory.length] = currUserMove;
        }
        else {
            console.log("Opp change", prevOppMove, currOppMove);
            if (prevOppMove) colorDict[prevOppMove] = "secondary";
            colorDict[currOppMove] = "primary";
            oppMoveHistory[oppMoveHistory.length] = currOppMove;
        }
        round += 1;
        userMoveState = 1 - userMoveState;
        updateGameState({ userMoveState, round, userScore, oppScore, userMoveHistory, oppMoveHistory, colorDict, disable, gameEndMsg });
    };
    const doOnUserMove = (currUserMove) => { movePlayed(currUserMove); };
    return (
        <div className="Game">
            < div style={gameState.disable ? { pointerEvents: "none", opacity: "0.4" } : {}} >
                <Matrix matrixSize={matrixSize} doOnUserMove={doOnUserMove} colorDict={gameState.colorDict} />
                <Scoreboard userScore={gameState.userScore} oppScore={gameState.oppScore} />
            </ div >
            <h1>Round {gameState.round} : User {userMoveStates[gameState.userMoveState]}</h1>
            <h1>{gameState.gameEndMsg}</h1>
            <Button onClick={() => resetState()}> New Game </Button>
        </div >
    );
};