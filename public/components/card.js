
export default {
  methods: {
    getSuffixedValue(value) {
      let str = value
      if (value >= 1000) {
        str = (value / 1000).toFixed(1) + "K"
      }
      return str
    },
    getRepositoryIcon() {
      let icon = this.repo.icon ?? ""
      if (this.repo.icon == "none") {
        icon = ""
      }
      return icon
    },
    updateRepositoryColor() {
      if (this.repo.dominantColor == null) {
        // Fetch dominant color of the image to use as the header background;
        // makes the cards much more attractive.
        const colorThief = new ColorThief()
        try {
          let img = this.$refs.img
          if (img.complete) {
            const dominantColor = colorThief.getColor(img)
            this.repo.dominantColor = dominantColor;
          } else {
            // Wait for the image to load first.
            img.addEventListener('load', function() {
              const dominantColor = colorThief.getColor(img)
              this.repo.dominantColor = dominantColor;
            }.bind(this));
          }
        } catch {}
      }
    },
    initializeTooltips() {
      new bootstrap.Tooltip(this.$refs.starsTooltip);
      new bootstrap.Tooltip(this.$refs.contributorsTooltip);
    }
  },
  computed: {
    headerStyle() {
      // Fetching dominant color requires waiting for the image to load; see updateRepositoryColor()
      return this.repo.dominantColor ? {'background': `rgba(${this.repo.dominantColor[0]}, ${this.repo.dominantColor[1]}, ${this.repo.dominantColor[2]}, var(--bg-color-opacity))`} : {}
    },
  },
  updated() {
    // Needs to also run for component updates, as a component instance might've been
    // reused to display a different repository.
    this.updateRepositoryColor();
  },
  mounted() {
    this.updateRepositoryColor();
    this.initializeTooltips();
  },
  props: ["repo"],
  template: "#card",
}