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
  let comparaAlmoco = ref('')
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
    }, 400);
  }

  function validador(marcacao){ 
    const d = new Date()
    const dia = d.getTime()
    const dataRegistrada = new Date(listagem.value[0][marcacao]).getDate()
    const dataAtual = new Date(dia).getDate()
    return dataRegistrada == dataAtual
  }

  function cadastrar(marcacao) {
    if(listagem.value.length <= 0){  
      registrar.setData()
    }else {
      listagem.value[0].start && validador(marcacao)
        ? alert("Marcação já registrada!") 
        : registrar.setData()
    }
  }

  function atualizaPonto(marcacao, prevMarcacao) { 
    if(listagem.value[0][marcacao]){
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
    let startAlmoco = document.getElementById("startAlmoco").textContent
    let endAlmoco = document.getElementById("endAlmoco").textContent
    comparaTime.value = CalcTime(horaInicial, horaFinal)
    comparaAlmoco.value = CalcTime(startAlmoco, endAlmoco)
    comparaTime.value = CalcTime(comparaTime.value, comparaAlmoco.value)
  })
</script>
<template>
  <div class="ponto">
    <div v-if='listagem'>
      <div class="ponto__informacoes">
        <Info :dado="today"/>
        <Info :dado="comparaTime ? comparaTime : '00:00:00'"/>
        <Info :dado="comparaAlmoco ? comparaAlmoco : '00:00:00'" color="yellow"/>
      </div>
      <div class="ponto__buttons">
        <Button dado="CHEGUEI" @click="cadastrar('start')"/>
        <Button dado="FUI ALMOÇAR" @click="atualizaPonto('startLunch', 'start')"/>
        <Button dado="VOLTEI" @click="atualizaPonto('endLunch', 'startLunch')"/>
        <Button dado="FUI EMBORA" @click="atualizaPonto('end', 'endLunch')"/>
      </div>
      <div class="ponto__registros">
        <div>
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
              <td id="horaInicial">{{ formatar.startDay(item.start) }}</td>
              <td id="startAlmoco">{{ formatar.horarioFormatado(item.startLunch)}}</td>
              <td id="endAlmoco">{{ formatar.horarioFormatado(item.endLunch) }}</td>
              <td id="horaFinal">{{ formatar.horarioFormatado(item.end) }}</td>
              <td> {{ comparaTime ? comparaTime : '00:00:00' }} </td>
            </tr>
          </table>
          <div class="ponto__mensagem" v-else>
            <p>Sem registros de ponto!</p>
          </div>
        </div>
      </div>
    </div>
    <Loader v-else/>
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