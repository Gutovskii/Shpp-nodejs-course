const review1 = new Review(10, 'Billy', '11.11.2011', 'Nice pants', 5)
const review2 = new Review(20, 'Van', '30.12.2003', 'My comrade dont like them( it makes me sad', 4)
const review3 = new Review(30, 'Ricardo', '12.11.2010', 'I ripped my pants', 2)

sizes = ['XS', 'S', 'M']
reviews = [review1, review2, review3]
images = ['url1', 'url2', 'url3']

const product1 = new Product(1, 'Pants', 'Awesome black pants', 300, 'Adidas', sizes, 'S', 300, '30.12.2003', reviews, images)
const product2 = new Product(2, 'Gloves', 'Awesome white gloves', 100, 'Niko Niko', sizes, 'L', 100, '12.12.2012', reviews, images)
const product3 = new Product(3, 'Celebrate Costume', 'Awesome celebrate costume', 3000, 'Puma', sizes, 'M', 100, '12.12.208', reviews, images)
const products = [product1, product2, product3]

function searchProducts(products, search, fields) {
    return products.filter(product => {
        return fields.filter(field => {
            if (product[field].toString().includes(search)) {
                return product
            }
        }).length
    })
}

function sortProducts(products, sortRule) {
    return products.sort((a, b) => a[sortRule] - b[sortRule])
}

function Product(ID, name, description, price, brand, sizes, activeSize, quantity, date, reviews, images) {
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

    this.price = price // float
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

    this.quantity = quantity // integer
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
function Review(ID, author, date, comment, rating) {
    this.ID = ID
    this.author = author
    this.date = date
    this.comment = comment
    this.rating = rating
}
