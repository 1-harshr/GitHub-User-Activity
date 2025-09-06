const axios = require('axios');
const fs = require('fs');

const getGithubActivity = async (name) => {
    const endpoint = `https://api.github.com/users/${name}/events`;
    const response = await axios.get(endpoint);
    return handleGithubResponse(response);
}

const handleGithubResponse = (response) => {
    fs.writeFileSync('github-activity.json', JSON.stringify(response.data, null, 2));
    return response.data.map(event => {
        console.log(handleEvent(event));
        return handleEvent(event);
    });
}

const handleEvent = (event) => {
    console.log(event);
    switch (event.type) {
        case 'PushEvent':
            return "Pushed  "+ event.payload.commits.length + " commits to " + event.repo.name;
        case 'IssuesEvent':
            return "Issue "+   event.payload.issue.title + " in " + event.repo.name;
        case 'CreateEvent':
            return "Created "+ event.payload.ref + " in " + event.repo.name;
        case 'DeleteEvent':
            return "Deleted "+ event.payload.ref + " in " + event.repo.name;
        case 'PullRequestEvent':
            return "Pull Request "+ event.payload.pull_request.title + " in " + event.repo.name;
        case 'ReleaseEvent':
            return "Released "+ event.payload.release.name + " in " + event.repo.name;
    }
    return "Unknown event "+ event.type + " in " + event.repo.name;
}


module.exports = getGithubActivity;