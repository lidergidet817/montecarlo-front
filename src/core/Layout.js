import React from 'react';
import Menu from './Menu';
import '../css/styles.css';

const Layout = ({ 
                    title = 'Montecarlo App',
                    description = 'Método de montecarlo para descifrar resultados de la ruleta electrónica',
                    classname,
                    children
                }) => {
    return (
        <div>
            <Menu />
            <div className="jumbotron">
                <h2>{ title }</h2>
                <p className="lead">{ description }</p>
            </div>
            <div className={ classname }>
                { children }
            </div>        
        </div>
    );
}

export default Layout;
