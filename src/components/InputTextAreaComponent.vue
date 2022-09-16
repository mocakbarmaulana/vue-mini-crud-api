<template>
  <div :class="['form-group', className]">
    <label class="form-label">{{ label }}</label>
    <textarea class="form-control" :placeholder="placeholder" :readonly="readOnly" :value="modelValue" @input="updateValue"></textarea>
  </div>
</template>

<script>
export default {
  name: 'InputTextAreaComponent',
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
    className: {
      type: String,
      default: ''
    },
    readOnly: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    updateValue (event) {
      this.$emit('update:modelValue', event.target.value)
    }
  }
}
</script>

<style scoped>

</style>
