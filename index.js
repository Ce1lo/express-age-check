const express = require('express');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware kiểm tra age
const checkAge = (req, res, next) => {
  const { age } = req.query;

  if (age === undefined || age === '') {
    return res.status(400).json({ error: 'age is required' });
  }

  const parsedAge = Number(age);
  if (Number.isNaN(parsedAge)) {
    return res.status(400).json({ error: 'age must be a number' });
  }

  if (parsedAge < 18) {
    return res.status(403).json({ error: 'Truy cap bi tu choi: age phai tu 18 tro len' });
  }

  // ponytail: req.parsedAge gắn số để handler dùng nếu cần, nâng cấp sang schema validator khi mở rộng
  req.parsedAge = parsedAge;
  next();
};

app.get('/api/info', checkAge, (req, res) => {
  const { name } = req.query;
  res.json({
    message: `Hello ${name || 'Guest'}`,
    name: name || null,
    age: req.parsedAge
  });
});

if (require.main === module) {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
