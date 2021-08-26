import React from 'react';
import PropTypes from 'prop-types';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.module.css'

function Burger(props){
    let transformedIngredients = Object.keys(props.ingredients).map(igKey => {
        return [...Array(props.ingredients[igKey])].map((_, i) => { //Iterate each key of the json
            return <BurgerIngredient type={igKey} key={igKey + i} />
        });
    }).reduce((arr, el) => {
        return arr.concat(el);
    }, []);
    if(transformedIngredients.length == 0){
        transformedIngredients = <p>Please add some ingredients</p>
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
}

Burger.propTypes = {
    ingredients: PropTypes.object.isRequired,
}

export default Burger;