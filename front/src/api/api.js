const express = require('express');

const router = express.Router();

router.get('/posts', async (req, res, next) => {
  try {
    res.header('Content-Type', 'application/json');
    res.sendFile(__dirname + '/mock/post-list.mock.json');
  } catch (e) {
    next(e);
  }
});

router.get('/error', (req, res, next) => {
  try {
    // For generate error:
    const saveData = [][(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)].map(i => {
      console.log(i);
      saveData.push(i);
      if (saveData.length === 10) {
        res.status(200).json({ data: saveData });
      }
    });
    //-------------------
  } catch (e) {
    next(e);
  }
});

module.exports = router;
