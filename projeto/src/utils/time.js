import { formatToDate, formatToDateTime } from 'brazilian-values';

let currentData = ''
let currentHora = ''

currentData = formatToDate(new Date())
currentHora = formatToDateTime(new Date())

let hora = `${new Date(currentHora).getHours() < 10 ? '0' + new Date(currentHora).getHours() : new Date(currentHora).getHours() }`
let minuto = `${new Date(currentHora).getMinutes() < 10 ? '0' + new Date(currentHora).getMinutes() : new Date(currentHora).getMinutes() }`
let segundos = `${new Date(currentHora).getSeconds() < 10 ? '0' + new Date(currentHora).getSeconds() : new Date(currentHora).getSeconds() }`
const horaFormatada = `${hora}:${minuto}:${segundos}`

export default {
  horaFormatada,
  currentData
}