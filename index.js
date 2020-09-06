const express = require('express')
const app = express()
const port = 4004;
const cors = require('cors');
const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: 'http://localhost:9200' })

app.use(cors());

app.get('/files', async (req, res) => {
  const result = await client.search({
    index: 'files'
  });

  const results = result.body.hits.hits.map(h => {
    const mapped = {
      _id: h._id,
      ...h._source
    };
    
    return mapped;
  });

  res.send({ results });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
