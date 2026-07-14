const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use((req, res, next) => {
  // Cache les fichiers statiques pendant 1 an
  if (req.url.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$/i)) {
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
  } else {
    // HTML : ne pas mettre en cache
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  }
  next();
});

app.use(express.static(path.join(__dirname, 'public'), { 
  maxAge: '1y',
  etag: false 
}));

app.get('/', (req, res) => {
  res.render('accueil', { title: 'IFP-MTC AFES | Formation professionnelle', currentPage: 'accueil' });
});

app.get('/filieres', (req, res) => {
  res.redirect('/#filiere');
});

app.get('/contact', (req, res) => {
  res.render('contact', { title: 'Contact IFP-MTC AFES', currentPage: 'contact' });
});

// Health check pour Vercel
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
  });
}

module.exports = app;
