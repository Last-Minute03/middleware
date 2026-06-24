let recipes = [
  { id: 1, title: "Spaghetti Carbonara", cuisine: "Italian", minutes: 25, servings: 4, vegetarian: false },
  { id: 2, title: "Chana Masala", cuisine: "Indian", minutes: 35, servings: 4, vegetarian: true },
  { id: 3, title: "Fish Tacos", cuisine: "Mexican", minutes: 20, servings: 3, vegetarian: false },
  { id: 4, title: "Margherita Pizza", cuisine: "Italian", minutes: 40, servings: 2, vegetarian: true },
  { id: 5, title: "Pad Thai", cuisine: "Thai", minutes: 30, servings: 2, vegetarian: false },
];

let nextId = 6;

const express = require ("express")
const app = express()

app.use(express.json())


function recipeMiddleWare(req, res, next) {
    console.log(req.method);
    console.log(req.originalUrl);
    next();
}

function cuisinTitleMidWar(req, res, next) {
console.log("validate function running")
const {title, cuisine} = req.body  //The values we compare

    if ( !title || !cuisine){  //checks to make sure both values have a value attatched if even 1 doesnt have a value in POST creation then return statement starts
       return res.status(400).json({message: "Didnt work"});
    }
    else{
        next();  //this runs when both title and cuisin have a value
    }
}

app.use(recipeMiddleWare);

app.get("/api/recipes" ,(req, res,next)=>{
    try {
        res.json(recipes)
    }
    catch (err) {
        next(err)
    }
})

app.get('/api/recipes/:foodId', (req, res, next)=>{
    try {
    const id = Number(req.params.foodId)
    let foodRec = null
    recipes.forEach((food)=>{
        if (food.id === id) {
            foodRec = food
        }
    })
    if(!foodRec){
        // return res.status(404).json({message: "Recipe not found"})
        throw new Error("didnt work")  // <<<<<<<<<<<<<>>>>>>>>>>>>>>> testing error handling 
    }
    res.json(foodRec)
    }
    catch (err) {
        next(err)
    }
})

app.post('/api/recipes', cuisinTitleMidWar ,(req, res, next)=>{
    try {
        const {title, cuisine, minutes, servings, vegetarian} = req.body //the pieces the user can manipulate
        const newRecipe = { //skeleton of how the 'recipe' looks like
            id : nextId,
            title : title,
            cuisine : cuisine,
            minutes : minutes,
            servings : servings,
            vegetarian : vegetarian
        }

        nextId++ //we increase this so that the next 'recipe' has the next ID number

        recipes.push(newRecipe) //putting the new recipe into the array of recipes

        res.status(201).json({
            done: "done",
            newRecipe,
            recipes
        })
    }
    catch (err) {
        next(err)
    }
})

app.patch('/api/recipes/:foodId', (req, res, next)=>{
    try {
        const id = Number(req.params.foodId)
        const {title, cuisine, minutes, servings, vegetarian} = req.body

        let foodRec = null
        recipes.forEach((food)=>{
            if (food.id === id) {
                foodRec = food
            }
        })
        if(!foodRec){
            return res.status(404).json({message: "Recipe not found"})
        }


        recipes = recipes.map((food)=>{
        
            if(food.id === id){
                return {...food, title: title, cuisine: cuisine, minutes: minutes, servings: servings, vegetarian: vegetarian }
            }

            return food
        })

            res.json({
                message : "Recipe Updated",
                recipe : foodRec
            })
    }
    catch (err) {
        next(err)
    }

})

app.delete('/api/recipes/:id', (req, res, next)=>{
    try{
            const id = Number(req.params.id)
            
            let foodRec = null
            recipes.forEach((food)=>{
                if (food.id === id) {
                    foodRec = food
                }
            })
            if(!foodRec){
                return res.status(404).json({message: "Recipe not found"})
            }



            recipes = recipes.filter((food)=>{
                return food.id !== id;
            })

            res.json({
                delete: "well done",
                recipes
            })
    }
    catch (err) {
        next(err)
    }
})

function errorMiddleWare(err, req, res, next){
    console.error(err);
    res.sendStatus(500);
}

app.use(errorMiddleWare)

app.listen(8080, () => { console.log("Server running on port 8080")})