const express = require(`express`);
const app = express();
const port = 3000;

app.use(express.urlencoded ({extended: true}));
app.set('view engine', `ejs`);

    const workouts = [];

app.get('/', (req, res) => {
    res.render('index', { workouts });
}); 

app.post('/add-workout', (req, res) => {
let { exercise, sets, reps, date } = req.body;
sets = parseInt(sets, 10);
reps = parseInt(reps, 10);

    if ( exercise  && sets && reps ) {
        const parsedDate = new Date(date);
    workouts.push({ exercise, sets: parseInt(sets), reps: parseInt(reps), date: parsedDate });
    }
    res.redirect('/');
});

app.post("/clear-workouts", (req, res) => {
    workouts.length = 0;
    res.redirect('/');
});

app.post("/delete-workout/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (!isNaN(id) && id >= 0 && id < workouts.length) {
    workouts.splice(id, 1);  
  }
  res.redirect("/");
});

app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
});