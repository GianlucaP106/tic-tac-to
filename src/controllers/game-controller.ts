import { Game, GameToken, User } from "@prisma/client";
import { prisma } from "../../prisma/prisma";
import { getPrincipal } from "./user-controller";


export async function getGameById(id: string): Promise<Game | null> {
    return prisma.game.findUnique({
        where: {
            id
        }
    })
}


export async function createGame(email: string): Promise<Game> {
    const principal = await getPrincipal()
    const gameState: GameToken[] = (() => {
        let out: GameToken[] = []
        for (let i = 0; i < 9; i++) {
            out.push(GameToken.E)
        }
        return out
    })()

    return prisma.game.create({
        data: {
            player1Id: principal.id,
            player1Token: GameToken.O,
            player1Turn: true,
            gameState: gameState
        }
    })
}


export async function getGamesByPrincipal(): Promise<Game[]> {
    const principal = await getPrincipal()

    const homeGamesPromise = prisma.game.findMany({
        where: {
            player1Id: principal.id
        }
    })

    const awayGamesPromise = prisma.game.findMany({
        where: {
            player2Id: principal.id
        }
    })

    const [homeGames, awayGames] = await Promise.all([homeGamesPromise, awayGamesPromise])
    return [...homeGames, ...awayGames]
}


export function computeTurn(user: User, game: Game) {
    const home: boolean = user.id === game.player1Id
    return (home && game.player1Turn) || (!home && !game.player1Turn)
}


export async function makeMove(gameId: string, index: number): Promise<Game> {
    if (index < 0 || index >= 9) {
        throw new Error("Bad move")
    }

    const game = await getGameById(gameId)
    if (!game) {
        throw new Error("Bad move")
    }

    const principal = await getPrincipal()

    const myTurn = computeTurn(principal, game)

    if (!myTurn) {
        throw new Error("Bad move")
    }

    const myToken = game.player1Id === principal.id ? GameToken.O : GameToken.X
    const state = [...game.gameState]

    if (state[index] !== GameToken.E) {
        throw new Error("Bad move")
    }

    state[index] = myToken

    // check winner
    const winner = checkWinner(state)
    // TODO: winner

    return prisma.game.update({
        where: {
            id: game.id
        },
        data: {
            gameState: state,
            player1Turn: !game.player1Turn
        }
    })
}


export async function joinGame(gameId: string): Promise<Game> {
    const principal = await getPrincipal()
    const game = await getGameById(gameId)
    if (!game) {
        throw new Error("Bad move")
    }

    return prisma.game.update({
        where: {
            id: game.id
        },
        data: {
            player2Id: principal.id
        }
    })

}


function checkWinner(board: GameToken[]) {
    const winningCombos = [
        // Rows
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        // Columns
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        // Diagonals
        [0, 4, 8],
        [2, 4, 6]
    ];

    // Check each winning combination
    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (board[a] !== GameToken.E && board[a] === board[b] && board[b] === board[c]) {
            return board[a]; // Winner found
        }
    }

    // No winner found
    return null;
}
