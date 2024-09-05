<script setup lang="ts">
import { doGet, doPut, doDelete, doPost } from '@/services/api';
import type { MentorType } from '@/types/Mentor';
import { onMounted, ref } from 'vue';

const mentors = ref<MentorType[]>([]);
const currentPage = ref(1);
const totalPages = ref(0);

const fetchMentors = async (page = 1) => {
  try {
    const response = await doGet(`all?page=${page}`);
    mentors.value = response.data;
    currentPage.value = response.current_page;
    totalPages.value = response.last_page;
  } catch (error) {
    console.error('Error fetching mentors:', error);
  }
};
onMounted(() => fetchMentors(currentPage.value));

const showModal = ref(false);
const searchTerm = ref('');
const mentor = ref({ name: '', cpf: '', email: '' });

const openModal = () => {
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const submitForm = async () => {
  try {
    await doPost('mentors', mentor.value);
    mentor.value = { name: '', cpf: '', email: '' };
    closeModal();
    window.location.reload();
  } catch (error) {
    console.error('Error submitting form:', error);
  }
};

const removeMentor = async (id: number | string) => {
  try {
    const mentorId: number = typeof id === 'string' ? Number(id) : id;
    await doDelete('mentors', mentorId);
    mentors.value = mentors.value.filter(mentor => mentor.id !== String(mentorId));
    window.location.reload();
  } catch (error) {
    console.error('Error removing mentor:', error);
  }
};

const editMode = ref(false);
const editedMentor = ref({ id: '', name: '', cpf: '', email: '' });

const openEditModal = (mentor: any) => {
  editedMentor.value = { ...mentor };
  editMode.value = true;
};

const closeEditModal = () => {
  editMode.value = false;
};

const updateMentor = async () => {
  try {
    await doPut('mentors', editedMentor.value.id, editedMentor.value);
    const index = mentors.value.findIndex(m => m.id === editedMentor.value.id);
    if (index !== -1) {
      mentors.value[index] = { ...editedMentor.value };
    }
    closeEditModal();
  } catch (error) {
    console.error('Error updating mentor:', error);
  }
};

const searchMentors = async () => {
  try {
    const query = searchTerm.value.trim();
    if (query) {
      const data = await doGet(`mentors/search?query=${encodeURIComponent(query)}`);
      mentors.value = data;
    } else {
      await fetchMentors();
    }
  } catch (error) {
    console.error('Error searching mentors:', error);
  }
};
</script>

<template>
  <div class="page-style">
    <div class="container-home">
      <div class="header">
        <h2 class="title">List of Mentors</h2>
        <div class="actions">
          <input type="text" v-model="searchTerm" placeholder="Search for name, email or cpf" />
          <button class="btn-search" @click="searchMentors">Search</button>
          <button class="btn-register" @click="openModal">Register Mentor</button>
        </div>
      </div>

      <table>
        <thead>
          <tr class="header2">
            <th class="text-middle">Name</th>
            <th class="text-middle">CPF</th>
            <th class="text-middle">Email</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="mentor in mentors" :key="mentor.id">
            <td>{{ mentor.name }}</td>
            <td>{{ mentor.cpf }}</td>
            <td>{{ mentor.email }}</td>
            <td>
              <button class="btn-edit" @click="openEditModal(mentor)">Edit</button>
              <button class="btn-remove" @click="removeMentor(mentor.id)">Remove</button>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="pagination">
      <button class="btn-pagination" :disabled="currentPage === 1" @click="fetchMentors(currentPage - 1)">❮ Previous</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button class="btn-pagination" :disabled="currentPage === totalPages" @click="fetchMentors(currentPage + 1)">Next ❯</button>
    </div>
    </div>
    </div>
    <div v-if="editMode" class="modal">
      <div class="modal-content">
        <h3>Edit Mentor</h3>
        <form @submit.prevent="updateMentor">
          <label for="name">Name:</label>
          <input v-model="editedMentor.name" type="text" id="name" required />

          <label for="cpf">CPF:</label>
          <input v-model="editedMentor.cpf" type="text" id="cpf" required />

          <label for="email">Email:</label>
          <input v-model="editedMentor.email" type="email" id="email" required />

          <button type="submit">Save</button>
          <button type="button" @click="closeEditModal">Cancel</button>
        </form>
      </div>
    </div>
    <div v-if="showModal" class="modal-overlay">
      <div class="modal-content">
        <h2>Cadastrar Mentor</h2>
        <form @submit.prevent="submitForm">
          <label>
            Nome:
            <input v-model="mentor.name" type="text" required />
          </label>
          <label>
            CPF:
            <input v-model="mentor.cpf" type="text" required />
          </label>
          <label>
            Email:
            <input v-model="mentor.email" type="email" required />
          </label>
          <button type="submit">Enviar</button>
          <button type="button" @click="closeModal">Cancelar</button>
        </form>
      </div>
    </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&display=swap');
table {
  align-items: center;
  border-radius: 8px;
  overflow: hidden;
  text-align: center;
  margin-bottom: 20px;
  display: table;
  table-layout: fixed;
  background-color: white;
  width: 1300px;
  border-collapse: collapse;
}

thead {
  background-color: #fff1f9;
  color: #fe4773;
  font-family: "Roboto Condensed";
}

thead th {
  padding: 10px 20px;
  text-align: center;
  font-size: 20px;
}

tbody {
  display: table-row-group;
  overflow-y: auto;
}

tbody tr {
  display: table-row;
}

tbody td {
  padding: 10px 20px;
  text-align: center;
  box-sizing: border-box;
  font-size: 20px;
  font-family: "Roboto Condensed";
}

tbody tr:nth-child(even) {
  background-color: #f7f7f7;
}

tbody tr:hover {
  background-color: #eaeaea;
}

.btn-edit,
.btn-remove {
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 5px;
}

.btn-edit {
  background-color: #fe4773;
  color: white;
  font-family: "Roboto Condensed";
  height: 35px;
  font-size: 18px;
}
.btn-register,
.btn-search {
  background-color: #fe4773;
  color: white;
  font-family: "Roboto Condensed";
  font-size: 20px;
  border: 1px solid #e34469;
}
.btn-remove {
  background-color: #ff374b;
  color: white;
  font-family: "Roboto Condensed";
  height: 35px;
  font-size: 18px;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
  color: white;
  font-family:  "Roboto Condensed";;
  font-size: 20px;
}

.btn-pagination {
  padding: 5px 10px;
  border: 1px solid #e34469;
  border-radius: 4px;
  background-color: #fe4773;
  cursor: pointer;
  color: white;
  font-family: "Roboto Condensed";
}

button:disabled {
  background-color: #fe4773;
  cursor: not-allowed;
}

/* Estilos Gerais */
.page-style {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('../images/background.jpeg');
  background-size: cover;
}

.modal,
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

form {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 10px;
}

input {
  margin-top: 5px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 10px;
  border: none;
  border-radius: 4px;
  margin-top: 10px;
  cursor: pointer;
}

button[type="submit"] {
  background-color: #28a745;
  color: white;
}

button[type="button"] {
  background-color: #dc3545;
  color: white;
  margin-left: 10px;
}

.container-home {
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: 80%;
  height: 100vh;
}

.header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.actions {
  display: flex;
  gap: 10px;
}

input[type="text"] {
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 5px 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f0f0f0;
  cursor: pointer;
}

.title {
  font-family: "Bebas Neue", sans-serif;
  font-size: 60px;
  color: #fe4773;
  margin-bottom: 70px;
}
</style>
