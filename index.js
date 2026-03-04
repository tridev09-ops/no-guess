import * as readline from 'node:readline/promises'
import {
    stdin as input,
    stdout as output
} from 'node:process'

let rl
let randNum = Math.round(Math.random() * 100)
let userNum
let attempts = 0

async function createRlInterface() {
    // Create a readline interface
    rl = readline.createInterface({
        input, output
    })
}

async function reset() {
    randNum = Math.round(Math.random() * 100)
    userNum = undefined
    attempts = 0
}

async function compareNum() {
    if (randNum == userNum) {
        console.log(`Congratulations! You guessed the correct number in ${attempts} attempts.`)

        await createRlInterface()
        const userInput = await rl.question('\nDo you want to play again(y or n): ')
        rl.close()

        if (userInput == 'y') takeInput()
        else return
    } else {
        console.log(`Incorrect! The number is ${randNum > userNum?'greater': 'less'} than ${userNum}`)
        await takeInput()
    }
}

async function takeInput() {
    await createRlInterface()
    userNum = await rl.question('\nEnter your guess: ')

    rl.close()
    attempts++
    await compareNum()
}

function startGame() {
    console.log(`Welcome to the Number Guessing Game! \nI'm thinking of a number between 1 and 100.`)
    takeInput()
}

startGame()