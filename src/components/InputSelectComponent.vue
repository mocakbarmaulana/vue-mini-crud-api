<template>
  <div class="form-group">
    <label class="form-label">{{ label }}</label>
    <select class="form-control" :value="modelValue.id" @change="updateValue" :disabled="readOnly">
      <option value="null">{{ placeholder }}</option>
      <option v-for="(option, index) in options" :key="index" :value="option.id">{{ option.name }}</option>
  </select>
  </div>
</template>

<script>
export default {
  name: 'InputSelectComponent',
  props: {
    label: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      default: () => []
    },
    modelValue: {
      type: Object,
      default: () => {
        return {
          id: 'null',
          name: ''
        }
      }
    },
    placeholder: {
      type: String,
      default: 'Pilih...'
    },
    readOnly: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      value: this.modelValue
    }
  },
  methods: {
    updateValue (e) {
      this.value = {
        id: e.target.value,
        name: e.target.options[e.target.selectedIndex].text
      }
      this.$emit('update:modelValue', this.value)
      this.$emit('select', e.target.value)
    }
  },
  emits: ['select', 'update:modelValue']
}
</script>

<style scoped>

</style>
