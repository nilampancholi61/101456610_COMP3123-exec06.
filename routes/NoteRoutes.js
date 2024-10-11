const noteModel = require('../models/Notes.js');
//TODO - Create a new Note
//http://mongoosejs.com/docs/api.html#document_Document-save
app.post('/notes', (req, res) => {
    // Validate request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }
    const note = new noteModel({
        noteTitle: req.body.noteTitle,
        noteDescription: req.body.noteDescription,
        priority: req.body.priority || 'MEDIUM',
        dateAdded: Date.now(),
        dateUpdated: Date.now()
    });

    note.save()
    .then(data => res.status(201).send(data))
    .catch(err => res.status(500).send({
        message: err.message || "An error occurred while creating the note."
    }));
});

//TODO - Retrieve all Notes
//http://mongoosejs.com/docs/api.html#find_find
app.get('/notes', (req, res) => {
  
    if(!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }
    app.get('/notes', (req, res) => {
        noteModel.find()
            .then(notes => {
                res.status(200).send(notes); 
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "An error occurred while retrieving notes."
                });
            });
});

//TODO - Retrieve a single Note with noteId
//http://mongoosejs.com/docs/api.html#findbyid_findById
app.get('/notes/:noteId', (req, res) => {
   
    if(!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }

                res.status(200).send(note); 
            })
            .catch(err => {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: `Note not found with id ${req.params.noteId}`
                    });
                }
                res.status(500).send({
                    message: `Error retrieving note with id ${req.params.noteId}`
                });
            });
    });


//TODO - Update a Note with noteId
//http://mongoosejs.com/docs/api.html#findbyidandupdate_findByIdAndUpdate
app.put('/notes/:noteId', (req, res) => {
    // Validate request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }
    noteModel.findByIdAndUpdate(
        req.params.noteId, // The ID to search for
        {
            noteTitle: req.body.noteTitle, // New title
            noteDescription: req.body.noteDescription, // New description
            priority: req.body.priority || 'MEDIUM', // Optional, defaults to MEDIUM
            dateUpdated: Date.now() // Update the dateUpdated field
        },
        { new: true } // Return the updated note
    )
    .then(note => {
        if (!note) {
            return res.status(404).send({
                message: `Note not found with id ${req.params.noteId}`
            });
        }
        res.status(200).send(note); // Return the updated note
    })
    .catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: `Note not found with id ${req.params.noteId}`
            });
        }
        res.status(500).send({
            message: `Error updating note with id ${req.params.noteId}`
        });
    });
});

//TODO - Delete a Note with noteId
//http://mongoosejs.com/docs/api.html#findbyidandremove_findByIdAndRemove
app.delete('/notes/:noteId', (req, res) => {
    // Validate request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }
    //TODO - Write your code here to delete the note using noteid
});
