// Tests

const sizes = ['XS', 'S', 'M']
const images = ['url1', 'url2', 'url3']

const Jacket = new Clothes(1, 'Jacket', 'Awesome super jacket', 300, 'Adidas', 30, '30.12.2003', [], images, sizes, 'S', 'Leather', 'Black')
const Gloves = new Clothes(2, 'Gloves', 'Amazing super gloves', 100, 'Nike', 42, '12.10.2005', [], images, sizes, 'XL', 'Zamsha', 'Pink')
const Pants = new Clothes(3, 'Pants', 'Cool mega pants', 200, 'Adidas', 24, '14.10.2021', [], images, sizes, 'L', 'Cotton', 'Yellow')

const WashingMachine = new Electronics(1, 'Washing Machine', 'Omega Powerful Washing Machine', 1000, 'Puma', 10, '10.10.2010', [], images, '11.11.2111', '300A')
const Microwave = new Electronics(2, 'Microwave', 'Incredibly Fast Microwave', 500, 'Samsung', 1, '08.08.2008', [], images, '20.20.2020', '100A')

console.log(AbstractProduct.prototype.searchProducts([Jacket, Gloves, Pants], 'super', ['description'])) // Jacket, Gloves
console.log(AbstractProduct.prototype.sortProducts([WashingMachine, Microwave], 'price')) // Microwave, WashingMachine

console.log(WashingMachine.getSet('get', 'description')) // Omega Powerful Washing Machine

Gloves.getSet('set', 'price', 150) // before Gloves.price = 100
console.log(Gloves.getSet('get', 'price')) // 150

// Code

const AbstractProduct = function(ID, name, description, price, brand, quantity, date, reviews, images) {
    this.argObj = {
        ID, name, description, price, brand, quantity, date, reviews, images
    }
    
    if (this.constructor === AbstractProduct) {
        throw new Error('Cannot create an instance of the abstract class')
    }

    this.ID = ID
    this.getID = function() {
        return this.ID
    }
    this.setID = function(value) {
        this.ID = value
    }

    this.name = name
    this.getName = function() {
        return this.name
    }
    this.setName = function(value) {
        this.name = value
    }

    this.description = description
    this.getDescription = function() {
        return this.description
    }
    this.setDescription = function(value) {
        this.description = value
    }

    this.price = price
    this.getPrice = function() {
        return this.price
    }
    this.setPrice = function(value) {
        this.price = value
    }

    this.brand = brand
    this.getBrand = function() {
        return this.brand
    }
    this.setBrand = function(value) {
        this.brand = value
    }

    this.quantity = quantity
    this.getQuantity = function() {
        return this.quantity
    }
    this.setQuantity = function(value) {
        this.quantity = value
    }
    
    this.date = date
    this.getDate = function() {
        return this.date
    }
    this.setDate = function(value) {
        this.date = value
    }

    this.reviews = reviews
    this.getReviews = function() {
        return this.reviews
    }
    this.setReviews = function(value) {
        this.reviews = value
    }
    this.getReviewById = function(idx) {
        return this.reviews[idx]
    }
    this.addReview = function(review) {
        this.reviews.push(review)
    }
    this.deleteReview = function(idx) {
        this.reviews.splice(idx, 1)
    }
    this.getAverageRating = function() {
        let ratingArray = []
        this.reviews.forEach(review => {
            ratingArray.push(review.rating)
        })

        let averageRating = ratingArray.reduce((a, b) => a + b, 0) / ratingArray.length

        return averageRating
    }

    this.images = images
    this.getImages = function() {
        return this.images
    }
    this.setImages = function(value) {
        this.images = value
    }
    this.getImage = function(id) {
        if (id === undefined) return this.images[0]
        else {
            return this.images[id]
        }
    }
}

AbstractProduct.prototype.getSet = function(method, prop, value) {
    switch(method) {
        case 'get':
            return this[prop]
        case 'set':
            this[prop] = value
            break
    }
}

AbstractProduct.prototype.getPriceForQuantity = function(products) {
    let priceStr = ''

    return products.forEach(product => {
        priceStr += '$' + product.price
    })

    return priceStr
}

AbstractProduct.prototype.getFullInformation = function() {
    let fullInfoStr = ''

    for (arg in this.argObj) {
        if (this.argObj[arg]) {
            fullInfoStr += `${arg}: ${this.argObj[arg]}\n`
        }
    }

    return fullInfoStr
}

AbstractProduct.prototype.searchProducts = function(products, search, fields) {
    return products.filter(product => {
        return fields.filter(field => {
            if (product[field].toString().includes(search)) {
                return product
            }
        }).length
    })
}

AbstractProduct.prototype.sortProducts = function(products, sortRule) {
    return products.sort((a, b) => a[sortRule] - b[sortRule])
}

const Clothes = function(ID, name, description, price, brand, quantity, date, reviews, images, sizes, activeSize, material, color) {
    AbstractProduct.call(this, ID, name, description, price, brand, quantity, date, reviews, images)

    this.sizes = sizes // ['XS', 'S', 'M', 'L', 'XL', 'XXL']
    this.getSizes = function() {
        return this.sizes
    }
    this.setSizes = function(value) {
        this.sizes = value
    }
    this.addSize = function(size) {
        this.sizes.push(size)
    }
    this.deleteSize = function(idx) {
        this.sizes.splice(idx, 1)
    }

    this.activeSize = activeSize
    this.getActiveSize = function() {
        return this.activeSize
    }
    this.setActiveSize = function(value) {
        this.activeSize = value
    }

    this.material = material
    this.getMaterial = function() {
        return this.material
    }
    this.setMaterial = function(value) {
        this.material = value
    }

    this.color = color
    this.getColor = function() {
        return this.color
    }
    this.setColor = function(value) {
        this.color = value
    }
}
Clothes.prototype = Object.create(AbstractProduct.prototype)
Clothes.prototype.constructor = Clothes

const Electronics = function(ID, name, description, price, brand, quantity, date, reviews, images, warranty, power) {
    AbstractProduct.call(this, ID, name, description, price, brand, quantity, date, reviews, images)

    this.warranty = warranty
    this.getWarranty = function() {
        return this.warranty
    }
    this.setWarranty = function(value) {
        this.warranty = value
    }
}
Electronics.prototype = Object.create(AbstractProduct.prototype)
Electronics.prototype.constructor = Electronics



