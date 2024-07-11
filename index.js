const express = require('express')
const cors = require('cors')
const app = express()

const bodyParser = require('body-parser');

app.use(express.json())
app.use(cors())
 
let persons = [
    {
      name: "Arto Hellas",
      num: "040-123456",
      id: "1"
    },
    {
      name: "Ada Lovelace",
      num: "39-44-5323523",
      id: "2"
    },
    {
      name: "Dan Abramov",
      num: "12-43-234345",
      id: "3"
    },
    {
      name: "Mary Poppendieck",
      num: "39-23-6423122",
      id: "4"
    },
    {
      id: "6",
      name: "Piero Angela",
      num: "555-3748837"
    },
    {
      id: "7",
      name: "Giorgio Armani",
      num: "398-838739"
    },
    {
      id: "8",
      name: "Francesco Facchinetti",
      num: "393-2949829"
    },
    {
      id: "9",
      name: "Guglielmo Romano",
      num: "99-3838833"
    },
    {
      id: "10",
      name: "Francesco Rossi",
      num: "787-3838383"
    }
  ]

let notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
]

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(person => person.id === id)
    if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(person => person.id !== id);

  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const body = request.body;

  if (!body.name) {
    return response.status(400).json({ 
      error: 'name missing' 
    });
  }

  if (!body.num) {
    return response.status(400).json({ 
      error: 'number missing' 
    });
  }

  if(persons.find(person => person.name === body.name)){
    return response.status(400).json({ 
      error: 'name must be unique' 
    });
  }

  const person = {
    name: body.name,
    num: body.num,
    id: generateId(),
  };

  persons = persons.concat(person);

  response.json(persons);


})

app.get('/api/notes/', (request, response) => {
  response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
  const id = request.params.id
  const note = notes.find(note => note.id === id)
  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }

})

app.delete('/api/notes/:id', (request, response) => {
  const id = request.params.id
  notes = notes.filter(note => note.id !== id)

  response.status(204).end()
})

app.post('/api/notes', (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  const note = {
    content: body.content,
    important: Boolean(body.important) || false,
    id: generateId(),
  }

  notes = notes.concat(note)

  response.json(note)
})

app.get('/api/info', (request, response) => {

  const lenght = persons.length;

  const showTime = Date.now()
 

  var output = "Phonebook has info for "+ lenght +" people";
  output += "<br />";
  output += showTime;
  response.send(output);
})

const generateId = () => {
  const maxId = notes.length > 0
    ? Math.max(...persons.map(n => Number(n.id)))
    : 0
  return String(maxId + 1)
}

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})