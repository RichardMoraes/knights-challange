<template>
  <v-card
    title="Knights"
    flat
  >
    <template v-slot:text>
      <div class="d-flex flex-column ga-5">
        <v-btn
          class="text-none text-subtitle-1 align-self-start"
          color="success"
          variant="flat"
          size="large"
          @click="fetchKnights()"
          >
          Knights
          </v-btn>
        <v-btn
          class="text-none text-subtitle-1 align-self-start"
          color="success"
          variant="flat"
          size="large"
          @click="fetchKnights(true)"
          >
          Hall of Heroes
        </v-btn>

        <RouterLink :to="{ name: 'createKnight' }" class="align-self-end">
          <v-btn
          class="text-none text-subtitle-1"
          color="success"
          variant="flat"
          size="large"
          >
            Novo Knight
          </v-btn>
        </RouterLink>

        <v-text-field
          v-model="search"
          label="Search"
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          hide-details
          single-line
        ></v-text-field>
      </div>
    </template>

    <v-data-table
      :headers="headers"
      :items="knights"
      :search="search"
    >

    <template v-slot:item.actions="{ item }">
      <v-btn
        class="mx-2"
        icon="mdi-account-eye-outline"
        color="info"
        variant="outlined"
        size="small"
        elevation="2"
        @click="showKnight(item.id)"
      />
      <v-btn
        class="mx-2"
        icon="mdi-human-edit"
        color="warning"
        variant="outlined"
        size="small"
        elevation="2"
        @click="editKnight(item.id)"
      />
      <v-btn
        class="mx-2"
        icon="mdi-skull-outline"
        color="error"
        variant="outlined"
        size="small"
        elevation="2"
        @click="deleteKnight(item.id)"
      />
    </template>

    </v-data-table>
  </v-card>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';

  const knights = ref([]);
  const search = ref('');
  const headers = [
    { key: 'name', title: 'Nome', align: 'start' },
    { key: 'age', title: 'Idade' },
    { key: 'weapons', title: 'Armas' },
    { key: 'keyAttribute', title: 'Atributo' },
    { key: 'attack', title: 'Ataque' },
    { key: 'experience', title: 'Exp' },
    {
      key: 'actions',
      align: 'end',
      sortable: false
    }
  ];

  onMounted(async () => {
    await fetchKnights();
  })

  async function fetchKnights(heroes: boolean = false) {
    try {
      fetch(`http://localhost:3000/knights${heroes ? '?filter=heroes' : ''}`)
        .then(response => {
          return response.json();
        })
        .then(data => {
          alert('Sucesso, adicionando...');
          console.log(data)
          knights.value = data;
        })
        .catch(error => {
          console.error('Erro na requisição:', error);
        });
    } catch (error) {
      console.error(error);
    }
  }

  async function showKnight(id: string) {
    try {
      fetch(`http://localhost:3000/knights/${id}`)
        .then(response => {
          return response.json();
        })
        .then(data => {
          alert(JSON.stringify(data, null));
        })
        .catch(error => {
          console.error('Erro na requisição:', error);
        });
    } catch (error) {
      console.error(error);
    }
  }

  async function editKnight(id: string) {
    alert("Ops! Parece que você tentou convencer um cavaleiro relutante a atualizar seu apelido, mas ele estava determinado a mantê-lo em segredo! 🤭 Enquanto trabalhamos para adicionar essa funcionalidade, por que não deixamos o apelido do cavaleiro permanecer um mistério? 🔒✨æ")
  }

  async function deleteKnight(id: string) {
    try {
      fetch(`http://localhost:3000/knights/${id}`, {
        method: 'DELETE'
      })
        .then(response => {
          return response.json();
        })
        .then(data => {
          alert(data.message);
          knights.value = knights.value.filter((knight: any) => knight.id !== id);
        })
        .catch(error => {
          console.error('Erro na requisição:', error);
        });
    } catch (error) {
      console.error(error);
    }
  }
</script>
