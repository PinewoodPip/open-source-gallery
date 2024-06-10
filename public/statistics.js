
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

const CHART_DATA = {
  WORDS: {
    LABELS: ['update', 'fix', 'add', 'readme', 'md', 'chore', 'doc', 'version', 'remove', 'test', 'feat', 'use', 'release', 'support', 'file', 'build', 'bump', 'change', 'ci', 'error', 'link', 'issue', 'new', 'code', 'type', 'refactor', 'example', 'package', 'create', 'improve'],
    DATA: [16162, 15861, 12633, 5375, 4639, 4115, 3484, 3205, 3074, 2966, 2959, 2949, 2066, 2042, 1825, 1774, 1752, 1585, 1573, 1443, 1433, 1266, 1266, 1225, 1210, 1164, 1102, 1078, 1035, 1004],
  },
  LEXICAL: {
    LABELS: ['Noun, singular or mass', 'Proper noun, singular', 'Adjective', 'Cardinal number', ')', '(', 'Noun, plural', 'Preposition or subordinating conjunction', ':', '#', 'Verb, base form', 'to', 'Determiner', 'Verb, gerund or present participle', '``', 'Adverb', 'Verb, non-3rd person singular present', '.', 'Coordinating conjunction'],
    DATA: [23.003730453633434, 14.11611724702059, 7.674390454146966, 5.900866037465933, 5.29471317323317, 5.293062530032536, 5.0790291283503475, 4.985676085114499, 4.632255035378786, 4.528264513738853, 2.838922900290146, 2.100351770406535, 1.5646263494008166, 1.5191419589833504, 1.3401388741146132, 1.2260610884708074, 1.0896079172184094, 1.0525601476041833, 1.02981795239545, 1.0131281155890413, 0.9806654659765756, 0.8588846787298118, 0.8190858371145291, 0.32811118732599465, 0.2987664193147263, 0.1931252544741601, 0.1716668928659201, 0.15699450886028588, 0.14855788805704623, 0.1324182656508486, 0.12379824004753852, 0.11206033284303117, 0.09592071043683355, 0.07629639682929783, 0.07391213442838226, 0.055388249621269085, 0.03191243521225438, 0.026226886410071124, 0.013205145605070774, 0.008069811203098808, 0.005318739202042396, 0.0036680960014085487, 0.0033012864012676936, 0.00018340480007042744],
  },
  VERBS: {
    LABELS: ['Verb, base form', 'Verb, gerund or present participle', 'Verb, non-3rd person singular present', 'Verb, past tense', 'Verb, past participle', 'Verb, 3rd person singular present'],
    DATA: [0.3420244382084539, 0.18302141105243386, 0.1312725103298937, 0.12205846609364297, 0.1181474688998387, 0.1034757054157368],
  },
}

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
    setupWordsChart() {
      let ctx = document.getElementById('words');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: CHART_DATA.WORDS.LABELS,
          datasets: [{
            label: 'Uses',
            data: CHART_DATA.WORDS.DATA,
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
              text: "Most-used words",
            }
          },
        },
      });
    },
    setupLexicalChart() {
      let ctx = document.getElementById('lexical');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: CHART_DATA.LEXICAL.LABELS,
          datasets: [{
            label: 'Percentage',
            data: CHART_DATA.LEXICAL.DATA,
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
              text: "Word Lexical Category Distribution",
            }
          },
        },
      });
    },
    setupVerbsChart() {
      let ctx = document.getElementById('verbs');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: CHART_DATA.VERBS.LABELS,
          datasets: [{
            label: 'Fraction',
            data: CHART_DATA.VERBS.DATA,
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
              text: "Verb Tense Distribution",
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
    this.setupWordsChart();
    this.setupLexicalChart();
    this.setupVerbsChart();
  }
});
app.mount("#app");

