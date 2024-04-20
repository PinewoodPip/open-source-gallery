
import { createApp } from 'vue'
import FooterComponent from './components/pageFooter.js'
import CardComponent from './components/card.js'

const app = createApp({
  data() {
    return {
      skills: [
        "C++",
        "Lua",
        "Vue",
      ],
      topics: [
        "Deep learning",
        "Data science",
        "UI",
        "Mod",
      ],
      shownSkills: {},
      selectedTopic: "",
      selectedSkill: "",
      repositories: {
        "PinewoodPip/EpipEncounters": {
          owner: "PinewoodPip",
          repo: "EpipEncounters",
          description: "test desc",
          languages: ["Lua"],
          topics: ["Mod", "UI"]
        },
      },
    };
  },
  methods: {
    selectTopic(topic) {
      this.selectedTopic = topic;
    },
    selectSkill(skill) {
      this.selectedSkill = skill;
    },
    getTags(repo) {
      const tags = [];
      for (let index in repo.languages) {
        tags.push({"type": "language", "id": repo.languages[index]});
      }
      for (let index in repo.topics) {
        tags.push({"type": "topic", "id": repo.topics[index]});
      }
      return tags;
    },
    getRepositories() {
      const repos = [];
      for (let id in this.repositories) {
        repos.push(this.repositories[id]);
      }
      return repos;
    }
  },
  components: {
    "card": CardComponent,
    "pagefooter": FooterComponent,
  },
});
app.mount("#app");
