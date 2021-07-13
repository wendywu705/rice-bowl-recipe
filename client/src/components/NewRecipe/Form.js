import React from 'react';
import './Form.css';

function Form() {
    const [state, setState] = React.useState({
        recipeName: "",
        recipeIngredients: "",
        prepTimeHour: 0,
        prepTimeMin: 0,
        servingSize: 0,
        recipeSteps: [],
        recipeURL: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
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
                        Recipe Name:
                            <input type="text" name="recipeName" value={state.recipeName} onChange={handleChange}/>
                    </label> <br/>
                    <label className='Ingredients'>
                        Recipe Ingredients:
                        <textarea name="recipeIngredients" value={state.recipeIngredients} onChange={handleChange}/>
                    </label> <br/>
                    <label className='Time'>
                        Prep Time:
                        <input type="number" name="prepTimeHour" value={state.prepTimeHour} onChange={handleChange}/>
                    </label> hours
                    <label className='Time'>
                        <input type="number" name="prepTimeMin" value={state.prepTimeMin} onChange={handleChange}/>
                    </label> minutes
                    <label className='Serving-Size'>
                        Serving Size:
                        <input type="number" name="servingSize" value={state.servingSize} onChange={handleChange}/>
                    </label> <br/>
                    <label>
                        Recipe Steps:
                        <input type="text" name="recipeSteps" value={state.recipeSteps} onChange={handleChange}/>
                    </label> <br/>
                    <label>
                        Video Clip:
                        <input type="text" name="recipeURL" value={state.recipeURL} onChange={handleChange}/>
                    </label> <br/>
                    <input className='Submit' type="submit" value="Submit" />
                </form>
            </div>
        </div>
    )
}

export default Form
