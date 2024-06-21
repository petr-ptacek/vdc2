export default {
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    errors: {
      type: Array,
      required: false
    }
  },
  emits: ['update:modelValue']
}
