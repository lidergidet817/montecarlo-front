import React, {useState, useEffect, Fragment} from 'react';

const RadioBoxList = ({ prices, handleFilters }) => {

    const [value, setValues] = useState(0);

    const handleChange = (event) => {
        // implementation
        handleFilters(event.target.value);
        setValues(event.target.value);
    }

    return prices.map((p, i) => (
        <div key={i} className="list-unstyled">
            <input onChange={ handleChange } value={ `${p._id}` } type="radio" className="mr-2 ml-4" name={p} />
            <label className="form-check-label">{ p.name }</label>
        </div>
    ));
}

export default RadioBoxList;

