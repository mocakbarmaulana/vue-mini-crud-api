<template>
  <section class="bg-white p-4 mt-6 rounded-lg">
    <div class="flex justify-between text-sm mb-6">
      <input type="text" placeholder="Search people" class="px-6 py-2 rounded-full w-[50%] border-2 focus:outline-none focus:border-blue-500" @input="filterPeople">
      <router-link to="/peoples/create" class="p-2 px-4 bg-blue-500 hover:bg-blue-700 rounded text-white"><font-awesome-icon icon="user-plus"/> Add People</router-link>
    </div>
    <table class="table-auto">
      <thead class="bg-[#f3f4fb] rounded-lg">
        <tr>
          <th class="py-3">No.</th>
          <th class="py-3">Nama</th>
          <th class="py-3">NIK</th>
          <th class="py-3">Jenis Kelamin</th>
          <th class="py-3">Provinsi</th>
          <th class="py-3">Aksi</th>
        </tr>
      </thead>
      <tbody >
        <tr v-for="(people, index) in (search !== '' ? filteredPeople : peoples)" :key="people.id">
          <peopleItem :people="people" :index="index" @delete="deletePeople" />
        </tr>
        <tr>
          <td colspan="6" class="text-center py-10" v-if="loading">
            <div class="flex items-center justify-center ">
              <div class="w-16 h-16 border-b-2 border-gray-900 rounded-full animate-spin"></div>
            </div>
          </td>
        </tr>
        <tr>
          <td colspan="6" class="text-center py-4" v-if="error.status">{{ error.message }}</td>
        </tr>
        <tr>
          <td colspan="6" class="text-center py-4" v-if="peoples.length === 0 && search === '' && !error.status && !loading">Tidak ada data</td>
        </tr>
        <tr>
          <td v-if="search !== '' && filteredPeople.length === 0 && !error.status && !loading" colspan="6" class="text-center py-4">Tidak ada data</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
import peopleItem from '@/components/PeopleItem'

export default {
  name: 'PeopleList',
  components: {
    peopleItem
  },

  data () {
    return {
      peoples: [],
      filteredPeople: [],
      search: '',
      loading: false,
      error: {
        status: false,
        message: ''
      }
    }
  },
  methods: {
    filterPeople (e) {
      const value = e.target.value
      this.search = value
      this.filteredPeople = this.peoples.filter(people => {
        return people.nama.toLowerCase().includes(value.toLowerCase()) || people.nik.toLowerCase().includes(value.toLowerCase()) || people.jenis_kelamin.name.toLowerCase().includes(value.toLowerCase()) || people.provinsi.name.toLowerCase().includes(value.toLowerCase())
      })
    },
    async getPeoples () {
      this.loading = true
      try {
        const res = await fetch('https://akbar-fake-server.herokuapp.com/peoples')
        this.loading = false
        return res.json()
      } catch (err) {
        this.error = {
          status: true,
          message: 'Gagal melakukan request ke server'
        }
        this.loading = false
      }
    },
    async deletePeople (e) {
      if (confirm('Are you sure?')) {
        await fetch('https://akbar-fake-server.herokuapp.com/peoples/' + e, {
          method: 'DELETE'
        })
        this.peoples = this.peoples.filter(people => people.id !== e)
      }
    }
  },
  async created () {
    this.peoples = await this.getPeoples()
  }
}
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}
</style>
