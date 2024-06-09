
import { createApp } from 'vue'
import FooterComponent from './components/pageFooter.js'
import StatContainerComponent from './components/statContainer.js'

const BACKGROUND_COLORS = [
  'rgba(255, 99, 132, 0.2)',
  'rgba(255, 159, 64, 0.2)',
  'rgba(255, 205, 86, 0.2)',
  'rgba(75, 192, 192, 0.2)',
  'rgba(54, 162, 235, 0.2)',
  'rgba(153, 102, 255, 0.2)',
  'rgba(201, 203, 207, 0.2)'
]

const BORDER_COLORS = [
  'rgb(255, 99, 132)',
  'rgb(255, 159, 64)',
  'rgb(255, 205, 86)',
  'rgb(75, 192, 192)',
  'rgb(54, 162, 235)',
  'rgb(153, 102, 255)',
  'rgb(201, 203, 207)'
]

const app = createApp({
  data() {
    return {};
  },
  methods: {
    setupLanguagesChart() {
      let ctx = document.getElementById('languages');
      const labels = ["TypeScript", "JavaScript", "Go", "Python", "Java", "C++", "C#", "Shell", "PHP", "Rust", "C", "Vue", "HTML", "Ruby", "Swift", "Kotlin", "CSS", "SCSS"];
      const data = [232, 173, 94, 90, 70, 42, 40, 28, 27, 24, 21, 19, 13, 11, 9, 8, 6, 4];
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Repositories',
            data: data,
            backgroundColor: BACKGROUND_COLORS,
            borderColor: BORDER_COLORS,
            borderWidth: 1,
          }]
        },
        options: {
          indexAxis: 'y',
          scales: {
            y: {
              beginAtZero: true,
            },
          },
          plugins: {
            title: {
              display: true,
              text: "Most-used languages in the dataset",
            }
          },
        },
      });
    },
    setupTopicsChart() {
      let ctx = document.getElementById('topics');
      const labels = ["hacktoberfest", "javascript", "react", "typescript", "nodejs", "python", "docker", "nextjs", "golang", "go", "minecraft", "git", "java", "vue", "machine-learning", "android", "deep-learning", "github",];
      const data = [216, 200, 180, 139, 110, 93, 88, 86, 83, 80, 79, 79, 79, 72, 64, 62, 54, 53,];
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Repositories',
            data: data,
            backgroundColor: BACKGROUND_COLORS,
            borderColor: BORDER_COLORS,
            borderWidth: 1,
          }]
        },
        options: {
          indexAxis: 'y',
          scales: {
            y: {
              beginAtZero: true,
            },
          },
          plugins: {
            title: {
              display: true,
              text: "Most-used topics/tags in the dataset",
            }
          },
        },
      });
    },
  },
  components: {
    "statcontainer": StatContainerComponent,
    "pagefooter": FooterComponent,
  },
  mounted() {
    this.setupLanguagesChart();
    this.setupTopicsChart();
  }
});
app.mount("#app");

