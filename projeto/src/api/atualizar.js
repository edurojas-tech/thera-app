import axios from "axios";
const urlRegistro = (id) =>
  `https://theraponto.dev.thera.com.br:4433/api/Timesheet/${id}`;

function setData(id, marcacao) {
  const tokken = sessionStorage.getItem("token");
  const dadoJson = JSON.stringify({
    [marcacao]: new Date(),
  });
  axios
    .put(urlRegistro(id), dadoJson, {
      headers: {
        Authorization: `Bearer ${tokken}`,
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      alert("Marcação de ponto registrado com Sucesso!");
      console.log(res)
    }).catch(()=>{
      alert("Sem Marcação registrada!");
    })
}

export default {
  setData,
};
