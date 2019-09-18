import React, { useEffect, useState } from 'react';
import { getProducts, getCategories, listProducts } from './ApiCore';
import Card from './Card';

const Search = () => {

    const [data, setData] = useState({
        categories: [],
        category: '',
        search: '',
        results: [],
        searched: false
    })

    const { categories, category, search, results, searched } = data

    const loadCategories = () => {
        getCategories()
        .then(data => {
            if(data.error){
                console.log(data.error)
            }else{
                setData({...data, categories: data})
            }
        })
    }

    useEffect(()=> {
        loadCategories();
    }, [])

    const searchData = () => {
        console.log("searchData ::: ", search, category)
        if(search) {
            listProducts({search: search || undefined, category: category})
            .then(response => {
                if (response.error){
                    console.log(response.error)
                }else{
                    setData({
                        ...data,
                        results: response,
                        searched: true
                    })
                }
            })
        }
    }

    const searchSubmit = (e) => {
        //
        e.preventDefault();
        searchData();
    }

    const handleChange = (name) => (event) => {
        //
        setData({...data, [name]: event.target.value, searched: false});
    }

    const searchMessage = (searched, results) => {
        if(searched && results.length > 0){
            return `Found ${results.length} products`
        }

        if(searched && results.length < 1){
            return `No se encontraron productos...`
        }        
    }

    const searchProducts = (results = []) => {
        return (
            <div>
                <h2 className="mt-4 mb-4">{ searchMessage(searched, results) }</h2>
                <div className="row">
                    { results.map((item, index) =>(
                        <Card key={index} product = {item} />
                    ))}
                </div>            
            </div>
        )
    }

    const searchForm = () => {
        return (
            <form onSubmit={ searchSubmit }>
                <span className="input-group-text">
                    <div className="input-group input-group-lg">
                        <div className="input-group-prepend">
                            <select className="btn mr-2" onChange={ handleChange("category") } >
                                <option value="All">Pick Category</option>
                                { categories.map((item, index) =>(
                                    <option key={index} value={ item._id}> {item.name} </option>
                                ))}
                            </select>
                        </div>
                        <input 
                            type="search" 
                            className="form-control" 
                            onChange={ handleChange('search') } 
                            placeholder="Buscar por nombre"
                        />                    
                    </div>
                    <div className="btn input-group-append" style={{ border: 'none' }}>
                        <button className="input-group-text">Buscar</button>
                    </div>
                </span>

            </form>
        )
    }

    return (
        <div>
            <div className="container mb-4">
                { searchForm() }
            </div>
            <div className="container-fluid mb-4">
                { searchProducts(results) }                
            </div>            

        </div>
    );
}

export default Search;
