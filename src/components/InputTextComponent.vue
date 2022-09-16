<template>
  <div :class="['form-group', className]">
    <label v-if="label != null" class="form-label">{{ label }}</label>
    <input type="text" :placeholder="placeholder" :readonly="readOnly" :value="modelValue" class="form-control" @input="updateValue" >
  </div>
</template>

<script>
export default {
  name: 'InputTextComponent',
  props: {
    label: {
      type: String,
      default: ''
    },
    modelValue: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: 'Placeholder'
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
  data () {
    return {
      model: this.value
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
