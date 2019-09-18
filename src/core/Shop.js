import React, {useState, useEffect} from 'react';
import Layout from './Layout';
import { getProducts, getCategories, getFilteredProducts} from "./ApiCore"
import Card from './Card';
import CheckBoxList from './CheckBoxList';
import RadioBoxList from './RadioBoxList';
import { pricesServices } from './FixedPrices';

const Shop = () => {


    const [myFilters, setMyFilters] = useState({
        filters: {
            category: [], price: []
        }
    })

    // ESTADOS
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(false);
    // filters state
    const [limit, setLimit] = useState(6);
    const [skip, setSkip] = useState(0);
    const [sizeItems, setSizeItems] = useState(0);
    const [filterResult, setFilterResult] = useState([]);

    // load cateogories and set form data
    const init = () => {
        getCategories().then(data => {
            if(data.error){
                setError(data.error)
            } else {
                setCategories(data)              
            }
        });
        console.log("reusltado general ::: ", filterResult)
    };
    
    // cargando por defecto los resultados de los filtros establecidos
    const loadFilteredResult = (newFilters) => {
        console.log("filtros :::::: ", newFilters);
        getFilteredProducts(skip, limit, newFilters).then(data => {
            if(data.error) {
                setError(data.error)
            }else{
                setFilterResult(data.data)
                setSizeItems(data.size);
                setSkip(0);
            }
        })
    }

    const loadMoreResult = (newFilters) => {
        let toSkip = skip + limit;        
        getFilteredProducts(toSkip, limit, newFilters.filters).then(data => {
            if(data.error) {
                setError(data.error)
            }else{
                setFilterResult([...filterResult, ...data.data])
                setSizeItems(data.size);
                setSkip(toSkip);
            }
        })
    }

    const loadMoreButton = () => {
        return (
            sizeItems > 0 && sizeItems >= limit && (
                <button 
                    className="btn btn-warning mb-5"
                    onClick={ loadMoreResult }                    
                >
                    Cargar más...
                </button>
            )
        );
    }

    useEffect(() => {
        init();
        loadFilteredResult(skip, limit, myFilters.filters);
    }, []);

    //------------------------------------------------------------

    const handleFilters = (filters, filterBy) => {
        console.log("from shop:: ", filters, filterBy);
        const newFilters = {...myFilters};
        newFilters.filters[filterBy] = filters;

        // prices
        if (filterBy == "price") {
            console.log("filter by price")
            let priceValues = handlePrice(filters);
            newFilters.filters[filterBy] = priceValues;
        } else {
            console.log("NO filter by price")
        }

        // llamado a la API para filtrar
        loadFilteredResult(myFilters.filters);

        // pasando el estado:
        setMyFilters(newFilters);        
    }

    const handlePrice = value => {
        const data = pricesServices
        let array = []

        // recorriendo los precios
        for(let key in data) {
            console.log("por cada llave en pricesService: ", key);
            if(data[key]._id === parseInt(value)) {
                array = data[key].array
            }            
        }
        return array
    }

    return (
        <Layout title='Página de compra' description='Buscar y filtrar por categorías' classname='container-fluid'>
            <div className="row">
                <div className="col-3">
                    { /*JSON.stringify(categories)*/ }
                    <h4>Filtrar por categoría</h4>
                    <ul>
                        <CheckBoxList categories={ categories } handleFilters={ filters => handleFilters(filters, "category") } />
                    </ul>                    
                    <h4>Filtrar por Precios</h4>
                    <div>
                        <RadioBoxList prices={ pricesServices } handleFilters={ filters => handleFilters(filters, "price") } />
                    </div>  
                </div>
                <div className="col-9">
                    right sidebar<br></br>
                    <h2 className="mb-4">Products</h2>
                    <div className="row">
                        {/*JSON.stringify(filterResult) */ }

                        { filterResult.map((p,i)=>(
                            <div key={i} className="col-4 mb-3">
                                <Card 
                                    product={p} 
                                    showRemoveProductButton={false}
                                />
                            </div>
                        )) }
                    </div>
                    <hr />
                    { loadMoreButton() }
                </div>                
            </div>
        </Layout>  
    );
}

export default Shop;