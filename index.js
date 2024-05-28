
import { createApp } from 'vue'
import FooterComponent from '/public/components/pageFooter.js'
import CardComponent from '/public/components/card.js'
import repositories from "/src/repositories.json"

const SKILLS = [
  {name: "C/C++", css: "tag-cpp", color: [233, 201, 182]},
  {name: "C#", css: "tag-csharp", color: [152, 162, 255]},
  {name: "Lua", css: "tag-lua", color: [159, 255, 255]},
  {name: "Java & Kotlin", css: "tag-java", color: [255, 179, 149]},
  {name: "JavaScript", css: "tag-js", color: [255, 219, 152]},
  {name: "PHP", css: "tag-php", color: [184, 164, 255]},
  {name: "Rust", css: "tag-rust", color: [255, 155, 155]},
  {name: "Python", css: "tag-python", color: [248, 255, 145]},
  {name: "Others", css: "tag-others", color: [192, 192, 192]},
]

const TOPICS = [
  {name: "Web", longName: "Web Development", css: "tag-web", color: [161, 255, 255]},
  {name: "Data Science", css: "tag-datascience", color: [249, 255, 161]},
  {name: "Modding", longName: "Games & Modding", css: "tag-modding", color: [141, 158, 255]}, // TODO decide a good name for it
  {name: "Machine Learning", longName: "Machine Learning & AI", css: "tag-machinelearning", color: [255, 192, 140]},
  {name: "App", longName: "Applications", css: "tag-app", color: [184, 255, 177]},
  {name: "Tool", longName: "Development Tools", css: "tag-tool", color: [255, 188, 191]},
  {name: "Resource", longName: "Learning Resources", css: "tag-resource", color: [178, 255, 191]},
]

let nameToTopic = {}
for (let i in TOPICS) {
  nameToTopic[TOPICS[i].name] = TOPICS[i]
}
let nameToSkill = {}
for (let i in SKILLS) {
  nameToSkill[SKILLS[i].name] = SKILLS[i]
}

const SORTING_MODES = [
  "name",
  "stars",
  "contributors"
]

const app = createApp({
  data() {
    return {
      searchQuery: "",
      skills: SKILLS,
      topics: TOPICS,
      shownSkills: {},
      selectedTopic: "",
      selectedSkill: "",
      sortingModes: SORTING_MODES,
      sortingMode: "stars",
      repositories: repositories,
      showAll: false,
      totalResults: 0,
      MAX_REPOSITORIES: 40,
    };
  },
  methods: {
    selectTopic(topic) {
      this.selectedTopic = topic;
      this.showAll = false; // Limit results when settings change.
    },
    selectSkill(skill) {
      this.selectedSkill = skill;
      this.showAll = false; // Limit results when settings change.
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
      let repos = [];
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
      this.totalResults = repos.length;
      if (!this.showAll) {
        repos = repos.slice(0, this.MAX_REPOSITORIES);
      }
      // Sort the repos based on settings
      switch (this.sortingMode) {
        case "name": {
          repos.sort((a, b) => {
            return a.repo.localeCompare(b.repo)
          })
          break;
        }
        case "stars": {
          repos.sort((a, b) => {
            return b.stars - a.stars
          })
          break;
        }
        case "contributors": {
          repos.sort((a, b) => {
            return b.contributors - a.contributors
          })
          break;
        }
      }
      return repos;
    },
    getTagData(id) {
      return nameToSkill[id] ?? nameToTopic[id]
    },
    getTagClass(tag) {
      let tagData = this.getTagData(tag.id);
      if (!tagData) {
        console.log("No info for tag", tag)
        return {}
      }
      let tagClass = tagData.css;
      return {[tagClass]: true}
    },
    getTagStyle(tag) {
      let tagData = this.getTagData(tag.id);
      if (!tagData) {
        console.log("No info for tag", tag)
        return {}
      }
      return {'background': `rgba(${tagData.color[0]}, ${tagData.color[1]}, ${tagData.color[2]}, var(--tag-opacity))`}
    },
    getRepoHeaderStyle(repo) {
      let tags = this.getTags(repo)
      let color = [0, 0, 0]
      for (let i in tags) {
        let data = this.getTagData(tags[i].id)
        if (data) {
          color = [color[0] + data.color[0], color[1] + data.color[1], color[2] + data.color[2]]
        }
      }
      color = [color[0] / tags.length, color[1] / tags.length, color[2] / tags.length]
      return {'background': `rgba(${color[0]}, ${color[1]}, ${color[2]}, var(--bg-color-opacity))`}
    }
  },
  watch: {
    searchQuery() {
      this.showAll = false; // Limit results when search query changes.
    }
  },
  components: {
    "card": CardComponent,
    "pagefooter": FooterComponent,
  },
  mounted() {
    // Initialize tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl)
    })
  }
});
app.mount("#app");
