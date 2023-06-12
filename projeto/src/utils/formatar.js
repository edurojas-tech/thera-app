function startDay(informacao) {
  const isoString = informacao;
  const date = new Date(isoString);
  let hours = date.getHours()  + 3;
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  return `
    ${hours < 10 || hours > 23  ? "0" + hours : hours }:${minutes < 10 ? "0" + minutes : minutes | 0}:${seconds < 10 ? "0" + seconds : seconds | 0}`;
}

function dataFormatada(informacao) {
  const isoString = informacao;
  const date = isoString ? new Date(isoString) : new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${day < 10 ? "0" + day : day}/${month < 10 ? "0" + month : month}/${year}`;
}

function horarioFormatado(informacao) {
  const isoString = informacao;
  const date = new Date(isoString);
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  return `
    ${hours < 10 || hours > 23  ? "0" + hours : hours | 0 }:${minutes < 10 ? "0" + minutes : minutes | 0}:${seconds < 10 ? "0" + seconds : seconds | 0}`;
}


export default {
  dataFormatada,
  horarioFormatado,
  startDay
};
