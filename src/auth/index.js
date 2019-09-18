import { API } from '../config';

export const signupUser = userObj => {
    console.log("click en registrar: " + userObj);
    return fetch( API + '/signup', {
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