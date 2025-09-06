const express = require('express');
const getGithubActivity = require('./githubClient');

const app = express();

const port = 3000;

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

app.get('/', async (req, res) => {
    const name = req.query.name;
    if (!name) {
        res.status(400).json({ error: 'Name is required' });
        return;
    }

    try {
        const activity = await getGithubActivity(name);
        res.json(activity);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to fetch GitHub activity' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});