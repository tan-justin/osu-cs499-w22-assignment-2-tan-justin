function PlanetsData(){
  
    const planet_array = [];
    const pageID = useParams();
    const planet = {};
    Worlds.map = planet_array;
    if(pageID.id in Worlds[pageID.id]){
      planet = Worlds[pageID.id];
    }
   
  
    return(
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
              <li key={value}><Link to ={value}>{value}</Link></li>
            ))}</p>
            <p>Films: {Worlds[pageID.id].films.map((value) => (
              <li key={value}><Link to ={value}>{value}</Link></li>
            ))}</p>
        </div>
    );
  }