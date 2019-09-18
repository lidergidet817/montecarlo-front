import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link, Redirect } from 'react-router-dom';
import { getProduct, getCategories, updateProduct } from './ApiAdmin';

const UpdateProduct = (props) => {

    const {user, token } = isAuthenticated()

    // estados
    const [values, setValues] = useState({
        name: '',
        description: '',
        price: '',
        categories: [],
        category: '',
        shipping: '',
        quantity: '',
        photo: '',
        loading: false,
        error: '',
        createdProduct: '',
        redirectToProfile: false,
        formData: '',
        successMessage: ''
    })

    const {
        name,
        description,
        price,
        categories,
        category,
        shipping,
        quantity,
        photo,
        loading,
        error,
        createdProduct,
        successMessage,
        redirectToProfile,
        formData        
    } = values;

    const init = productId => {
        getProduct(productId).then(data => {
            if(data.error){
                console.log(data.error)
                setValues({ ...values, error: data.error})
            }else{
                // populate the state
                setValues({
                    ...values,
                    name: data.name,
                    description: data.description,
                    price: data.price,
                    category: data.category._id,
                    shipping: data.shipping,
                    quantity: data.quantity,
                    formData: new FormData()
                })
                // load categories
                initCategories();
            }
        })
    }

    // load cateogories and set form data
    const initCategories = () => {
        getCategories().then(data => {
            if(data.error){
                setValues({
                    ...values,
                    error: data.error,
                    //successMessage: ''
                })
            } else {
                setValues({
                    categories: data,
                    formData: new FormData()
                })                
            }
        })
    }

    useEffect(() => {
        /*setValues({
            ...values,
            formData: new FormData()
        })*/
        init(props.match.params.productId);
    }, []);    

    const handleChange = name => event => {
        const value = name === 'photo' ? event.target.files[0] : event.target.value;

        // set data en formData
        formData.set(name, value);

        setValues({
            ...values,
            [name]: value
        })
    }

    const clickGuardarProductSubmit = event => {
        // guardar producto
        event.preventDefault();

        // TODO: corregir formData
        formData.set('containImage', false)
        setValues({
            ...values,
            error: '',
            //successMessage: '',
            loading: true
        });

        updateProduct(props.match.params.productId, user._id, token, formData)
        .then(data =>{
            if(data.error){
                setValues({
                    ...values,
                    error: data.error
                })
            } else {
                setValues({
                    ...values,
                    name: '',
                    description: '',
                    photo: '',
                    price: '',
                    quantity: '',
                    loading: false,
                    createdProduct: data.result.name,
                    successMessage: data.result.name,
                    redirectToProfile: true,
                    error: ''
                })
            }
            //console.log("datos guardado: " , data.result.name)
        })
    }

    // Formulario
    const newPostForm = () => (
        <form className="mb-3" onSubmit={ clickGuardarProductSubmit }>
            <h4>Post Photo</h4>
            <div className="form-group">
                <label className="btn btn-secondary">
                    <input type="file" name="photo" accept="image/*" onChange={ handleChange('photo')}/> 
                </label>                
            </div>

            <div className="form-group">
                <label className="text-muted">Nombre</label>
                <input type="text" className="form-control" value={name} onChange={ handleChange('name')}/>
            </div>

            <div className="form-group">
                <label className="text-muted">Descripción</label>
                <textarea className="form-control" value={description} onChange={ handleChange('description')}/>
            </div>

            <div className="form-group">
                <label className="text-muted">Precio</label>
                <input type="number" className="form-control" value={price} onChange={ handleChange('price')}/>
            </div>            

            { /* Categorias*/ }
            <div className="form-group">
                <label className="text-muted">Categoría</label>
                <select
                    className="form-control"
                    onChange={ handleChange('category')}
                >
                    <option>Seleccione una...</option>
                    { categories && 
                        categories.map((cat, index) => (
                            <option key={index} value={cat._id}>{cat.name}</option>
                        ))
                    }
                </select>
            </div>            

            <div className="form-group">
                <label className="text-muted">¿Con envío?</label>
                <select
                    className="form-control"
                    onChange={ handleChange('shipping')}
                >
                    <option>Seleccione una...</option>
                    <option value="0">No</option>
                    <option value="1">Si</option>
                </select>
            </div>

            <div className="form-group">
                <label className="text-muted">Cantidad</label>
                <input type="number" className="form-control" value={quantity} onChange={ handleChange('quantity')}/>
            </div>
            <button className="btn btn-outline-primary">Actualizar producto</button>
       </form>
    )

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '': 'none'}}>
            {error}
        </div>
    )

    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: createdProduct ? '': 'none'}}>
            <h2>{ `${createdProduct} está actualizado en la plataforma.` }</h2>
        </div>
    )

    const showLoading = () => (
        loading && (
            <div className="alert alert-success">
                <h2>Loading...</h2>
            </div>
        )
    )

    const redirectUser = () => {
        if(redirectToProfile){
            if(!error){
                return <Redirect to="/" />
            }
        }        
    }










    { /* ************************************************************************************** */ }
    { /* ************************************************************************************** */ }
    { /* ************************************************************************************** */ }

    return (
        <Layout 
            title='Tablero principal - Administrador'
            description={`Hola ${user.name}, bienvenido a esta sección | Actualizar nuevo producto`}
            classname="container"
        >
            <div className="row">
                <div className="col-8 offset-md-2">
                    { showLoading() }
                    { showSuccess() }
                    { showError() }
                    { newPostForm() }                
                    { redirectUser() }
                </div>                
            </div>
        </Layout>        
    )
}

export default UpdateProduct;