<template>
  <div class="form-group">
    <label class="form-label">{{ label }}</label>
    <input
      type="text"
      :placeholder="placeholder"
      :value="modelValue"
      :readonly="readOnly"
      oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1')"
      class="form-control"
      @input="updateValue"
    >
  </div>
</template>

<script>
export default {
  name: 'InputTextTrueNumber',
  props: {
    label: {
      type: String,
      default: 'Label'
    },
    modelValue: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    readOnly: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    updateValue (value) {
      this.$emit('update:modelValue', value.target.value)
    }
  }
}
</script>

<style scoped>

</style>
