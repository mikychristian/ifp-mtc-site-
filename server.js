const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('accueil', { title: 'IFP-MTC AFES | Formation professionnelle', currentPage: 'accueil' });
});

app.get('/filieres', (req, res) => {
  res.redirect('/#filiere');
});

app.get('/contact', (req, res) => {
  res.render('contact', { title: 'Contact IFP-MTC AFES', currentPage: 'contact' });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
  });
}

module.exports = app;
