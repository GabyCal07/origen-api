// Levantar el server con nodemon en el index, para asi poder usar la API !

require('./db/mongoose');
const express = require('express');
const app = express();
const port = 3001;
const Dish = require('./model/dishes');

app.use(express.json());

// Read-- Mostrar todos los platos
app.get('/dishes', (req, res) => {
    Dish.find()
        .then((result) => {
            res.send(result)
        })
        .catch(err => res.status(404).send(err));
})

// Create -- Agregar Platos a la DB
app.post('/dish', (req, res) => {
    const dish = new Dish(req.body)
    dish.save()
        .then(() => {
            res.status(201).send(dish);
        })
        .catch((err) => {
            res.status(400).send(err);
        });
});

// Update
app.patch('/dish/:id', (req, res) => {
    const _id = req.params.id;
    Dish.findByIdAndUpdate(_id, req.body, {new: true, runValidators: true})
    .then((result) => {
        if(!result) {
            return res.status(404).send(err);
        }
        res.send(result);
    })
    .catch(err => {
        res.status(404).send(err);
    });
});

// Delete
app.delete('/dish/:id', (req, res) => {
    const _id = req.params.id;
    Dish.findByIdAndDelete(_id)
    // Dish.deleteOne(_id)
    .then((result) => {
        // Si no lo encuentro, mando un 404.
        if (!result) {
            return res.status(404).send("Producto no encontrado");
        }
        console.log(result);
        res.status(200).send("el producto ha sido eliminado");
    })
    .catch((err) => {
        res.status(400).send(err);
    });
});

app.listen(port, () => {
    console.log(`Funcionando en http://localhost:${port}`);
});
