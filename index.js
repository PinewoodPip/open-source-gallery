
import { createApp } from 'vue'
import FooterComponent from '/public/components/pageFooter.js'
import CardComponent from '/public/components/card.js'
import repositories from "/src/repositories.json"

const SKILLS = [
  {name: "C/C++", css: "tag-cpp"},
  {name: "C#", css: "tag-csharp"},
  {name: "Lua", css: "tag-lua"},
  {name: "Java & Kotlin", css: "tag-java"},
  {name: "JavaScript", css: "tag-js"},
  {name: "PHP", css: "tag-php"},
  {name: "Rust", css: "tag-rust"},
  {name: "Python", css: "tag-python"},
  {name: "Others", css: "tag-others"},
]

const TOPICS = [
  {name: "Web", longName: "Web Development", css: "tag-web"},
  {name: "Data Science", css: "tag-datascience"},
  {name: "Modding", longName: "Games & Modding", css: "tag-modding"}, // TODO decide a good name for it
  {name: "Machine Learning", longName: "Machine Learning & AI", css: "tag-machinelearning"},
  {name: "App", longName: "Applications", css: "tag-app"},
  {name: "Tool", longName: "Development Tools", css: "tag-tool"},
  {name: "Resource", longName: "Learning Resources", css: "tag-resource"},
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
