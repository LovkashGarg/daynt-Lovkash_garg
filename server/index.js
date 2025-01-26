const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());


let data = [
  { id: 1, name: 'Alice', dob: '1995-05-15' },
  { id: 2, name: 'Bob', dob: '1990-07-20' },
  { id: 3, name: 'Charlie', dob: '1985-03-10' },
  { id: 4, name: 'Diana', dob: '2000-11-25' },
  { id: 5, name: 'Eve', dob: '1998-01-30' },
  { id: 6, name: 'Frank', dob: '1989-12-05' },
  { id: 7, name: 'Grace', dob: '1992-04-18' },
  { id: 8, name: 'Henry', dob: '1996-06-12' },
  { id: 9, name: 'Ivy', dob: '2001-09-03' },
  { id: 10, name: 'Jack', dob: '1994-02-20' },
  { id: 11, name: 'Karen', dob: '1993-08-17' },
  { id: 12, name: 'Leo', dob: '1991-10-21' },
  { id: 13, name: 'Mona', dob: '1997-05-09' },
  { id: 14, name: 'Nathan', dob: '1988-03-30' },
  { id: 15, name: 'Olivia', dob: '1999-07-01' },
  { id: 16, name: 'Paul', dob: '1990-09-11' },
  { id: 17, name: 'Quincy', dob: '1987-12-22' },
  { id: 18, name: 'Rita', dob: '2003-04-25' },
  { id: 19, name: 'Steve', dob: '2002-02-15' },
  { id: 20, name: 'Tina', dob: '1986-11-05' },
];

// to get all items
app.get('/items', (req, res) => {
  res.json(data);
});

app.get('/',(req,res)=>{
    res.send("I am live");
})
// for adding  a new item
app.post('/items', (req, res) => {
  const { name, dob } = req.body;
  if (!name || !dob) {
    return res.status(400).json({ message: 'Name and Date of Birth are required.' });
  }
  const newItem = { id: data.length + 1, name, dob };
  data.push(newItem);
  res.status(201).json(newItem);
});

// to update an item
app.put('/items/:id', (req, res) => {
  const { id } = req.params;
  const { name, dob } = req.body;
  const itemIndex = data.findIndex((item) => item.id === parseInt(id));

  if (itemIndex === -1) {
    return res.status(404).json({ message: 'Item not found.' });
  }
  if (!name || !dob) {
    return res.status(400).json({ message: 'Name and Date of Birth are required.' });
  }

  data[itemIndex] = { id: parseInt(id), name, dob };
  res.json(data[itemIndex]);
});

// to delete an item
app.delete('/items/:id', (req, res) => {
  const { id } = req.params;
  const itemIndex = data.findIndex((item) => item.id === parseInt(id));

  if (itemIndex === -1) {
    return res.status(404).json({ message: 'Item not found.' });
  }

  const deletedItem = data.splice(itemIndex, 1);
  res.json(deletedItem[0]);
});


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
