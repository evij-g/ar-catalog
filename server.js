const app = require('./app')
const { PORT } = process.env;

app.listen(PORT, () => console.log(`Server is running on Port: ${PORT}`));

if (process.env.NODE_ENV === 'production') {
    //*Set static folder up in production
    app.use(express.static('/'));

    app.get('*', (req,res) => res.sendFile(path.resolve(__dirname, 'public')));
  }