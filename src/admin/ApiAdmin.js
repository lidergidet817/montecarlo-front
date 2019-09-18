import { API } from '../config';

export const CreateCategory = (userId, token, category) => {
    return fetch( API + '/category/create/' + userId, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": 'Bearer ' + token
        },
        body: JSON.stringify(category)
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

export const CreateProduct = (userId, token, product) => {
    return fetch( API + '/product/create/' + userId, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            "Authorization": 'Bearer ' + token
        },
        body: product
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



//--------------------------------------------------------------------
export const signinUser = userObj => {
    console.log("click en iniciar sesión: " + userObj);
    return fetch( API + '/signin', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userObj)
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

export const authenticate = (data, next) => {
    if(typeof window != 'undefined') {
        localStorage.setItem('jwt', JSON.stringify(data));
        // devolución de la llamada para redirigir por ej.
        next();
    }
}

export const signOut = (next) => {
    if(typeof window != 'undefined') {
        localStorage.removeItem('jwt');
        // devolución de la llamada para redirigir por ej.
        next();
        return fetch(API + '/signout', {
            method: "GET"
        })
        .then(response => {
            console.log('signout', response);
        })
        .catch(err =>{
            console.log("err: ", err)
        })
    }
}

export const isAuthenticated = () => {
    if (typeof window == 'undefined') {
        return false
    }
    if (localStorage.getItem('jwt')) {
        return JSON.parse(localStorage.getItem('jwt'));
    } else {
        return false
    }    
}


export const getCategories = () => {
    return fetch(`${API}/categories`, {
        method: "GET"
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err))
}



/* ************************************* */
export const getListOrders = (userId, token) => {
    console.log("user Id FROM ApiAdmin: ", userId)
    return fetch(`${API}/order/list/${userId}`, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },        
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err))
}


export const getListStatusValues = (userId, token) => {
    console.log("user Id FROM ApiAdmin: ", userId)
    return fetch(`${API}/order/status-values/${userId}`, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },        
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err))
}



// UPDATE ORDERS
export const updateOrderStatus = (userId, token, orderId, status) => {
    console.log("user Id FROM ApiAdmin: ", userId)
    return fetch(`${API}/order/${orderId}/status/${userId}`, {
        method: "PUT",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({status, orderId})
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err))
}
// -------------------------------------------------------------------


/**
 * To perform crud on Product
 * Get all products
 * get a single product
 * update single product
 * delete single product
 */
export const getProducts = () => {
    return fetch(`${API}/products?limit=50`, {
        method: "GET"
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err))
}

export const deleteProduct = (productId, userId, token) => {
    console.log("user Id FROM ApiAdmin: ", userId)
    return fetch(`${API}/product/${productId}/${userId}`, {
        method: "DELETE",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err))
}

export const getProduct = (productId) => {
    return fetch(`${API}/product/${productId}`, {
        method: "GET"
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err))
}

export const updateProduct = (productId, userId, token, product) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
        method: "PUT",
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: product
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err))
}



