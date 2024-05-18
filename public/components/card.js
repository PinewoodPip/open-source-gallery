
export default {
  data() {
    return {};
  },
  methods: {
    getSuffixedValue(value) {
      let str = value
      if (value >= 1000) {
        str = (value / 1000).toFixed(1) + "K"
      }
      return str
    },
    getRepositoryIcon() {
      return this.repo.icon ?? ""
    },
  },
  props: ["repo"],
  template: "#card",
}