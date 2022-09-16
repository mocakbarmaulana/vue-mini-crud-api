<template>
  <div class="form-group">
    <label class="form-label">{{ label }}</label>
    <input type="file" class="form-control" ref="fileUpload" @change="selectFile" :readonly="readOnly">
    <span class="text-red-500" v-if="error.isError">* {{ error.message }}</span>
    <div class="text-center flex justify-center align-center "  v-if="modelValue">
      <img :src="modelValue" alt="preview-image" class="">
    </div>
  </div>
</template>

<script>
export default {
  name: 'InputFileImageComponent',
  props: {
    label: {
      type: String,
      default: 'Label'
    },
    modelValue: {
      type: String,
      default: ''
    },
    readOnly: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      valueImage: this.modelValue,
      previewImage: null,
      error: {
        isError: false,
        message: ''
      }
    }
  },
  methods: {
    selectFile () {
      const input = this.$refs.fileUpload
      const file = input.files

      this.error = {
        isError: false,
        message: ''
      }

      // check if file size more than 2MB
      if (file[0].size > 2097152) {
        this.error.isError = true
        this.error.message = 'Ukuran gambar tidak boleh lebih dari 2MB'
        return
      }

      // check if file type is image
      if (!file[0].type.match('image.*')) {
        this.error.isError = true
        this.error.message = 'File yang diupload harus berupa gambar'
        return
      }

      if (file && file[0]) {
        const reader = new FileReader()
        reader.onload = (e) => {
          this.valueImage = e.target.result
          // this.previewImage = e.target.result
          this.$emit('update:modelValue', this.valueImage)
        }
        reader.readAsDataURL(file[0])
      }
    }
  }
}
</script>

<style scoped>

</style>
