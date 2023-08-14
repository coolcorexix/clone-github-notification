const seedrandom = require("seedrandom");

const rng = seedrandom();

const users = [
  {
    id: 1,
    name: "coolcorexix",
    avatarUrl: "https://avatars.githubusercontent.com/u/25930830?s=40&v=4",
  },
  {
    id: 2,
    name: "giautm",
    avatarUrl: "https://avatars.githubusercontent.com/u/12751435?s=40&v=4",
  },
  {
    id: 3,
    name: "danielmontenegro",
    avatarUrl: "https://avatars.githubusercontent.com/u/669295?s=40&v=4",
  },
];

function generateRandomNotiType() {
  const types = [
    "closedIssue",
    "openIssue",
    // "discussion",
    // "pipeline",
    // "warning",
    // "pullRequest",
    // "danger",
  ];
  const randomIndex = Math.floor(rng() * types.length);
  return types[randomIndex];
}

function generateRandomUser() {
  const randomIndex = Math.floor(rng() * users.length);
  return users[randomIndex];
}

function generateRandomRepoName() {
  const popularRepos = [
    "ant-design/ant-design",
    "vuejs/vue",
    "facebook/react",
    "twbs/bootstrap",
    "sindresorhus/awesome",
    "getify/You-Dont-Know-JS",
    "d3/d3",
    "ohmyzsh/ohmyzsh",
    "airbnb/javascript",
    "tensorflow/tensorflow",
    "angular/angular.js",
    "facebook/react-native",
  ];
  const randomIndex = Math.floor(rng() * popularRepos.length);
  return popularRepos[randomIndex];
}

function generateRandomSubTitleForIssueNoti() {
  const randomIndex = Math.floor(rng() * 100);
  return `${generateRandomRepoName()} #${randomIndex}`;
}

function generateRandomIssueTitle() {
  const popularIssueTitles = [
    "👋 Nemo",
    "Dropdown menu in navbar",
    "Build bundler",
    "Add a new feature",
    "Fix a bug",
  ];
  const randomIndex = Math.floor(rng() * popularIssueTitles.length);
  return popularIssueTitles[randomIndex];
}

function generateRandomDescriptionIssue() {
  const popularIssueDescriptions = [
    "@giautm woah, that's pretty cool!",
    "I think this is a bug.",
    "I think this is a feature.",
    "I think this is a question.",
  ];
  const randomIndex = Math.floor(rng() * popularIssueDescriptions.length);
  return popularIssueDescriptions[randomIndex];
}

function generateRandomIssueNoti() {
  return {
    id: rng(),
    type: generateRandomNotiType(),
    subTitle: generateRandomSubTitleForIssueNoti(),
    title: generateRandomIssueTitle(),
    notifyingUser: generateRandomUser(),
    descriptionText: generateRandomDescriptionIssue(),
  };
}

let mockData = [];

for (let i = 0; i < 10000; i++) {
  mockData.push(generateRandomIssueNoti());
}

// add isUnread: true to the first 10 notifications
mockData = mockData.map((noti, index) => {
  if (index < 10) {
    return {
      ...noti,
      isUnread: true,
    };
  }
  return noti;
});

// generate timestamp in descending order for mock data
mockData = mockData.map((noti, index) => {
  return {
    ...noti,
    timestamp: Date.now() - index * 1000 * 60 * 60 * 24,
  };
});

// write to a file called notificationData.json
const fs = require("fs");
fs.writeFileSync(
  "./src/data/notificationData.json",
  JSON.stringify(mockData, null, 2)
);
