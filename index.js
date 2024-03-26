const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Sample data
let data = [];
let teapot = false;
let teapot_blue = false;

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/index.html"));
});

// GET request example
app.get("/api", (req, res) => {
  if (req.query.TEATIME === "TRUE") {
    res.json({
      instructions: "It's teatime? Quick, go to the /kitchen!",
    });
  }
  if ("TEATIME" in req.query) {
    res.json({
      instructions: "Is it time to drink tea?",
    });
  }
  res.json({
    instructions: "Is it TEATIME?",
    hint: "What is a query param?",
  });
});

// GET request example
app.get("/api/kitchen", (req, res) => {
  if (req.query.TEATIME === "TRUE") {
    res.json({
      instructions:
        "Where's the teapot? Can you create a /teapot in the /kitchen?",
      part3: "What HTTP method should you use for creating something?",
    });
  }
  res.json({
    instructions:
      "How do I know you're supposed to be in the kitchen right now?",
  });
});

// GET request example
app.get("/api/kitchen/teapot", (req, res) => {
  if (req.query.TEATIME === "TRUE") {
    if (teapot) {
      res.json({
        instructions: "Yep, there it is, a teapot",
      });
    } else {
      res.json({
        instructions: "Don't you need to CREATE one first?",
      });
    }
  }
  res.json({
    instructions:
      "How do I know you're supposed to be in the kitchen right now?",
  });
});

// POST request example
app.post("/api/kitchen/teapot", (req, res) => {
  if (req.query.TEATIME === "TRUE") {
    console.log(req.body);
    if (JSON.stringify(req.body) === "{}") {
      teapot = true;
      res.json({
        instructions:
          "On second thought, I need the COLOR of the teapot to be BLUE",
        hint: "Sometimes the other tea-maker Jason mixes up his data types.",
      });
    }
    if (JSON.stringify(req.body) === '{"COLOR":"BLUE"}' && teapot) {
      teapot_blue = true;
      res.json({
        instructions:
          "On third thought, teatime is over. I need to get rid of this teapot. Permanently.",
      });
    }
    res.json({
      instructions: "Send me an EMPTY teapot.",
    });
  }
  res.json({
    instructions:
      "How do I know you're supposed to be in the kitchen right now?",
  });
});

// DELETE request example
app.delete("/api/kitchen/teapot", (req, res) => {
  if (req.query.TEATIME === "TRUE") {
    if (teapot && teapot_blue) {
      res.json({
        instructions: "PUT this teapot out of it's misery.",
      });
    }
    res.json({
      instructions: "I can't bear to part with any of my teapots right now.",
    });
  }
  res.json({
    instructions:
      "How do I know you're supposed to be in the kitchen right now?",
  });
});

// PUT request example
app.put("/api/kitchen/teapot", (req, res) => {
  if (req.query.TEATIME === "TRUE") {
    if (teapot && teapot_blue) {
      teapot = false;
      teapot_blue = false;
      res.json({
        instructions: "Tea time is over... Forever... YOU WIN!",
      });
    }
    res.json({
      instructions: "I don't see any teapots worth modifying at the moment.",
    });
  }
  res.json({
    instructions:
      "How do I know you're supposed to be in the kitchen right now?",
  });
});

// // POST request example
// app.post("/api/items", (req, res) => {
//   const newItem = req.body;
//   data.push(newItem);
//   res.status(201).json(newItem);
// });

// // GET request example
// app.get("/api/items", (req, res) => {
//   res.json(data);
// });

// // POST request example
// app.post("/api/items", (req, res) => {
//   const newItem = req.body;
//   data.push(newItem);
//   res.status(201).json(newItem);
// });

// // PUT request example
// app.put("/api/items/:id", (req, res) => {
//   const itemId = req.params.id;
//   const updatedItem = req.body;

//   // Find and update the item with the given ID
//   const index = data.findIndex((item) => item.id === itemId);
//   if (index !== -1) {
//     data[index] = { ...data[index], ...updatedItem };
//     res.json(data[index]);
//   } else {
//     res.status(404).json({ error: "Item not found" });
//   }
// });

// // DELETE request example
// app.delete("/api/items/:id", (req, res) => {
//   const itemId = req.params.id;

//   // Find and remove the item with the given ID
//   const index = data.findIndex((item) => item.id === itemId);
//   if (index !== -1) {
//     const deletedItem = data.splice(index, 1);
//     res.json(deletedItem[0]);
//   } else {
//     res.status(404).json({ error: "Item not found" });
//   }
// });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
