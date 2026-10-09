const key = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${key}`)
  .then(r => r.json())
  .then(data => {
    if (data.error) {
      console.error(data.error);
    } else {
      console.log(data.models.map(m => m.name).join('\n'));
    }
  })
  .catch(console.error);
