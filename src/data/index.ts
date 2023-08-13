import { GitHnbNotification, NotiType, User } from "@/types";
import seedrandom from "seedrandom";

const rng = seedrandom();

const users: User[] = [{
    id: 1,
    name: "coolcorexix",
    avatarUrl: "https://avatars.githubusercontent.com/u/25930830?s=40&v=4",
}, {
    id: 2,
    name: "giautm",
    avatarUrl: "https://avatars.githubusercontent.com/u/12751435?s=40&v=4",
}, {
    id: 3,
    name: "danielmontenegro",
    avatarUrl: "https://avatars.githubusercontent.com/u/669295?s=40&v=4"
}]



function generateRandomNotiType() {
    const types: NotiType[] = [
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
    ]
    const randomIndex = Math.floor(rng() * 100);
    return popularRepos[randomIndex];
}

function generateRandomSubTitleForIssueNoti() {
    const randomIndex = Math.floor(rng() * 100);
    return `ant-design/ant-design #${randomIndex}`;
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


export function generateRandomIssueNoti(): GitHnbNotification {
    return {
        id: rng(),
        type: generateRandomNotiType(),
        subTitle: generateRandomSubTitleForIssueNoti(),
        title: generateRandomIssueTitle(),
        isRead: false,
        notifyingUser: generateRandomUser(),
        descriptionText: generateRandomDescriptionIssue(),
    }
}

export const notifications: GitHnbNotification[] = [
    {
        id: 1,
        type: "closedIssue",
        subTitle: 'ant-design/ant-design #1',
        title: '👋 Nemo #1',
        isRead: false,
        notifyingUser: users[0],
        descriptionText: "@giautm woah, that's p...",
    }
]
