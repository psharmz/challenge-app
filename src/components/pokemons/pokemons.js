
import React, { Component } from 'react';
import MUIDataTable from "mui-datatables";


  function getUniques(dupeArray) {
    return [...new Set(dupeArray)]; 
  }



class GetPokemons extends Component {
    constructor(props){
        super(props);
        this.state = {
            error : null,
            isLoaded : false,
            posts : []        
        };
    }


componentDidMount() {
        // I will use fake api from jsonplaceholder website
        // this return 100 posts 
        fetch("https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json")
        .then( response => response.json())
        .then(
            // handle the result
            (result) => {
                this.setState({
                    isLoaded : true,
                    posts : result.pokemon
                });
            },

            // Handle error 
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                })
            },
        )
    }


  render() {
        const {error, isLoaded, posts} = this.state;

        const data = posts.map(posts => ([posts.name, posts.num, posts.type, posts.weaknesses]));
        const initTypeArray = posts.map(posts => posts.type).flat(); 
        const initWeakArray = posts.map(posts => posts.weaknesses).flat(); 

        const uniqueTypes = getUniques(initTypeArray);
        const uniqueWeaks = getUniques(initWeakArray);
        
        console.log(uniqueTypes);


        const options = {
        filterType: 'multiselect',
    };

        //“name,” “num,” “type,” and “weaknesses.”
        //only searchable on name
        const columns = [
 {
  name: "Name",
  options: {
   filter: false,
   sort: true,
  }
 },
 {
  name: "Num",
  options: {
   filter: false,
   sort: false,
   searchable: false
  }
 },
 {
  name: "Type",
  options: {
   filter: true,
   sort: false,
   searchable: false, 
   filterOptions: {
      names: uniqueTypes, 
   },
   customBodyRender: (value, tableMeta, updateValue) => {
    return value.toString(); 

   }
  }
 },
 {
  name: "Weaknesses",
  options: {
   filter: true,
   sort: false,
   searchable: false, 
   filterOptions: {
      names: uniqueWeaks
   },
   customBodyRender: (value, tableMeta, updateValue) => {
    return value.toString(); 

   }
  }
 },
];




        if(error){
            return <div>Error in loading</div>
        }else if (!isLoaded) {
            return <div>Loading ...</div>
        }else{
            return(
                // <div>
                //     <ol>
                //     {
                //         posts.map(post => (
                //             <li key={post.id} align="start">
                //                 <div>
                //                     <p>{post.name}</p>
                //                     <p>{post.id}</p>
                //                 </div>
                //             </li>
                //         ))
                //     }
                //     </ol>
                // </div>

                <MUIDataTable
				  title={"Pokemon"}
				  data={data}
				  columns={columns}
				  options={options}
				/>
            );
        }    
    }
}

    export default GetPokemons; 