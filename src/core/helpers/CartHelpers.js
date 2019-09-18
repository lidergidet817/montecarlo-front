export const addItemLocalStorage = (item, next) => {
    let cart = []
    if(typeof window !== 'undefined'){
        if(localStorage.getItem('cart')){
            cart = JSON.parse(localStorage.getItem('cart'))            
        }else{

        }

        cart.push({
            ...item,
            count: 1
        })

        // evitar que se agregue el mismo producto 2 veces (solo actualizar la cantidad)
        /* 
        Remove duplicates
        Build an Array from new set and turn it back into array using Array.from
        so that later we can re-map it
        new set will only allow unique values in it
        so pass the ids of each object/product
        If the loop tries to add the same value again, it'll get ignored
        ... with the array of ids we got on when first map() was used
        run map() on it again return the actual product from the cart
        */
        cart = Array.from(new Set(
                cart.map((prod) =>(
                    prod._id
                )
        )))
        .map(id =>{
            return cart.find(p => p._id === id)
        });

        localStorage.setItem('cart', JSON.stringify(cart));
        next();
    }
}




// Get items total
export const getTotalItemsLS = () => {
    if(typeof window!== 'undefined'){
        if(localStorage.getItem('cart')){
            return JSON.parse(localStorage.getItem('cart')).length
        }
    }
    return 0;
};


// Get Cart
export const getCartLS = () => {
    if(typeof window!== 'undefined'){
        if(localStorage.getItem('cart')){
            return JSON.parse(localStorage.getItem('cart'));
        }
    }
    return [];
};





export const updateDataItem = (productId, count) => {
    let cart= [];
    if(typeof window !== 'undefined'){
        if(localStorage.getItem('cart')){
            cart = JSON.parse(localStorage.getItem('cart'))
        }
    
        console.log("from helpers: ", cart)
        cart.map((product, index) => {
            if(product._id === productId){
                cart[index].count = count
            }
        })

        localStorage.setItem('cart', JSON.stringify(cart))
    }
}



export const removeDataItem = (productId) => {
    let cart= [];
    if(typeof window !== 'undefined'){
        if(localStorage.getItem('cart')){
            cart = JSON.parse(localStorage.getItem('cart'))
        }
    
        console.log("from helpers: ", cart)
        cart.map((product, index) => {
            if(product._id === productId){
                cart.splice(index, 1);
            }
        })
        localStorage.setItem('cart', JSON.stringify(cart))
    }
    return cart;
}



/*
ELIMINAR/VACIAR EL CARRITO DE COMPRAS
*/
export const emptyCartLS = next => {
    if(typeof window !== "undefined") {
        localStorage.removeItem("cart");
        next();
    }
};