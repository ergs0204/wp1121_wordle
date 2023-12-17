const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;


app.get('/', (req, res) => {
    res.render('Hello World!');
});

app.get('./components/LoginSignup', (req, res) => {
    res.render('LoginSignup');
});

app.get('./components/Statistic', (req, res) => {
    res.render('Statistic', {user: "andy"});
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});