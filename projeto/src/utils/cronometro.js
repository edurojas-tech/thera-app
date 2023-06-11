let hora = 0;
let minuto = 0;
let segundos = 0;
let startTimer

function formataTime(time) {
  return time < 10 ? `0${time}` : time;
}

function Horas(){
  if (hora == 59) {
    hora = 0;
    hora = hora + 1;
  } else {
    hora = hora + 1;
  }
}

function Minutos(){
  if (minuto == 59) {
    minuto = 0;
    minuto = minuto + 1;
    Horas()
  } else {
    minuto = minuto + 1;
  }
}

function Segundos(){
  if (segundos == 59) {
    segundos = 0;
    segundos = segundos + 1;
    Minutos()
  } else {
    segundos = segundos + 1;
  }
}

function startCrono() {
  startTimer = setInterval(() => {
    Segundos()
    console.log(`${formataTime(hora)}:${formataTime(minuto)}:${formataTime(segundos)}`) 
  }, 1000);
}

function stopTimer(){
  clearInterval(startTimer)
}

export default {
  startCrono,
  stopTimer,
  hora,
  minuto,
  segundos  
}