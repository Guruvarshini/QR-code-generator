import qr from 'qr-image';
import fs from 'fs';
import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index', { response: null });
});

app.post('/qr', (req, res) => {
    const { url } = req.body;
    const qr_png = qr.imageSync(url, { type: 'png' });
    const fileName = `${url}.png`;
    fs.writeFileSync(`public/${fileName}`, qr_png);

    res.render('index', { response: fileName });
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
