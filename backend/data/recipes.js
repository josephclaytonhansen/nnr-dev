const recipes = [
    {
        name: "Chicken Parmesan",
        ingredients: [
            {
                name: "chicken breast halves",
                amount: 4,
                unit: "single"
            },
            {
                name: "eggs",
                amount: 2,
                unit: "single"
            }
        ],
        instructions: [
            {
                step: 1,
                name: "Preheat oven to 350 degrees F (175 degrees C).",
                details: "Lightly grease a 9x13 inch baking dish."
            }
        ],
        cuisine: "italian",
        tags: ["chicken", "parmesan", "italian"],
        source: "https://www.allrecipes.com/recipe/223042/chicken-parmesan/",
        author: "60d5f0b4e6c9c9b9b0f3e0b1",
        isGlutenFree: true,
        isVegetarian: false,
        meal: "dinner",
        image: "/images/chicken-parmesan.jpg",
        rating: 0,
        numReviews: 0,
        comments: [],
        timeToMake: 0,
        content: "This is a great recipe that I found in my Grandma's recipe book. Judging from the weathered look of this recipe card, this was a family favorite."},
        {
            name: "Strawberry Shortcake",
            ingredients: [
                {
                    name: "strawberries",
                    amount: 1,
                    unit: "pound"
                },
                {
                    name: "sugar",
                    amount: 1,
                    unit: "cup"
                }
            ],
            instructions: [{
                step: 1,
                name: "Preheat oven to 425 degrees F (220 degrees C).",
                details: "In a large bowl, combine strawberries with 1/2 cup sugar. Cover bowl and set aside to allow strawberries to release their juices."
            }],
            cuisine: "american",
            tags: ["strawberry", "shortcake", "dessert"],
            source: "https://www.recipes.com/recipe/strawberry-shortcake",
            author: "60d5f0b4e6c9c9b9b0f3e0b1",
            isGlutenFree: false,
            isVegetarian: true,
            meal: "dessert",
            image: "/images/strawberry-shortcake.jpg",
            rating: 0,
            numReviews: 0,
            comments: [],
            timeToMake: 60,
            content: "### This is a great old Maine recipe, *moist* and **spicy**. \nThe bread actually tastes even better the day after it is baked. Great for holiday gift giving!"
        },
        {
            name: "Pumpkin Bread",
            ingredients: [
                {
                    name: "eggs",
                    amount: 2,
                    unit: "single"
                },
            ],
            instructions: [],
            cuisine: "american",
            tags: ["pumpkin", "bread"],
            source: "https://www.allrecipes.com/recipe/6820/downeast-maine-pumpkin-bread/",
            author: "60d5f0b4e6c9c9b9b0f3e0b1",
            isGlutenFree: false,
            isVegetarian: true,
            meal: "breakfast",
            image: "/images/pumpkin-bread.jpg",
            rating: 0,
            numReviews: 0,
            comments: [],
            timeToMake: 60,
            content: "This is *pumpkin* bread!"
        },
]

export default recipes