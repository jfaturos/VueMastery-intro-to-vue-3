const app = Vue.createApp({
    data() {
        return {
            product: 'Boots',
            image: './assets/images/socks_green.jpg',
            url: 'https://vuemastery.com',
            // inStock: true
            inventory: 100,
            onSale: true
        }
    }
})