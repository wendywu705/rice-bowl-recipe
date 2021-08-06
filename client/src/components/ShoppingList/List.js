import { React, useState, useEffect } from 'react';
import '../Layout/Footer.css';
import './List.css';

const List = () => {
  const [exist, setExist] = useState(false);
  // const [listObj, setList] = useState({})
  console.log('runs')
  let listObj = {};
  // useEffect(() => {
  //   listObj={}
  // }, [])
  let tempobj = {
    "Greek Farro Salad": {
      "ingredients": [
        {
            "_id": "6108e374564967b7fc37e1f5",
            "quantity": 1.5,
            "quantity2": null,
            "unitOfMeasure": "cups",
            "description": "farro",
            "isGroupHeader": false
        },
        {
            "_id": "6108e374564967b7fc37e1f6",
            "quantity": 4,
            "quantity2": null,
            "unitOfMeasure": "cups",
            "description": "chicken broth",
            "isGroupHeader": false
        },
        {
            "_id": "6108e374564967b7fc37e1f7",
            "quantity": 1,
            "quantity2": null,
            "unitOfMeasure": "teaspoon",
            "description": "olive oil",
            "isGroupHeader": false
        },
        {
            "_id": "6108e374564967b7fc37e1f8",
            "quantity": 1,
            "quantity2": null,
            "unitOfMeasure": "teaspoon",
            "description": "sea salt or to taste",
            "isGroupHeader": false
        },
        {
            "_id": "6108e374564967b7fc37e1f9",
            "quantity": 0.25,
            "quantity2": null,
            "unitOfMeasure": "cup",
            "description": "extra-virgin olive oil",
            "isGroupHeader": false
        },
        {
            "_id": "6108e374564967b7fc37e1fa",
            "quantity": 3,
            "quantity2": null,
            "unitOfMeasure": "tablespoons",
            "description": "fresh lemon juice",
            "isGroupHeader": false
        },
        {
            "_id": "6108e374564967b7fc37e1fb",
            "quantity": 1,
            "quantity2": null,
            "unitOfMeasure": "tablespoon",
            "description": "Greek seasoning",
            "isGroupHeader": false
        },
        {
            "_id": "6108e374564967b7fc37e1fc",
            "quantity": 1,
            "quantity2": null,
            "unitOfMeasure": null,
            "description": "clove garlic minced",
            "isGroupHeader": false
        },
        {
            "_id": "6108e374564967b7fc37e1fd",
            "quantity": 1,
            "quantity2": null,
            "unitOfMeasure": "cup",
            "description": "seeded diced tomato",
            "isGroupHeader": false
        },
        {
            "_id": "6108e374564967b7fc37e1fe",
            "quantity": 1,
            "quantity2": null,
            "unitOfMeasure": "cup",
            "description": "seeded diced cucumber",
            "isGroupHeader": false
        },
        {
            "_id": "6108e374564967b7fc37e1ff",
            "quantity": 1,
            "quantity2": null,
            "unitOfMeasure": "cup",
            "description": "chopped red bell pepper",
            "isGroupHeader": false
        },
        {
            "_id": "6108e374564967b7fc37e200",
            "quantity": 0.75,
            "quantity2": null,
            "unitOfMeasure": "cup",
            "description": "thinly sliced red onion",
            "isGroupHeader": false
        },
        {
            "_id": "6108e374564967b7fc37e201",
            "quantity": 1,
            "quantity2": null,
            "unitOfMeasure": "cup",
            "description": "crumbled feta cheese",
            "isGroupHeader": false
        },
        {
            "_id": "6108e374564967b7fc37e202",
            "quantity": null,
            "quantity2": null,
            "unitOfMeasure": null,
            "description": "salt and ground black pepper to taste",
            "isGroupHeader": false
        }
      ]
    },
    "Crock Pot Lasagna" : {
      "ingredients": [
        {
            "_id": "61089a5ebde2e753f0750394",
            "quantity": 1,
            "quantity2": null,
            "unitOfMeasure": "lb",
            "description": "lean ground beef",
            "isGroupHeader": false
        },
        {
            "_id": "61089a5ebde2e753f0750395",
            "quantity": 1,
            "quantity2": null,
            "unitOfMeasure": null,
            "description": "onion chopped",
            "isGroupHeader": false
        },
        {
            "_id": "61089a5ebde2e753f0750396",
            "quantity": 2,
            "quantity2": null,
            "unitOfMeasure": null,
            "description": "garlic cloves smashed",
            "isGroupHeader": false
        },
        {
            "_id": "61089a5ebde2e753f0750397",
            "quantity": 1,
            "quantity2": null,
            "unitOfMeasure": null,
            "description": "(28 ounce) can tomato sauce",
            "isGroupHeader": false
        },
        {
            "_id": "61089a5ebde2e753f0750398",
            "quantity": 1,
            "quantity2": null,
            "unitOfMeasure": null,
            "description": "(6 ounce) can tomato paste",
            "isGroupHeader": false
        },
        {
            "_id": "61089a5ebde2e753f0750399",
            "quantity": 1,
            "quantity2": null,
            "unitOfMeasure": null,
            "description": "1⁄2 teaspoons salt",
            "isGroupHeader": false
        },
        {
            "_id": "61089a5ebde2e753f075039a",
            "quantity": 1,
            "quantity2": null,
            "unitOfMeasure": "teaspoon",
            "description": "dried oregano",
            "isGroupHeader": false
        },
        {
            "_id": "61089a5ebde2e753f075039b",
            "quantity": 12,
            "quantity2": null,
            "unitOfMeasure": "ounces",
            "description": "cottage cheese (we like 2%)",
            "isGroupHeader": false
        },
        {
            "_id": "61089a5ebde2e753f075039c",
            "quantity": 1,
            "quantity2": null,
            "unitOfMeasure": null,
            "description": "⁄2 cup grated parmesan cheese or 1/2 cup asiago cheese",
            "isGroupHeader": false
        },
        {
            "_id": "61089a5ebde2e753f075039d",
            "quantity": 12,
            "quantity2": null,
            "unitOfMeasure": "ounces",
            "description": "lasagna noodles uncooked",
            "isGroupHeader": false
        },
        {
            "_id": "61089a5ebde2e753f075039e",
            "quantity": 16,
            "quantity2": null,
            "unitOfMeasure": "ounces",
            "description": "shredded mozzarella cheese",
            "isGroupHeader": false
        }
      ]
    },
    "Chickpea Greek Salad" : {
      "ingredients" :[
        {
            "_id": "610935315d80dbe6d6ad228d",
            "quantity": null,
            "quantity2": null,
            "unitOfMeasure": null,
            "description": "For the salad:",
            "isGroupHeader": true
        },
        {
            "_id": "610935315d80dbe6d6ad228e",
            "quantity": 1,
            "quantity2": null,
            "unitOfMeasure": null,
            "description": "(15 ounce) can of chickpeas rinsed and drained",
            "isGroupHeader": false
        },
        {
            "_id": "610935315d80dbe6d6ad228f",
            "quantity": 1,
            "quantity2": null,
            "unitOfMeasure": null,
            "description": "red bell pepper chopped",
            "isGroupHeader": false
        },
        {
            "_id": "610935315d80dbe6d6ad2290",
            "quantity": 1,
            "quantity2": null,
            "unitOfMeasure": null,
            "description": "yellow bell pepper chopped",
            "isGroupHeader": false
        },
        {
            "_id": "610935315d80dbe6d6ad2291",
            "quantity": 1,
            "quantity2": null,
            "unitOfMeasure": null,
            "description": "green bell pepper chopped",
            "isGroupHeader": false
        },
        {
            "_id": "610935315d80dbe6d6ad2292",
            "quantity": 0.25,
            "quantity2": null,
            "unitOfMeasure": "cup",
            "description": "diced red onion",
            "isGroupHeader": false
        },
        {
            "_id": "610935315d80dbe6d6ad2293",
            "quantity": 15,
            "quantity2": null,
            "unitOfMeasure": null,
            "description": "grape tomatoes halved (about 1 cup halved grape tomatoes)",
            "isGroupHeader": false
        },
        {
            "_id": "610935315d80dbe6d6ad2294",
            "quantity": 0.333,
            "quantity2": null,
            "unitOfMeasure": "cup",
            "description": "pitted kalamata olives chopped if desired",
            "isGroupHeader": false
        },
        {
            "_id": "610935315d80dbe6d6ad2295",
            "quantity": 1,
            "quantity2": null,
            "unitOfMeasure": null,
            "description": "medium cucumber sliced and quartered",
            "isGroupHeader": false
        },
        {
            "_id": "610935315d80dbe6d6ad2296",
            "quantity": 4,
            "quantity2": null,
            "unitOfMeasure": "ounces",
            "description": "feta cheese crumbled or cut into 1/2 inch cubes",
            "isGroupHeader": false
        },
        {
            "_id": "610935315d80dbe6d6ad2297",
            "quantity": null,
            "quantity2": null,
            "unitOfMeasure": null,
            "description": "For the dressing:",
            "isGroupHeader": true
        },
        {
            "_id": "610935315d80dbe6d6ad2298",
            "quantity": 2,
            "quantity2": null,
            "unitOfMeasure": "tablespoons",
            "description": "olive oil",
            "isGroupHeader": false
        },
        {
            "_id": "610935315d80dbe6d6ad2299",
            "quantity": 2,
            "quantity2": null,
            "unitOfMeasure": "tablespoons",
            "description": "freshly squeezed lemon juice",
            "isGroupHeader": false
        },
        {
            "_id": "610935315d80dbe6d6ad229a",
            "quantity": 1,
            "quantity2": null,
            "unitOfMeasure": null,
            "description": "cloves garlic minced",
            "isGroupHeader": false
        },
        {
            "_id": "610935315d80dbe6d6ad229b",
            "quantity": 1,
            "quantity2": null,
            "unitOfMeasure": "teaspoon",
            "description": "dried oregano",
            "isGroupHeader": false
        },
        {
            "_id": "610935315d80dbe6d6ad229c",
            "quantity": null,
            "quantity2": null,
            "unitOfMeasure": null,
            "description": "freshly ground salt and pepper to taste",
            "isGroupHeader": false
        }
      ]
    }
  }
  // get curr week
  let today = new Date();
  let start = today.getDate() - today.getDay(); 
  let end = start + 6; 

  let wStart = new Date(today.setDate(start)).toLocaleDateString();
  let wEnd = new Date(today.setDate(end)).toLocaleDateString();

  // unit of measure: weight
  // - lbs, 
  // unit of measure: amount
  // - ounce(s), oz, teaspoons, cup, tablespoon


  for (const [recipe, ingredients] of Object.entries(tempobj)) {
    // console.log(recipe, ingredients)
    for (const [num, idata] of Object.entries(ingredients)) {
      // console.log(key, val)
      for (const [index, foodinfo] of Object.entries(idata)) {
        // console.log(key, val)
        console.log(foodinfo.unitOfMeasure)
        // if (foodinfo.unitOfMeasure)
        if (!foodinfo.quantity) {
          continue
        }
        // if (foodinfo.description.includes('/')) {
        //   let ind = foodinfo.description.indexOf('/');
        //   let newString = '';
        //   let stringStart=0;
        //   let stringEnd=foodinfo.description.length;
        //   if (ind !== 0) {
        //     let newind = ind-1;
        //     while (1) {
        //       if (foodinfo.description[newind] === ' ') {
        //         stringStart = newind;
        //         break;
        //       }
        //       if (newind === 0) {
        //         break;
        //       } else {
        //         newind -= 1;
        //       }
        //     }
        //   }
        //   if (ind !== foodinfo.description.length -1) {
        //     let tempind = ind+1;
        //     while (1) {
        //       if (foodinfo.description[tempind] !== ' ') {
        //         stringEnd = tempind;
        //         break;
        //       }
        //       if (tempind === foodinfo.description.length -1) {
        //         break;
        //       } else {
        //         tempind += 1;
        //       }
        //     }
        //   }          
        // }
        if (foodinfo.description in listObj){
          console.log('found')
          listObj[foodinfo.description][0] += foodinfo.quantity
        }
        else {
          listObj[foodinfo.description] = [foodinfo.quantity, foodinfo.unitOfMeasure]
        }
      }
    }
  }
  console.log('listObj', listObj)
  console.log(tempobj)
  console.log(wStart)
  return (
    <div id="pageContainer" className="listContainer">
      <div>
        <div>Shopping List</div>
        <div>{wStart} - {wEnd}</div>
      </div>
      <div>
         {Object.keys(listObj).map(data => {
          return <div>{data}</div>
        })}
      </div>
      
    </div>
  );
};

export default List;