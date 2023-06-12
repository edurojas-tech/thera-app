import axios from "axios";
import Time from '../utils/time'


const urlRegistro = "https://theraponto.dev.thera.com.br:4433/api/Timesheet";

function setData() {
  const tokken = sessionStorage.getItem("token");
  const dadoJson = {
    body: {
      start: JSON.stringify(Time.horaFormatada)
    },
  };
  axios
    .post(urlRegistro, dadoJson.body, {
      headers: {
        Authorization: `Bearer ${tokken}`,
        "Content-Type": "application/json",
      },
    })
    .then(() => {
      alert("Marcação de ponto registrado com Sucesso!");
      location.reload()
    });
}

export default {
  setData,
};
