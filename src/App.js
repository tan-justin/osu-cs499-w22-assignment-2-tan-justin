import React from 'react';
import { Routes, Route, Link, useParams, Outlet, NavLink} from 'react-router-dom';
import './App.css';
import Person from './data/people.json';
import Movies from './data/films.json';
import Worlds from './data/planets.json';


/*
App component: stores the routes and the structure of the app. Holds navbar and route pathing
*/

function App() {

  return (
    <div>
      <Nav/>
      <Routes> 
        <Route path="/" element={<Home/>}/>
        <Route path="/people" element={<People/>}>
          <Route path=":id" element={<PeopleData/>}/>
        </Route>
        <Route path="/planets" element={<Planets/>}>
          <Route path=":id" element={<PlanetsData/>}/>
        </Route>
        <Route path="/films" element={<Film/>}>
          <Route path=":id" element={<FilmData/>}/>
        </Route>
        <Route path="*" element={<Error/>}/>
      </Routes>
      
    </div>
  );
}

/*
Home Component: Renders a message that describes how to use the app. Returns a h1 element.
*/ 

function Home(){
  return(
    <div>
      <h1>Hello! Here, you can look up more information about your favorite Star Wars person, planet or film! Please select from the navbar!</h1>
    </div>
  );
}

/*
People Component: Holds the sidebar as well as the outlet for the JSON data. Returns the SideBar in a nav container, and the Outlet PeopleData
*/

function People(){
  
  let activestyle ={
    color: "black"
  };

  return(
    <div className='Parent'>
      <nav className='sideBar'>
          {Object.entries(Person).map(([key, value]) => (
             <li key={key}><NavLink to ={key} style={({isActive})=>isActive ? activestyle : undefined}>{value.name}</NavLink></li>
          ))}
      </nav>
      <Outlet/>
    </div>
  )
}
/*
Planets component: Holds the sidebar for planets as well as outlet for JSON data. Returns Sidebar in nav container, Outlet: PlanetsData
*/

function Planets(){

  let activestyle ={
    color: "black"
  };

  return(
    <div className='Parent'>
      <div className='sideBar'>
        {Object.entries(Worlds).map(([key, value]) => (
          <li key={key}><NavLink to ={key} style={({isActive})=>isActive ? activestyle : undefined}>{value.name}</NavLink></li>
        ))}
      </div>
      <Outlet/>
    </div>
  )
}

/*
Film Component: Holds sidebar as well as outlet for JSON data. Return renders sidebar. Outlet: FilmsData()
 */


function Film(){

  let activestyle ={
    color: "black"
  };

  return(
    <div className='Parent'>
      <div className='sideBar'>
        {Object.entries(Movies).map(([key, value]) => (
          <li key={key}><NavLink to ={key} style={({isActive})=>isActive ? activestyle : undefined}>{value.title}</NavLink></li>
        ))}
      </div>
      <Outlet/>
    </div>
  )
}

/*
PeopleData Component: Gets data from people.json, returns information if entry id exists, returns error message if it does not. 
*/


function PeopleData(){
  const pageID = useParams();
  const people_array = Person[pageID.id];
  return(people_array ? (
      <div className='Outlet'>
          <h1>{Person[pageID.id].name}</h1>
          <p>Height: {Person[pageID.id].height}</p>
          <p>Mass: {Person[pageID.id].mass}</p>
          <p>Hair Color: {Person[pageID.id].hair_color}</p>
          <p>Skin Color: {Person[pageID.id].skin_color}</p>
          <p>Eye Color: {Person[pageID.id].eye_color}</p>
          <p>Birth year: {Person[pageID.id].birth_year}</p>
          <p>Gender: {Person[pageID.id].gender}</p>
          <p>Home World: <Link to={{pathname:Person[pageID.id].homeworld}}>{Person[pageID.id].homeworld}</Link></p>
          <p>Films: {Person[pageID.id].films.map((value) => (
            <p key={value}><Link to ={value}>{value}</Link></p>
          ))}</p>
      </div>   
    ) : <Error/>
  );
}

/*
PlanetsData: Get data from planets.json. Returns entry if it exists, else returns error message
*/


function PlanetsData(){
  
  const pageID = useParams();
  const planet_array = Worlds[pageID.id];
  return( planet_array ? (
    <div className='Outlet'>
        <h1>{Worlds[pageID.id].name}</h1>
        <p>Rotation Period: {Worlds[pageID.id].rotation_period}</p>
        <p>Orbital Period: {Worlds[pageID.id].orbital_period}</p>
        <p>Diameter: {Worlds[pageID.id].diameter}</p>
        <p>Climate: {Worlds[pageID.id].climate}</p>
        <p>Gravity: {Worlds[pageID.id].gravity}</p>
        <p>Terrain: {Worlds[pageID.id].terrain}</p>
        <p>Surface Water: {Worlds[pageID.id].surface_water}</p>
        <p>Population: {Worlds[pageID.id].population}</p>
        <p>Residents: {Worlds[pageID.id].residents.map((value) => (
          <p key={value}><Link to ={value}>{value}</Link></p>
        ))}</p>
        <p>Films: {Worlds[pageID.id].films.map((value) => (
          <p key={value}><Link to ={value}>{value}</Link></p>
        ))}</p>
    </div>
    ) : <Error/>
  );
}

/*
FilmData Component: Gets data from films.json. Return renders entry if it exist, error if not.
*/

function FilmData(){

  const pageID = useParams();
  const films_array = Movies[pageID.id];

  return( films_array ? (
    <div className='Outlet'>
    <h1>{Movies[pageID.id].title}</h1>
    <p>Episode id: {Movies[pageID.id].episode_id}</p>
    <p>Opening Crawl: {Movies[pageID.id].opening_crawl}</p>
    <p>Director: {Movies[pageID.id].director}</p>
    <p>Producer: {Movies[pageID.id].producer}</p>
    <p>Release Date: {Movies[pageID.id].release_date}</p>
    <p>Characters: {Movies[pageID.id].characters.map((value) => (
      <p key={value}><Link to ={value}>{value}</Link></p>
    ))}</p>
    <p>Planets: {Movies[pageID.id].planets.map((value) => (
      <p key={value}><Link to ={value}>{value}</Link></p>
    ))}</p>
  </div>
  ) : <Error/>
  );
}

/*
Nav Component: Returns nav bar that links to each of the above components. Active link text's color is changed to white
*/

function Nav(){

  let activeStyle={
    color: "white"
  }
  return(
    <nav className='Nav'>
      <NavLink to="/" style= {({isActive})=>isActive ? activeStyle : undefined}>Home</NavLink>
      <NavLink to="/people" style= {({isActive})=>isActive ? activeStyle : undefined}>People</NavLink>
      <NavLink to="/films" style= {({isActive})=>isActive ? activeStyle : undefined}>Films</NavLink>
      <NavLink to="/planets" style= {({isActive})=>isActive ? activeStyle : undefined}>Planets</NavLink>
    </nav>
  );
}

/*
Error Component: Only renders if error is procced
*/ 

function Error(){
  return(
    <div>
      <h1>This link does not exist, please hit back or choose from one of the options of the navbar</h1>
    </div>
  )
}

export default App;
