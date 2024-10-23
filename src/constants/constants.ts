import { Dimensions } from "react-native"
import { Posicao } from "../model/Jogo"

export const DIMENSAO = Dimensions.get("window").width * 0.3
export const ESPECURA = 10
export const DIMENSAO_PONTO = Dimensions.get("window").width * 0.12
export const ROTATE = "45"

export const arrayJogo: Array<Posicao> = [
    { posicao: [1, 1], disponivel: false, pedra: true },
    { posicao: [1, 2], disponivel: false, pedra: true },
    { posicao: [1, 3], disponivel: false, pedra: true },
    { posicao: [2, 1], disponivel: false, pedra: false },
    { posicao: [2, 2], disponivel: false, pedra: false },
    { posicao: [2, 3], disponivel: false, pedra: false },
    { posicao: [3, 1], disponivel: false, pedra: true },
    { posicao: [3, 2], disponivel: false, pedra: true },
    { posicao: [3, 3], disponivel: false, pedra: true }
]