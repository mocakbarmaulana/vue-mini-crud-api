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
          <td colspan="6" class="text-center py-4" v-if="peoples.length === 0 && search === ''">Tidak ada data</td>
        </tr>
        <tr>
          <td v-if="search !== '' && filteredPeople.length === 0" colspan="6" class="text-center py-4">Tidak ada data</td>
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
      search: ''
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
      const res = await fetch('api/peoples')
      return res.json()
    },
    async deletePeople (e) {
      if (confirm('Are you sure?')) {
        await fetch('api/peoples/' + e, {
          method: 'DELETE'
        })
        this.peoples = this.peoples.filter(people => people.id !== e)
      }
    }
  },
  async created () {
    this.peoples = []
  }
}
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}
</style>
