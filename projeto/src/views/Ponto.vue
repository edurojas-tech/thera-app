<script setup>
  import { onUpdated, onMounted, ref } from 'vue'
  import axios from 'axios'
  import Info from "../components/Info.vue"
  import Button from "../components/Button.vue"
  import registrar from '../api/registrar'
  import atualizar from '../api/atualizar'
  import formatar from '../utils/formatar'
  import Loader from '../components/Loader.vue'
  import CalcTime from '../utils/calcTempo'

  let listagem = ref('')
  let today = ref('')
  let startDay = ref('')
  let startLunch = ref('')
  let endLunch = ref('')
  let end = ref('')
  let currentTime = ref('')
  let comparaTime = ref('')
  today = formatar.dataFormatada()

  function registrosPontos () {
    setTimeout(() => {
      const tokken = sessionStorage.getItem("token")
      const config = {
        headers: { 
          "Authorization": `Bearer ${tokken}`,
          "Content-Type": 'application/json'
        }
      };
      axios.get( 
        'https://theraponto.dev.thera.com.br:4433/api/Timesheet',
        config
      ).then((res)=> {
        listagem.value = res.data.items
      }).catch((res)=>{
        res.response.status == 401 && (
          sessionStorage.removeItem("token"),
          location.href = `http://${location.host}`
        )
      });
    }, 800);
  }

  function validador(){ 
    const dataATUAL = new Date(listagem.value[0].start)
    const diavalidar = new Date()
    const dia1 = dataATUAL.getUTCDate()
    const dia2 = diavalidar.getUTCDate()
    
    // validaMarcacoes
    startDay.value = listagem.value[0].start
    startLunch = listagem.value[0].startLunch
    endLunch = listagem.value[0].endLunch
    end = listagem.value[0].end
    return dia1 == dia2
  }

  function cadastrar() {
    if(listagem.value.length > 0){  
      listagem.value[0].start && validador()
        ? alert("Marcação já registrada!")
        : registrar.setData()
    }else {
      registrar.setData()
    }
  }

  function atualizaPonto(marcacao, prevMarcacao) {
    if(listagem.value[0][marcacao] && validador()){
      alert("Marcação já registrada!")
    }else{
      listagem.value[0][prevMarcacao] 
        ? (atualizar.setData(listagem.value[0].id, marcacao), registrosPontos()) 
        : alert("Sem marcação de ponto anterior!")
    }
  }

  onMounted(() => {
    return registrosPontos()
  })

  onUpdated(()=> {
    let horaInicial = document.getElementById("horaInicial").textContent
    let horaFinal = document.getElementById("horaFinal").textContent
    comparaTime.value = CalcTime(horaInicial, horaFinal)
  })
</script>
<template>
  <div class="ponto">
    <div class="ponto__informacoes">
      <Info :dado="today"/>
      <Info :dado="comparaTime ? comparaTime : '00:00:00'"/>
      <Info dado="xx:xx:xx" color="yellow"/>
    </div>
    <div class="ponto__buttons">
      <Button dado="CHEGUEI" @click="cadastrar()"/>
      <Button dado="FUI ALMOÇAR" @click="atualizaPonto('startLunch', 'start')"/>
      <Button dado="VOLTEI" @click="atualizaPonto('endLunch', 'startLunch')"/>
      <Button dado="FUI EMBORA" @click="atualizaPonto('end', 'endLunch')"/>
    </div>
    <div class="ponto__registros">
      <div v-if='listagem'>
        <table id="customers" v-if='listagem.length != 0'>
          <thead>
            <th>Data</th>
            <th>Hora Inicio</th>
            <th>Inicio do Almoço</th>
            <th>Fim do Almoço</th>
            <th>Fim do Expediente</th>
            <th>Tempo</th>
          </thead>
          <tr v-for="item in listagem" :key="item">
            <td>{{ formatar.dataFormatada(item.start)}}</td>
            <td id="horaInicial">{{ formatar.startDay(item.start)}}</td>
            <td>{{ formatar.horarioFormatado(item.startLunch) }}</td>
            <td>{{ formatar.horarioFormatado(item.endLunch) }}</td>
            <td id="horaFinal">{{ formatar.horarioFormatado(item.end) }}</td>
            <td> {{ comparaTime ? comparaTime : '00:00:00' }} </td>
          </tr>
        </table>
        <div class="ponto__mensagem" v-else>
          <p>Sem registros de ponto!</p>
        </div>
      </div>
      <Loader v-else/>
    </div>
  </div>
</template>
<style scoped>
.ponto__informacoes {
  display: flex;
  color: #fff;
  justify-content: center;
  gap: 30px;
  font-size: 22px;
  font-weight: bold;
}

.ponto__buttons {
  display: flex;
  margin-top: 55px;
  justify-content: center;
  gap: 30px;
}

/* table */
#customers {
  border-collapse: collapse;
  width: 100%;
  margin: 30px auto;
}

#customers td, #customers th {
  border: 1px solid var(--color-main);
  padding: 8px;
}

th {
  border: none !important;
  font-size: 15px;
}

td {
  width: calc(100% / 6);
  height: 60px;
  font-weight: bold;
}

#customers tr {
  background-color: #fff;
  text-align: center;
}

#customers tr:nth-child(even) {
  background-color: #f2f2f2;
}

#customers th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: var(--color-main);
  color: var(--color-secundary);
  text-transform: uppercase;
  text-align: center;
}

.ponto__mensagem {
  font-size: 22px;
  font-weight: bold;
  text-align: center;
  color: var(--color-secundary);
}

@media(max-width: 600px) {
  .ponto__buttons {
    display: grid;
    grid-template-columns: 2fr 2fr;
    gap: 10px;
  }

  .ponto__registros {
    overflow-x: scroll;
  }

  th {
    border: none !important;
    font-size: 10px;
  }
}
</style>