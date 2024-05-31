import ColorThief from 'ColorThief'

export default {
  data() {
    return {
      dominantColor: [255, 255, 255], // Header background; see mounted()
    };
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
  computed: {
    headerStyle() {
      // See mounted()
      return {'background': `rgba(${this.dominantColor[0]}, ${this.dominantColor[1]}, ${this.dominantColor[2]}, var(--bg-color-opacity))`}
    },
  },
  mounted() {
    // Fetch dominant color of the image to use as the header background;
    // makes the cards much more attractive.
    const colorThief = new ColorThief()
    try {
      let img = this.$refs.img
      if (img.complete) {
        const dominantColor = colorThief.getColor(img)
        this.dominantColor = dominantColor;
      } else {
        // Wait for the image to load first.
        img.addEventListener('load', function() {
          const dominantColor = colorThief.getColor(img)
          this.dominantColor = dominantColor;
        }.bind(this));
      }
    } catch {}
  },
  props: ["repo"],
  template: "#card",
}