import React, {useState, useEffect} from 'react';

const CheckBoxList = ({ categories, handleFilters }) => {

    const [checked, setChecked] = useState([])

    const handleToggle = c => () => {
        // retorna el primer indice o -1
        const currentCategoryId = checked.indexOf(c);
        const newCheckedCategoryId = [...checked]

        // si el chequeado actual no siempre esta chequeado

        //de lo contrario pull/take off

        if (currentCategoryId === -1){
            newCheckedCategoryId.push(c);
        }else{
            newCheckedCategoryId.splice(currentCategoryId, 1);
        }
        console.log("::: categorias seleccionadas :::", newCheckedCategoryId)
        setChecked(newCheckedCategoryId);
        // accion checked filters
        handleFilters(newCheckedCategoryId);
    }

    return categories.map((c, i) => (
        <li key={i} className="list-unstyled">
            <input onChange={handleToggle(c._id)} value={checked.indexOf(c._id === -1)} type="checkbox" className="form-check-input"/>
            <label className="form-check-label">{ c.name }</label>
        </li>
    ));
}

export default CheckBoxList;
