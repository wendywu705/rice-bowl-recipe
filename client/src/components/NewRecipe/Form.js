import React from 'react';
import './Form.css';

function Form() {
    const [state, setState] = React.useState({
        recipeName: "",
        recipeIngredients: "",
        prepTimeHour: 0,
        prepTimeMin: 0,
        cookTimeHour:0,
        cookTimeMin:0,
        servingSize: 0,
        recipeSteps: [],
        recipeURL: "",
        rating: 0,
    })
    function handleChange(event) {
        const value = event.target.value;
        setState({
            ...state,
            [event.target.name]: value
        });
    }
    return (
        <div className="Form">
            <div>
                <h1 className= 'new-recipes-title'>New Recipe:</h1>
                <form>
                    <label>
                        Recipe Name: <br/>
                            <input type="text" name="recipeName" value={state.recipeName} onChange={handleChange} placeholder='Enter Recipe Title'/>
                    </label> <br/>
                    <label className='Ingredients'>
                        Recipe Ingredients: <br/>
                        <textarea name="recipeIngredients" value={state.recipeIngredients} onChange={handleChange}
                                  placeholder='3 cups of carrots &#13;1 cup of water &#13;5 cloves of garlic &#13;etc...'/>
                    </label> <br/>
                    <label className='Time'>
                        Prep Time:
                        <input type="number" name="prepTimeHour" value={state.prepTimeHour} onChange={handleChange} min="0"/>
                    </label> hours
                    <label className='Time'>
                        <input type="number" name="prepTimeMin" value={state.prepTimeMin} onChange={handleChange} min="0"/>
                    </label> minutes <br/>
                    <label className='Time'>
                        Cook Time:
                        <input type="number" name="cookTimeHour" value={state.cookTimeHour} onChange={handleChange} min="0"/>
                    </label> hours
                    <label className='Time'>
                        <input type="number" name="cookTimeMin" value={state.cookTimeMin} onChange={handleChange} min="0"/>
                    </label> minutes <br/>
                    <label className='Serving-Size'>
                        Serving Size:
                        <input type="number" name="servingSize" value={state.servingSize} onChange={handleChange} min="0"/>
                    </label>
                    <label className='Rating'>
                        Rating:
                        <input type="number" name="rating" value={state.rating} onChange={handleChange} min="0" max="5"/>
                    </label> <br/>
                    <label>
                        Recipe Steps: <br/>
                        <textarea name="recipeSteps" value={state.recipeSteps} onChange={handleChange}
                                  placeholder='Chop up all carrots and garlic. &#13;&#13;Pour water over the carrots and add along the chopped garlic.'/>
                    </label> <br/>
                    <label>
                        Video Clip: <br/>
                        <input type="text" name="recipeURL" value={state.recipeURL} onChange={handleChange} placeholder='https://www.youtube.com/watch?v=dQw4w9WgXcQ'/>
                    </label> <br/>
                    <input className='Submit' type="submit" value="Submit" />
                </form>
            </div>
        </div>
    )
}

export default Form
