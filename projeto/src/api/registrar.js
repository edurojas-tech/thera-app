import axios from "axios";
const urlRegistro = "https://theraponto.dev.thera.com.br:4433/api/Timesheet";

function setData() {
  const tokken = sessionStorage.getItem("token");
  const dadoJson = {
    body: {
      start: JSON.stringify(new Date()),
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
