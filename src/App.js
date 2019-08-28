import React from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

function App() {
  return (
    <div className="App">
      <FilterableMuseumTable />
    </div>
  );
}

class MuseumRow extends React.Component{
  render(){
    const museum=this.props.museum;
    return(   
      <tr>  
        <td>{museum.id}</td>
        <td>{museum.name}</td>
        <td>{museum.address}</td>
        <td>
          <a href={museum.website}><button >Site Web</button></a>
        </td>
      </tr>
    );
  }
}

class MuseumTable extends React.Component{  
  render(){
    const museums = this.props.museums;
    const rows=[];

    museums.forEach((museum)=>{
      let nameToSearch = museum.name.toLowerCase();
      if (nameToSearch.indexOf(this.props.filterText.toLowerCase()) === -1) {
        return;
      }
      rows.push(
      <MuseumRow museum={museum} key={museum.id}/>);
      }
    );

    return(
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Adresse</th>
            <th>Site Web</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    );
  }
}

class SearchBar extends React.Component{
  constructor(props){
    super(props);
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
  }

  handleFilterTextChange(e){
    this.props.onFilterTextChange(e.target.value);
  }
  
  render(){
    const filterText = this.props.filterText;
    
    return(
      <div>
        <form >
          <input type="text" placeholder="Rechercher.." value={filterText} onChange={this.handleFilterTextChange}/>
          <button type="submit"><FontAwesomeIcon icon={faSearch}/></button>
        </form>
      </div>
    );
  }
}

class FilterableMuseumTable extends React.Component{
  constructor(props){
    super(props)
    this.state={
      filterText:"BEAUX"
    };
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
  } 

  handleFilterTextChange(filterText) {
    this.setState({
      filterText: filterText
    });
  }

  render(){
    const MUSEUMS = [
      {id: 1, name: "Musée des manufactures de Dentelles", address: "14 avenue de la gare", website:"http://www.ville-retournac.fr/musee"},
      {id: 2, name: "Musée des Beaux Arts et d'Archéologie", address: "Place du palais, CHAUMONT", website:"http://www.ville-chaumont.fr"}
    ];
    return(
      <div>
        <h1>Liste des musées de France</h1>
        <SearchBar filterText={this.state.filterText} onFilterTextChange={this.handleFilterTextChange}/>
        <MuseumTable museums={MUSEUMS} filterText={this.state.filterText}/>
      </div>
    );
  }
}

 export default App;
