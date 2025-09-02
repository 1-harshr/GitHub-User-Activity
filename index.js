// capture command line arguments

const axios = require('axios');
const fs = require('fs');


const handleEvent = (event) => {
    switch (event.type) {
        case 'PushEvent':
            console.log("Pushed  "+ event.payload.commits.length + " commits to " + event.repo.name);
            break;
        case 'IssuesEvent':
            console.log("Issue "+   event.payload.issue.title + " in " + event.repo.name);
            break
        case 'CreateEvent':
            console.log("Created "+ event.payload.ref + " in " + event.repo.name);
            break
        case 'DeleteEvent':
            console.log("Deleted "+ event.payload.ref + " in " + event.repo.name);
            break
        case 'PullRequestEvent':
            console.log("Pull Request "+ event.payload.pull_request.title + " in " + event.repo.name);
            break
        case 'ReleaseEvent':
            console.log("Released "+ event.payload.release.name + " in " + event.repo.name  );
            break
        default:
            console.log("Unknown event "+ event.type + " in " + event.repo.name);
            break
    }
}
const getGithubActivity = async (name) => {
    const endpoint = `https://api.github.com/users/${name}/events`;
    try {
        const response = await axios.get(endpoint);
        console.log(response.data);
        if(response.status === 200) {
            response.data.forEach(event => {
                handleEvent(event);
            });
        } else {
            console.log("Error fetching github activity", response.status);
        }
    } catch (error) {
        console.log("Error fetching github activity", error);
    }
    return response.data;
};

const main = () => {
    const name = process.argv[2];
    if (!name) {
        console.log("Please provide a username");
        return;
    }
    getGithubActivity(name);
}

export default main;