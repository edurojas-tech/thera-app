const result = (timeStart, timeEnd) => {
  let tempo1 = timeStart;
  let tempo2 = timeEnd;
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getUTCDate();
  const dataIdentada = `${day < 10 ? "0" + day : day}/${month < 10 ? "0" + month : month}/${year}`

  let referencia = new Date(dataIdentada);
  let data1 = new Date(referencia.toDateString() + ' ' + tempo1);
  let data2 = new Date(referencia.toDateString() + ' ' + tempo2);

  let diferencaEmMilissegundos = Math.abs(data2 - data1);
  let segundos = Math.floor(diferencaEmMilissegundos / 1000);
  let minutos = Math.floor(segundos / 60);
  let horas = Math.floor(minutos / 60);

  // Ajuste os valores para obter a diferença correta
  minutos %= 60;
  segundos %= 60;

  return `${horas < 10 ? "0" + horas : horas | 0}:${minutos < 10 ? "0" + minutos : minutos   | 0}:${segundos < 10 ? "0" + segundos : segundos | 0}`
};

export default result;
