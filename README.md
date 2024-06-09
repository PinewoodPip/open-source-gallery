# GitHub Open Source Project Gallery

This is a static site made with Vue that features the results of an [analysis of public GitHub repositories](https://github.com/PinewoodPip/GitHubScraper) done for University of Barcelona's databases subject. It is hosted via GitHub Pages at https://www.pinewood.team/open-source-gallery/.

It features over a thousand *contributable* open-source projects found via web crawling, and allows you to filter them by language & general topic to find interesting ones to contribute to or use.

It seeks to offer an alternative way of exploring open-source projects, as GitHub itself features repositories only based on their star amount, making it at times difficult to find projects open to contributions.

The [statistics page](https://www.pinewood.team/open-source-gallery/statistics) also offers insights on the most used languages and topics, as well as an analysis of common writing styles for commit messages.

## Building

- `npm run dev` for development
- `npm run build` for deployment

Deployment is done via GitHub Actions, using the action from [here](https://dev.to/daslaw/deploying-a-vite-app-to-github-pages-using-github-actions-a-step-by-step-guide-2p4h).
