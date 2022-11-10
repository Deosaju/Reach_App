import { loadStdlib } from '@reach-sh/stdlib';
import * as backend from './build/index.main.mjs';
const stdlib = loadStdlib();

// create test users
const StartingBalance = stdlib.parseCurrency(100); // 100 tokens and sent it over network
const accAlice = await stdlib.newTestAccount(StartingBalance);
const accBob = await stdlib.newTestAccount(StartingBalance);

const ctcAlice = accAlice.contract(backend);
const ctcBob = accBob.contract(backend, ctcAlice.getInfo());

// Building the game
// Alice and Bob are going to play a game of rock, paper, scissors.
// Alice and Bob will each have a hand of either rock, paper, or scissors.
// The winner will be the one who has the stronger hand.
// Rock beats scissors, scissors beats paper, and paper beats rock.
// If both players have the same hand, then it is a tie.

const Hands = ['rock', 'paper', 'scissors'];
const OutCome = ['tie', 'Alice Wins', 'Bob Wins'];
const Player = (who) => ({
    getHand:() => {
        const hand = Math.floor(Math.random() * 3);
        console.log(`${who} Played ${Hands[hand]}`);
        return hand;
    },
    seeOutCome:(outCome) => {
        console.log(`${who} saw Outcome ${OutCome[outCome]}`);
    }
});

// automate the interaction

await Promise.all([
    ctcAlice.p.Alice({
        // Alice's interface
        ...Player('Alice'),
    }),
    ctcBob.p.Bob({
        // Bob's interface
        ...Player('Bob'),
    })
]);

