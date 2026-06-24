const express = require("express")
const router = express.Router()
// ------------------------FIRST ROUTE-----------------------------------


// app.get("/api/recipes" ,(req, res,next)=>{
//     try {
//         res.json(recipes)
//     }
//     catch (err) {
//         next(err)
//     }
// })

router.get('/', (req, res, next) => {
    try {
        res.json(recipes)
    }
    catch (err) {
        next(err)
    }
});

// ------------------------SECOND ROUTE-----------------------------------

// app.get('/api/recipes/:foodId', (req, res, next)=>{
//     try {
//     const id = Number(req.params.foodId)
//     let foodRec = null
//     recipes.forEach((food)=>{
//         if (food.id === id) {
//             foodRec = food
//         }
//     })
//     if(!foodRec){
//         // return res.status(404).json({message: "Recipe not found"})
//         throw new Error("didnt work")  // <<<<<<<<<<<<<>>>>>>>>>>>>>>> testing error handling 
//     }
//     res.json(foodRec)
//     }
//     catch (err) {
//         next(err)
//     }
// })

router.get("/:foodId", (req, res, next)=>{
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
});

// ------------------------THIRD ROUTE-----------------------------------


// app.post('/api/recipes', cuisinTitleMidWar ,(req, res, next)=>{
//     try {
//         const {title, cuisine, minutes, servings, vegetarian} = req.body //the pieces the user can manipulate
//         const newRecipe = { //skeleton of how the 'recipe' looks like
//             id : nextId,
//             title : title,
//             cuisine : cuisine,
//             minutes : minutes,
//             servings : servings,
//             vegetarian : vegetarian
//         }

//         nextId++ //we increase this so that the next 'recipe' has the next ID number

//         recipes.push(newRecipe) //putting the new recipe into the array of recipes

//         res.status(201).json({
//             done: "done",
//             newRecipe,
//             recipes
//         })
//     }
//     catch (err) {
//         next(err)
//     }
// })

router.post(("/"), cuisinTitleMidWar, (req, res, next)=>{
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
});

// ------------------------FOURTH ROUTE-----------------------------------

// app.patch('/api/recipes/:foodId', (req, res, next)=>{
//     try {
//         const id = Number(req.params.foodId)
//         const {title, cuisine, minutes, servings, vegetarian} = req.body

//         let foodRec = null
//         recipes.forEach((food)=>{
//             if (food.id === id) {
//                 foodRec = food
//             }
//         })
//         if(!foodRec){
//             return res.status(404).json({message: "Recipe not found"})
//         }


//         recipes = recipes.map((food)=>{
        
//             if(food.id === id){
//                 return {...food, title: title, cuisine: cuisine, minutes: minutes, servings: servings, vegetarian: vegetarian }
//             }

//             return food
//         })

//             res.json({
//                 message : "Recipe Updated",
//                 recipe : foodRec
//             })
//     }
//     catch (err) {
//         next(err)
//     }

// })

router.patch("/:foodId",(req, res, next)=>{
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
});

// ------------------------FIFTH ROUTE-----------------------------------

// app.delete('/api/recipes/:id', (req, res, next)=>{
//     try{
//             const id = Number(req.params.id)
            
//             let foodRec = null
//             recipes.forEach((food)=>{
//                 if (food.id === id) {
//                     foodRec = food
//                 }
//             })
//             if(!foodRec){
//                 return res.status(404).json({message: "Recipe not found"})
//             }



//             recipes = recipes.filter((food)=>{
//                 return food.id !== id;
//             })

//             res.json({
//                 delete: "well done",
//                 recipes
//             })
//     }
//     catch (err) {
//         next(err)
//     }
// })

router.delete("/:id", (req, res, next)=>{
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
});


//Every Router now added

module.exports = router;