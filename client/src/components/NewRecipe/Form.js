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
        hidden: "",
    })
    function handleChange(event) {
        const value = event.target.value;
        setState({
            ...state,
            [event.target.name]: value
        });
    }
    function handleCheckBox(event) {
        handleChange(event);
        const hidden = document.getElementById('hidden');
        if (hidden) {
            hidden.value = hidden !== true;
        }
    }

    function handleSubmit() {
        alert('Recipe submitted!');
        // this.history.push('/home') //no page redirecting yet

        // let recipeForm = document.forms['recipeForm'];
        // let photo = document.getElementById("image");
        // recipeForm.append(photo);
        // const request = new XMLHttpRequest();
        // request.open("POST", "https://localhost:9000/recipes/new",true);
        // request.onreadystatechange= function(){
        //     if (request.readyState ===4 && request.status === 200){
        //         alert('new recipe successful!');
        //     }
        // }
        // request.send(recipeForm);
        // console.log(response);
    }

    return (
        <div className="Form">
            <div>
                <h1 className= 'new-recipes-title'>New Recipe:</h1>
                <form id = 'recipeForm' onSubmit={handleSubmit}>
                    <label className = 'recipe-name-title'>
                        Recipe Name: <br/>
                            <input type="text" name="name" value={state.name} onChange={handleChange} placeholder='Enter Recipe Title' required="required"/>
                    </label> <br/>
                    <label className = 'img'>
                        Thumbnail Image (NOT IMPLEMENTED YET): <br/>
                        <input type="file" id="image" name="image" alt="image" accept="image/png, image/jpeg"/>
                    </label> <br/>
                    <label className = 'img'>
                        Thumbnail Image (NOT IMPLEMENTED YET): <br/>
                        <input type="file" id="image" name="image" alt="image" accept="image/png, image/jpeg"/>
                    </label> <br/>
                    <label className='Category'>
                        Categories: <br/>
                        <input type="text" name="category" value={state.category} onChange={handleChange}
                               placeholder='Enter Categories seperated by commas. eg) Chinese, Cake, Fish'/>
                    </label> <br/>
                    <label className='Ingredients'>
                        Recipe Ingredients: <br/>
                        <textarea name="ingredients" value={state.ingredients} onChange={handleChange}
                                  placeholder='quantity/unit/ingredient&#13;MUST HAVE UNITS&#13;3 cups carrots &#13;1 cup water &#13;5 cloves garlic &#13;etc...'
                                  required/>
                    </label> <br/>
                    <label className='Prep'>
                        Prep Hours:
                        <input type="number" name="prepHour" value={state.prepHour} onChange={handleChange} min="0"/>
                    </label>
                    <label className='Prep'>
                        Prep Mins:
                        <input type="number" name="prepMin" value={state.prepMin} onChange={handleChange} min="0" max="59"/>
                    </label> <br/>
                    <label className='Cook'>
                        Cook Hours:
                        <input type="number" name="cookHour" value={state.cookHour} onChange={handleChange} min="0"/>
                    </label>
                    <label className='Cook'>
                        Cook Mins:
                        <input type="number" name="cookMin" value={state.cookMin} onChange={handleChange} min="0" max="59"/>
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
                                  placeholder='Chop up all carrots and garlic. &#13;&#13;Pour water over the carrots and add along the chopped garlic.'
                                  required/>
                    </label> <br/>
                    <label className='url'>
                        Video Clip: <br/>
                        <input type="text" name="url" value={state.url} onChange={handleChange} placeholder='https://www.youtube.com/watch?v=dQw4w9WgXcQ'/>
                    </label> <br/>
                    <label className='hidden'>
                        Private?
                        <input type="checkbox" name="hidden" value='true' onChange={handleCheckBox} />
                    </label> <br/>
                    <input className='Submit' type="submit" value="Submit" formmethod='post' 
                    formaction='https://localhost:9000/recipes/new' formtarget='_self' />
                </form>
            </div>
        </div>
    )
}

export default Form
