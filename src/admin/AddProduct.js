import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { CreateProduct, getCategories } from './ApiAdmin';

const AddProduct = () => {

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

    // load cateogories and set form data
    const init = () => {
        getCategories().then(data => {
            if(data.error){
                setValues({
                    ...values,
                    error: data.error,
                    //successMessage: ''
                })
            } else {
                setValues({
                    ...values,
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
        init();
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
        formData.set('containImage', false)
        setValues({
            ...values,
            error: '',
            //successMessage: '',
            loading: true
        });

        CreateProduct(user._id, token, formData)
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
            <button className="btn btn-outline-primary">Crear producto</button>
       </form>
    )

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '': 'none'}}>
            {error}
        </div>
    )

    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: createdProduct ? '': 'none'}}>
            <h2>{ `${createdProduct} está creado en la plataforma.` }</h2>
        </div>
    )

    const showLoading = () => (
        loading && (
            <div className="alert alert-success">
                <h2>Loading...</h2>
            </div>
        )
    )

    return (
        <Layout 
            title='Tablero principal - Administrador'
            description={`Hola ${user.name}, bienvenido a esta sección | Crear nuevo producto`}
            classname="container"
        >
            <div className="row">
                <div className="col-8 offset-md-2">
                    { showLoading() }
                    { showSuccess() }
                    { showError() }
                    { newPostForm() }                
                    
                </div>                
            </div>
        </Layout>        
    )
}

export default AddProduct;