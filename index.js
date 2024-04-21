
import { createApp } from 'vue'
import FooterComponent from './components/pageFooter.js'
import CardComponent from './components/card.js'

const app = createApp({
  data() {
    return {
      searchQuery: "",
      skills: [
        "C++",
        "Lua",
        "Vue",
      ],
      topics: [
        "Deep Learning",
        "Data Science",
        "UI",
        "Mod",
        "AI",
        "Language",
      ],
      shownSkills: {},
      selectedTopic: "",
      selectedSkill: "",
      repositories: {
        "PinewoodPip/EpipEncounters": {
          owner: "PinewoodPip",
          repo: "EpipEncounters",
          description: "test description",
          languages: ["Lua"],
          topics: ["Mod", "UI"]
        },
        "danny-avila/LibreChat": {
          owner: "danny-avila",
          repo: "LibreChat",
          description: "Self-hostable LLM chat supporting multiple models",
          languages: ["JavaScript"],
          topics: ["AI"],
        },
        "modularml/mojo": {
          owner: "modularml",
          repo: "mojo",
          description: "Superset of Python focusing on performance and AI applications",
          languages: [],
          topics: ["Language", "Data Science", "AI"],
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
      const query = this.searchQuery.toLowerCase();
      for (let id in this.repositories) {
        let repo = this.repositories[id];

        let passesQuery = query == "";
        if (!passesQuery) {
          for (let prop in repo) {
            if (typeof repo[prop] == "string") {
              passesQuery = repo[prop].toLowerCase().includes(query);
              if (passesQuery) {
                break;
              }
            }
          }
        }
        let passesLanguageFilter = this.selectedSkill == "" || repo.languages.includes(this.selectedSkill);
        let passesTopicFilter = this.selectedTopic == "" || repo.topics.includes(this.selectedTopic);

        if (passesQuery && passesLanguageFilter && passesTopicFilter) {
          repos.push(repo);
        }
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
