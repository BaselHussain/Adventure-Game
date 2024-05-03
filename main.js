import chalk from "chalk";
import inquirer from "inquirer";
class Player {
    name;
    health = 100;
    drinkPortion = 3;
    constructor(name) {
        this.name = name;
    }
    healthDecrease() {
        this.health -= 25;
    }
    healthIncrease() {
        this.health = 100;
    }
    drinkHealthPortion() {
        if (this.drinkPortion > 0) {
            this.healthIncrease();
            this.drinkPortion--;
            console.log(chalk.bold.green.italic(`You drank a health portion, now your health is ${this.health}`));
            console.log(chalk.red.bold(`${this.drinkPortion} drink portions left`));
        }
        else {
            console.log(chalk.red.bold(`You have insufficient health portions`));
        }
    }
}
class Opponent {
    name;
    health = 100;
    constructor(name) {
        this.name = name;
    }
    healthDecrease() {
        this.health -= 25;
    }
}
async function startGame() {
    let playAgain = true;
    while (playAgain) {
        const warriors = await inquirer.prompt([
            {
                name: "player",
                type: "input",
                message: "Please enter player name"
            },
            {
                name: "opponent",
                type: "list",
                message: "Please select your opponent",
                choices: ["Skeleton", "Assassin", "Zombie"]
            }
        ]);
        const playerName = warriors.player;
        const opponentName = warriors.opponent;
        const player1 = new Player(playerName);
        const opponent1 = new Opponent(opponentName);
        while (player1.health > 0 && opponent1.health > 0) {
            if (opponentName === "Skeleton" || opponentName === "Assassin" || opponentName === "Zombie") {
                console.log(`${chalk.bold.blue(player1.name)} Vs ${chalk.bold.yellow(opponent1.name)}`);
                const ask = await inquirer.prompt([
                    {
                        name: "option",
                        type: "list",
                        message: "What do you want to do",
                        choices: ["Attack", "Drink portion", "Run for life"]
                    }
                ]);
                if (ask.option === "Attack") {
                    const number = Math.floor(Math.random() * 2);
                    if (number === 1) {
                        player1.healthDecrease();
                        console.log(chalk.bold.red(`${player1.name} health = ${player1.health}`));
                        console.log(chalk.bold.green(`${opponent1.name} health = ${opponent1.health}`));
                        if (player1.health === 0) {
                            console.log(chalk.red.bold.italic(`You loose!Better luck next time`));
                        }
                    }
                    else {
                        opponent1.healthDecrease();
                        console.log(chalk.bold.green(`${player1.name} health = ${player1.health}`));
                        console.log(chalk.bold.red(`${opponent1.name} health = ${opponent1.health}`));
                        if (opponent1.health === 0) {
                            console.log(chalk.green.bold.italic(`You Win!`));
                        }
                    }
                }
                else if (ask.option === "Drink portion") {
                    player1.drinkHealthPortion();
                }
                else {
                    console.log(chalk.red.bold.italic("You loose! Better luck next time"));
                    process.exit();
                }
            }
        }
        const playAgainResponse = await inquirer.prompt({
            name: "playAgain",
            type: "confirm",
            message: "Do you want to play again?",
            default: false
        });
        playAgain = playAgainResponse.playAgain;
    }
}
startGame();
