const Express = require('express');
const app = Express();

// app.use('/test', (re,res) => {
//     res.send('This is a message from the test endpoint on the server!')
// })

app.listen(3000, () => {
    console.log('[Server]: App is listening on 3000.');
});