<template>
  <form @submit.prevent="submit" class="pa-4">
    <v-row>
      <v-col cols="12" sm="12" md="6">
        <v-text-field
          label="Nome*"
          v-model="name.value.value"
          :error-messages="name.errorMessage.value"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <v-text-field
          label="Apelido*"
          v-model="nickname.value.value"
          :error-messages="nickname.errorMessage.value"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="2">
        <v-text-field
          label="Nascimento"
          v-model="birthday.value.value"
          :error-messages="birthday.errorMessage.value"
          type="date"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="8">
        <v-select
          label="Armas*"
          v-model="weapons.value.value"
          :error-messages="weapons.errorMessage.value"
          :items="weaponsList"
          item-title="name"
          multiple
          return-object
        >
          <template v-slot:prepend-item>
            <p class="ma-3 text-caption font-italic">
              A primeira arma selecionada será a unica equipada!
            </p>
          </template>
          <template v-slot:item="{ props, item }">
            <v-list-item v-bind="props" :subtitle="`${item.raw.attr} mod: ${item.raw.mod}`"></v-list-item>
          </template>
        </v-select>
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <v-select
          label="Atributo Principal*"
          v-model="keyAttribute.value.value"
          :error-messages="keyAttribute.errorMessage.value"
          :items="attributes"
        >
        </v-select>
      </v-col>
      <v-col cols="12" sm="6" md="2">
        <v-text-field
          label="Strength*"
          v-model="strength.value.value"
          :error-messages="strength.errorMessage.value"
          type="number"
          max="20"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="2">
        <v-text-field
          label="Dexterity*"
          v-model="dexterity.value.value"
          :error-messages="dexterity.errorMessage.value"
          type="number"
          max="20"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="2">
        <v-text-field
          label="Constitution*"
          v-model="constitution.value.value"
          :error-messages="constitution.errorMessage.value"
          type="number"
          max="20"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="2">
        <v-text-field
          label="Intelligence*"
          v-model="intelligence.value.value"
          :error-messages="intelligence.errorMessage.value"
          type="number"
          max="20"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="2">
        <v-text-field
          label="Wisdom*"
          v-model="wisdom.value.value"
          :error-messages="wisdom.errorMessage.value"
          type="number"
          max="20"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="2">
        <v-text-field
          label="Charisma*"
          v-model="charisma.value.value"
          :error-messages="charisma.errorMessage.value"
          type="number"
          max="20"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" class="d-flex justify-end">
        <v-btn
          class="me-4"
          type="submit"
          size="large"
        >
          Enviar
        </v-btn>
        <v-btn
          size="large"
          @click="handleReset"
        >
          Limpar
        </v-btn>
      </v-col>
    </v-row>
  </form>
</template>

<script setup lang="ts">
  import { useField, useForm } from 'vee-validate'
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';

  const router = useRouter();

  const weaponsList = ref([
    { name: 'Espada', mod: 5, attr: 'strength', equipped: false },
    { name: 'Arco', mod: 4, attr: 'dexterity', equipped: false },
    { name: 'Martelo', mod: 6, attr: 'strength', equipped: false },
    { name: 'Varinha Mágica', mod: 7, attr: 'intelligence', equipped: false },
    { name: 'Adaga', mod: 3, attr: 'dexterity', equipped: false },
    { name: 'Cajado', mod: 4, attr: 'wisdom', equipped: false },
    { name: 'Machado', mod: 6, attr: 'strength', equipped: false },
    { name: 'Besta', mod: 5, attr: 'dexterity', equipped: false },
    { name: 'Lança', mod: 4, attr: 'strength', equipped: false },
    { name: 'Foice', mod: 6, attr: 'strength', equipped: false },
    { name: 'Porrete', mod: 5, attr: 'strength', equipped: false },
    { name: 'Arremessável', mod: 4, attr: 'dexterity', equipped: false },
    { name: 'Chicote', mod: 3, attr: 'dexterity', equipped: false },
    { name: 'Nunchaku', mod: 5, attr: 'dexterity', equipped: false },
    { name: 'Tridente', mod: 6, attr: 'strength', equipped: false },
    { name: 'Espadachim', mod: 7, attr: 'dexterity', equipped: false },
    { name: 'Maça', mod: 5, attr: 'strength', equipped: false },
    { name: 'Bastão', mod: 4, attr: 'intelligence', equipped: false },
    { name: 'Espeto', mod: 3, attr: 'strength', equipped: false },
    { name: 'Katana', mod: 6, attr: 'strength', equipped: false },
  ])
  const attributes = ref([
    'strength',
    'dexterity',
    'constitution',
    'intelligence',
    'wisdom',
    'charisma'
  ])

  const { handleSubmit, handleReset } = useForm({
    validationSchema: {
      name (value: string) {
        if (value?.length >= 2 && value?.length <= 50) return true

        return 'O nome deve ter entre 2 e 50 caracteres.'
      },
      nickname (value: string) {
        if (value?.length >= 2 && value?.length <= 20) return true

        return 'O apelido deve ter entre 2 e 20 caracteres.'
      },
      birthday (value: string) {
        if (value) return true

        return 'A data de nascimento não pode estar vazia'
      },
      weapons (value: string) {
        if (value && value.length >= 1) return true

        return 'Pelo menos uma arma deve ser especificada'
      },
      strength (value: string) {
        if (parseInt(value) <= 20) return true

        return 'A força não pode ser maior que 20'
      },
      dexterity (value: string) {
        if (parseInt(value) <= 20) return true

        return 'A destreza não pode ser maior que 20'
      },
      constitution (value: string) {
        if (parseInt(value) <= 20) return true

        return 'A constituição não pode ser maior que 20'
      },
      intelligence (value: string) {
        if (parseInt(value) <= 20) return true

        return 'A inteligência não pode ser maior que 20'
      },
      wisdom (value: string) {
        if (parseInt(value) <= 20) return true

        return 'A sabedoria não pode ser maior que 20'
      },
      charisma (value: string) {
        if (parseInt(value) <= 20) return true

        return 'O carisma não pode ser maior que 20'
      },
      keyAttribute (value: string) {
        if (value) return true

        return 'O atributo chave deve ser específicado'
      },
    },
  })

  const name = useField('name')
  const nickname = useField('nickname')
  const birthday = useField('birthday')
  const weapons = useField('weapons')

  const keyAttribute = useField('keyAttribute')
  const strength = useField('strength')
  const dexterity = useField('dexterity')
  const constitution = useField('constitution')
  const intelligence = useField('intelligence')
  const wisdom = useField('wisdom')
  const charisma = useField('charisma')

  const submit = handleSubmit(values => {
    values.weapons[0].equipped = true

    try {
      fetch(`http://localhost:3000/knights`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: values.name,
          nickname: values.nickname,
          birthday: values.birthday,
          weapons: values.weapons,
          attributes: {
            strength: parseInt(values.strength),
            dexterity: parseInt(values.dexterity),
            constitution: parseInt(values.constitution),
            intelligence: parseInt(values.intelligence),
            wisdom: parseInt(values.wisdom),
            charisma: parseInt(values.charisma)
          },
          keyAttribute: values.keyAttribute
        })
      })
        .then(response => {
          return response.json();
        })
        .then(data => {
          alert('Knight criado com sucesso, redirecionando...');
          router.push({ name: 'listKnights' });
        })
        .catch(error => {
          console.error('Erro na requisição:', error);
        });
    } catch (error) {
      console.error(error);
    }
  })
</script>
