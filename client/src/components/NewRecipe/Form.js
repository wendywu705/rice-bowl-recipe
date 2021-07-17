import React from 'react';
import './Form.css';

function Form() {
    const [state, setState] = React.useState({
        name: "",
        ingredients: "",
        prepHour: 0,
        prepMin: 0,
        cookHour:0,
        cookMin:0,
        servingSize: 0,
        directions: [],
        url: "",
        rating: 5,
        category: "",
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
                    <label className = 'recipe-name-title'>
                        Recipe Name: <br/>
                            <input type="text" name="name" value={state.name} onChange={handleChange} placeholder='Enter Recipe Title'/>
                    </label> <br/>
                    <label className='Category'>
                        Categories: <br/>
                        <input type="text" name="category" value={state.category} onChange={handleChange}
                               placeholder='Enter Categories seperated by commas. eg) Chinese, Cake, Fish'/>
                    </label> <br/>
                    <label className='Ingredients'>
                        Recipe Ingredients: <br/>
                        <textarea name="ingredients" value={state.ingredients} onChange={handleChange}
                                  placeholder='quantity/unit/ingredient&#13;MUST HAVE UNITS&#13;3 cups carrots &#13;1 cup water &#13;5 cloves garlic &#13;etc...'/>
                    </label> <br/>
                    <label className='Prep'>
                        Prep Hours:
                        <input type="number" name="prepHour" value={state.prepHour} onChange={handleChange} min="0"/>
                    </label>
                    <label className='Prep'>
                        Prep Mins:
                        <input type="number" name="prepMin" value={state.prepMin} onChange={handleChange} min="0"/>
                    </label> <br/>
                    <label className='Cook'>
                        Cook Hours:
                        <input type="number" name="cookHour" value={state.cookHour} onChange={handleChange} min="0"/>
                    </label>
                    <label className='Cook'>
                        Cook Mins:
                        <input type="number" name="cookMin" value={state.cookMin} onChange={handleChange} min="0"/>
                    </label> <br/>
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
                        <textarea name="directions" value={state.directions} onChange={handleChange}
                                  placeholder='Chop up all carrots and garlic. &#13;&#13;Pour water over the carrots and add along the chopped garlic.'/>
                    </label> <br/>
                    <label className='url'>
                        Video Clip: <br/>
                        <input type="text" name="url" value={state.url} onChange={handleChange} placeholder='https://www.youtube.com/watch?v=dQw4w9WgXcQ'/>
                    </label> <br/>
                    <input className='Submit' type="submit" value="Submit" />
                </form>
            </div>
        </div>
    )
}

export default Form
