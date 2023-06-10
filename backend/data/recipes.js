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
        cuisine: "Italian",
        tags: ["chicken", "parmesan", "italian"],
        source: "https://www.allrecipes.com/recipe/223042/chicken-parmesan/",
        author: "60d5f0b4e6c9c9b9b0f3e0b1",
        isGlutenFree: false,
        isVegetarian: false,
        meal: "dinner",
        image: "/images/chicken-parmesan.jpg",
        rating: 0,
        numReviews: 0,
        comments: [],
        timeToMake: 0},
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
            cuisine: "American",
            tags: ["strawberry", "shortcake", "dessert"],
            source: "",
            author: "60d5f0b4e6c9c9b9b0f3e0b1",
            isGlutenFree: false,
            isVegetarian: true,
            meal: "dessert",
            image: "/images/strawberry-shortcake.jpg",
            rating: 0,
            numReviews: 0,
            comments: [],
            timeToMake: 60
        }
]

export default recipes