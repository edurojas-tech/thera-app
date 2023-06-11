import axios from "axios";

const rotaPonto = () => (location.href = `http://${location.host}/ponto`);
const login = (form, user, senha, password = "password") => {
  const formData = new FormData(document.getElementById(form));
  axios
    .post("https://theraponto.dev.thera.com.br:4433/api/Accounts", {
      userID: formData.get(user),
      accessKey: formData.get(senha),
      grantType: password,
    })
    .then(function (response) {
      if (response.status == 200) {
        sessionStorage.setItem("token", response.data.accessToken);
        sessionStorage.setItem("UserName", response.data.name)
        rotaPonto()
      }
    })
    .catch(() => {
      alert("erro ao logar, verifique seu acesso!");
    });
};

const autenticado = () => {
  if (sessionStorage.getItem("token") != null) {
    rotaPonto()
  }
};

export default {
  login,
  autenticado,
};
