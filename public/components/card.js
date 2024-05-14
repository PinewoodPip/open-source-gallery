
export default {
  data() {
    return {};
  },
  methods: {
    getRepositoryIcon() {
      return this.repo.icon ?? ""
    }
  },
  props: ["repo"],
  template: "#card",
}