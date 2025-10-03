// 2. Basic CRUD Operations

// find all books in a specific genre
db.books.find({ genre: "Science Fiction" });

// find books published after a certain year
db.books.find({ published_year: { $gt: 2010 } });

// find books by a specific author
db.books.find({ author: "Isaac Asimov" });

// update price of a specific book
db.books.updateOne(
  { title: "The Great Gatsby" },
  { $set: { price: 20.1 } }
);

// delete a book by title
db.books.deleteOne({ title: "1984" });



// 3. Advanced Queries

// finnd books that are both in stock and publihsed afetr 2010
db.books.find({ in_stock: true, published_year: { $gt: 2010 } });

// use projection to return only the title, author, and price
db.books.find({}, {title: 1, author: 1, price: 1, _id: 0});

//  sort books by price in decending order  and ascending order
db.books.find().sort({ price: -1 });
db.books.find().sort({ price: 1 });

//  limit the number of results to 5
db.books.find().limit(5);


// 4 Aggregation pipeline

//  calculate the average price of books by genre
db.books.aggregate([
  { $group: { _id: "$genre", averagePrice: { $avg: "$price" } } }
]);

//  count the number of books by each author
db.books.aggregate([
  { $group: { _id: "$author", bookCount: { $sum: 1 } } }
]);

// group books by publication decade and counts them
db.books.aggregate([
    { $project: { decade: { $multiply: [{ $floor: { divide: ["$publication_year", 10] } }, 10] } } }, 
    { $group: { _id: "$decade", bookCount: { $sum: 1 } } }
]);

// 5 indexes

// Create an index on the title field for faster searches
db.books.createIndex({ title: 1 });

// Create a compound index on author and published_year
db.books.createIndex({ author: 1, published_year: 1 });

// exaplain() method to analyze query performance
db.books.find({ author: "Isaac Asimov" }).explain("executionStats");

db.books.find({ title: "Dune" }).explain("executionStats");