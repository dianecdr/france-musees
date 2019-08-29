import React from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

import data from './data/liste-et-localisation-des-musees-de-france.json';


function App() {
  return (
    <div className="App">
      <FilterableMuseumTable source={data}/>
    </div>
  );
}

class MuseumRow extends React.Component{
  render(){
    const museum=this.props.museum;
    const museumURL="http://"+museum.fields.sitweb;
    console.log(museum.fields.sitweb);
    return(   
      <tr>  
        <td>{this.props.num}</td>
        <td>{museum.fields.nom_du_musee}</td>
        <td>{museum.fields.adr} {museum.fields.cp} {museum.fields.ville}</td>
        <td>
          <a href={museumURL}><button >Site Web</button></a>
        </td>
      </tr>
    );
  }
}

class MuseumTable extends React.Component{  
  render(){
    const museums = this.props.museums;
    const rows=[];
    let cpt=1;

    museums.forEach((museum)=>{
      let nameToSearch = museum.fields.nom_du_musee.toLowerCase();
      if (nameToSearch.indexOf(this.props.filterText.toLowerCase()) === -1) {
        return;
      }
      rows.push(
      <MuseumRow museum={museum} key={museum.recordid} num={cpt}/>);
      cpt++;
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
      filterText:""
    };
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
  } 

  handleFilterTextChange(filterText) {
    this.setState({
      filterText: filterText
    });
  }

  render(){
    /* const MUSEUMS = [
      {id: 1, name: "Musée des manufactures de Dentelles", address: "14 avenue de la gare", website:"http://www.ville-retournac.fr/musee"},
      {id: 2, name: "Musée des Beaux Arts et d'Archéologie", address: "Place du palais, CHAUMONT", website:"http://www.ville-chaumont.fr"}
    ]; */
    return(
      <div>
        <h1>Liste des musées de France</h1>
        <SearchBar filterText={this.state.filterText} onFilterTextChange={this.handleFilterTextChange}/>
        <MuseumTable museums={this.props.source} filterText={this.state.filterText}/>
      </div>
    );
  }
}

 export default App;
