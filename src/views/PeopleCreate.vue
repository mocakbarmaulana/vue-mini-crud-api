<template>
  <section class="bg-white p-4 mt-6 rounded-lg">
    <form class="flex justify-between text-sm flex-col lg:flex-row" @submit="submitForm">
      <div class="outer-left w-[100%] lg:w-[48%]">
        <input-text-component label="Nama" placeholder="Masukkan nama" v-model="form.nama" :readOnly="readOnly" />
        <input-text-true-number label="NIK" placeholder="Masukkan NIK" v-model="form.nik" :readOnly="readOnly" />
        <input-text-true-number label="Nomor Kartu Keluarga" placeholder="Masukan nomor kartu keluarga" v-model="form.no_kk" :readOnly="readOnly" />
        <input-file-component label="Foto KTP" v-model="form.foto_ktp" :readOnly="readOnly" />
        <input-file-component label="Foto Kartu Keluarga" v-model="form.foto_kk" :readOnly="readOnly" />
        <input-text-true-number label="Umur" placeholder="Masukan umur" v-model="form.umur" :readOnly="readOnly" />
        <input-select-component label="Jenis Kelamin" :options="genders" v-model="form.jenis_kelamin" :readOnly="readOnly" />
        <input-select-component label="Provinsi" :options="provinces" @select="selectProvince" v-model="form.provinsi" :readOnly="readOnly" />
      </div>
      <div class="outer-right w-[100%] lg:w-[48%]">
        <input-select-component label="Kabupaten / Kota" :options="regencies" @select="selectRegency" v-model="form.kabupaten" :readOnly="readOnly" />
        <input-select-component label="Kecamatan" :options="districts" @select="selectDistrict" v-model="form.kecamatan" :readOnly="readOnly" />
        <input-select-component label="Kelurahan / Desa" :options="villages" @select="selectVillage" v-model="form.kelurahan" :readOnly="readOnly" />
        <div class="double-form-group">
          <input-text-component label="RW" placeholder="Masukkan rw" class-name="mr-5" v-model="form.rw" :readOnly="readOnly" />
          <input-text-component label="RT" placeholder="Masukkan rt" class-name="ml-5" v-model="form.rt" :readOnly="readOnly" />
        </div>
        <input-text-area-component label="Alamat" placeholder="Masukkan alamat" v-model="form.alamat" :readOnly="readOnly" />
        <input-text-true-number label="Penghasilan Sebelum Pandemi" placeholder="Masukkan penghasilan" v-model="form.penghasilan_sebelum_pandemi" :readOnly="readOnly" />
        <input-text-true-number label="Penghasilan Setelah Pandemi" placeholder="Masukkan penghasilan" v-model="form.penghasilan_setelah_pandemi" :readOnly="readOnly" />
        <input-select-component label="Alasan Membutuhkan Bantuan" :options="reasons" @select="selectReason" v-model="form.alasan" :readOnly="readOnly" />
        <input-text-area-component v-if="reason === '4'" :label="null" placeholder="Masukkan Alasan" v-model="form.alasan.name" :readOnly="readOnly" />
        <div class="form-group flex">
          <input type="checkbox" v-model="form.pertanggungjawaban" :disabled="readOnly">
          <span class="ml-3 block">Saya menyatakan bahwa data yang diisikan adalah benar dan siap mempertanggungjawabkan apabila ditemukan ketidaksesuaian dalam data tersebut.</span>
        </div>
        <div class="double-form-group flex-col lg:flex-row">
          <button type="submit" class="btn-save" v-if="!readOnly">Simpan</button>
          <router-link to="/" class="btn-reset text-center" >Cancel</router-link>
        </div>
      </div>
    </form>
  </section>
</template>

<script>
import Swal from 'sweetalert2'
import axios from '../api'
import InputSelectComponent from '@/components/InputSelectComponent'
import InputTextComponent from '@/components/InputTextComponent'
import InputTextTrueNumber from '@/components/InputTextTrueNumber'
import InputFileComponent from '@/components/InputFileImageComponent'
import InputTextAreaComponent from '@/components/InputTextAreaComponent'

export default {
  name: 'PeopleCreate',
  components: { InputTextAreaComponent, InputFileComponent, InputTextTrueNumber, InputTextComponent, InputSelectComponent },
  data () {
    return {
      readOnly: false,
      provinces: [],
      province: null,
      regencies: [],
      regency: null,
      districts: [],
      district: null,
      villages: [],
      genders: [
        { id: 1, name: 'Laki-laki' },
        { id: 2, name: 'Perempuan' }
      ],
      reasons: [
        { id: 1, name: 'Kehilangan pekerjaan' },
        { id: 2, name: 'Kepala keluarga terdampak atau korban Covid-19' },
        { id: 3, name: 'Tergolong fakir/miskin semenjak sebelum Covid-19' },
        { id: 4, name: 'Lainnya' }
      ],
      reason: null,
      form: {
        nama: '',
        nik: '',
        no_kk: '',
        foto_ktp: '',
        foto_kk: '',
        umur: '0',
        jenis_kelamin: {
          id: 'null',
          name: ''
        },
        provinsi: {
          id: 'null',
          name: ''
        },
        kabupaten: {
          id: 'null',
          name: ''
        },
        kecamatan: {
          id: 'null',
          name: ''
        },
        kelurahan: {
          id: 'null',
          name: ''
        },
        rw: '',
        rt: '',
        alamat: '',
        penghasilan_sebelum_pandemi: '0',
        penghasilan_setelah_pandemi: '0',
        alasan: {
          id: 'null',
          name: ''
        },
        pertanggungjawaban: false
      },
      isEdit: false,
      id: null
    }
  },
  methods: {
    selectProvince (e) {
      this.province = e
      this.form.kabupaten = {
        id: 'null',
        name: ''
      }
      this.form.kecamatan = {
        id: 'null',
        name: ''
      }
      this.form.kelurahan = {
        id: 'null',
        name: ''
      }
    },
    selectRegency (e) {
      this.regency = e
    },
    selectDistrict (e) {
      this.district = e
    },
    selectVillage (e) {
      this.village = e
    },
    selectReason (e) {
      this.reason = e
      this.form.alasan.name = this.reasons.find((reason) => reason.id.toLocaleString() === e).name
    },
    async submitForm (e) {
      e.preventDefault()
      try {
        const timeout = Math.floor(Math.random() * 2000) + 1
        if (timeout > 1500) {
          throw new Error('timeout')
        }

        if (this.isEdit) {
          await this.updatePeople(this.form, this.$route.params.id)
        } else {
          await this.createPeople(this.form)
        }
        this.$router.push({ name: 'home' })
      } catch (err) {
        console.log(err)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!'
        })
      }
    },
    async createPeople (data) {
      const response = await fetch('/api/peoples', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      return response.json()
    },
    async updatePeople (data, id) {
      const response = await fetch(`/api/peoples/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      return response.json()
    },
    async getPeople (id) {
      const res = await fetch(`/api/peoples/${id}`)
      return res.json()
    },
    async getProvincies () {
      const { data } = await axios.get('provinces.json')
      return data
    },
    async getRegencies (id) {
      const { data } = await axios.get(`regencies/${id}.json`)
      return data
    },
    async getDistricts (id) {
      const { data } = await axios.get(`districts/${id}.json`)
      return data
    },
    async getVillages (id) {
      const { data } = await axios.get(`villages/${id}.json`)
      return data
    }
  },
  watch: {
    async province (val) {
      if (val) {
        this.regencies = await this.getRegencies(val)
      } else {
        this.regencies = []
      }
    },
    async regency (val) {
      if (val) {
        this.districts = await this.getDistricts(val)
      } else {
        this.districts = []
      }
    },
    async district (val) {
      if (val) {
        this.villages = await this.getVillages(val)
      } else {
        this.villages = []
      }
    },
    async form (val) {
      // check province
      if (val.provinsi.id !== 'null') {
        this.province = val.provinsi.id
      }

      if (val.kabupaten.id !== 'null') {
        this.regency = val.kabupaten.id
      }

      if (val.kecamatan.id !== 'null') {
        this.district = val.kecamatan.id
      }

      if (val.kelurahan.id !== 'null') {
        this.village = val.kelurahan.id
      }
    },
    async id (val) {
      if (val) {
        if (val && !this.isEdit) {
          this.readOnly = true
        }
        this.form = await this.getPeople(this.id)
        console.log('form people', this.form, this.readOnly)
      }
    }
  },
  async created () {
    this.provinces = await this.getProvincies()
    this.isEdit = this.$route.path.includes('edit')
    this.id = this.$route.params.id
  },
  emits: ['select']
}
</script>

<style scoped>
</style>
