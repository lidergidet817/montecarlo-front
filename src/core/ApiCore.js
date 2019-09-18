import {API} from "../config";
import queryString from 'query-string'

export const getProducts = (sortBy) => {
    return fetch(`${API}/products?sortBy=${sortBy}&order=desc&limit=20`, {
        method: "GET"
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err))
}

/*
CATEGORIAS
tipo:  GET
*/
export const getCategories = () => {
    return fetch(`${API}/categories`, {
        method: "GET"
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err))
}


// Filtros ------------------------------------------------
export const getFilteredProducts = (skip, limit, filters = {}) => {
    const dataQuery = {
        limit,
        skip, 
        filters
    }

    return fetch( `${API}/products/by/search` , {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataQuery)
    })
    .then(response => {
        console.log("respuesta:: ");
        console.log(response)
        return response.json();
    })
    .catch(err => {
        console.log(err)
    });
}





// LISTAR PRODUCTOS
export const listProducts = (params) => {
    const query = queryString.stringify(params)
    console.log("params: from apiCore::: ", query)
    return fetch(`${API}/products/search?${query}`, {
        method: "GET"
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err))
}






export const read = (productId) => {
    return fetch(`${API}/product/${productId}`, {
        method: "GET"
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err))
}



/*
PRODUCTOS RELACIONADOS
tipo:  GET
*/
export const getListProductRelated = (productId) => {
    return fetch(`${API}/products/related/${productId}`, {
        method: "GET"
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err))
}




/*
PASARELA DE PAGO, COMUNICACIÓN CON EL BACKEND
tipo:  GET
*/
export const getBrainTreeClientToken = (userId, token) => {
    return fetch(`${API}/braintree/getToken/${userId}`, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err))
}



/*
PASARELA DE PAGO, COMUNICACIÓN CON EL BACKEND II
tipo:  POST
*/
export const processPayment = (userId, token, paymentData) => {
    console.log("from apiCore: ", userId, token, paymentData)
    return fetch(`${API}/braintree/payment/${userId}`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(paymentData)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err))
}



/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////

/*
PASARELA DE PAGO, COMUNICACIÓN CON EL BACKEND II
tipo:  POST
*/
export const createOrderService = (userId, token, createOrderServiceData) => {    
    return fetch(`${API}/order/create/${userId}`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            order: createOrderServiceData
        })
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err))
}