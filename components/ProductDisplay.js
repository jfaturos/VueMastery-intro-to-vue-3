app.component('product-display', {
    template: `
    <div class="product-display">
    <div class="product-container">
        <div class="product-image">
            <!-- image goes here -->
            <img 
                :class="{ 'out-of-stock-img': !inStock }"
                v-bind:src="image" 
                alt="">
        </div>
        <div class="product-info">
            <h1>{{ title }}</h1>
            <p v-if="onSale">{{ saleMessage }}</p>
            <!-- <p v-if="inStock">In Stock</p> -->
            <!-- <p v-show="inStock">In Stock</p> -->
            <!-- <p v-else>Out of Stock</p> -->
            <p v-if="inventory > 10">In Stock</p>
            <p v-else-if="inventory <= 10 && inventory > 0">Almost sold out!</p>
            <p v-else>Out of Stock</p>
            <!-- <p v-if="onSale">On Sale</p> -->
            <!-- <p v-show="onSale">On Sale</p> -->
            <p>Shipping: {{ shipping }}</p>
           
            <product-details :details="details"></product-details>
            <!-- <ul>
            <li v-for="(size, index) in sizes" :key="index">{{ size }}</li>
        </ul> -->
            <div 
                v-for="(variant, index) in variants" 
                :key="variant.id" 
                @mouseover="updateVariant(index)"
                class="color-circle"
                :style="{ backgroundColor: variant.color }">
                <!-- {{ variant.color }} -->
            </div>
            <!-- <a v-bind:href="url">Made by Vue Mastery</a> -->
            <button 
                class="button" 
                :class="{ disabledButton: !inStock }"
                v-on:click="addToCart"
                :disabled="!inStock">
                Add to Cart
            </button>
            <button class="button" v-on:click="removeFromCart" >Remove Item</button>
            <!-- <button class="button" @click="addToCart">Add to Cart</button> -->
        </div>
    </div>
    <review-list v-if="reviews.length" :reviews="reviews"></review-list>
    <review-form @review-submitted="addReview"></review-form>
</div>
    `,
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    data() {
        return {
            product: 'Socks',
            brand: 'Vue Mastery',
            selectedVariant: 0,
            url: 'https://vuemastery.com',
            inventory: 100,
            onSale: true,
            details: ['50% cotton', '30% wool', '20% polyester'],
            variants: [{
                    id: 2234,
                    color: 'green',
                    image: './assets/images/socks_green.jpg', 
                    quantity: 50
                },
                {
                    id: 2235,
                    color: 'blue',
                    image: './assets/images/socks_blue.jpg',
                    quantity: 0
                }
            ],
            sizes: ['S', 'M', 'L', 'XL'],
            reviews: []
        }
    },
    methods: {
        addToCart() {
            // this.cart += 1
            this.$emit('add-to-cart', this.variants[this.selectedVariant].id);
        },
        updateVariant(index) {
            this.selectedVariant = index
        },
        removeFromCart() {
            this.$emit('remove-from-cart', this.variants[this.selectedVariant].id);
        },
        addReview(review) {
            this.reviews.push(review);
        }
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product 
        },
        image() {
            return this.variants[this.selectedVariant].image;
        },
        inStock() {
            return this.variants[this.selectedVariant].quantity;
        },
        saleMessage() {
            if (this.onSale) {
                return this.brand + ' ' + this.product + ' is on sale.'
            }
            return '';
        },
        shipping() {
            if (this.premium) {
                return 'Free'
            } else {
                return 2.99
            }
        }
    }
})