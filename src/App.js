import React from 'react';
import './App.css';

//Import font awesome icon (see how to create a library ..)
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
    return(   
      <tr>  
        <td>{this.props.num}</td>
        <td>{museum.fields.nom_du_musee}</td>
        <td>{museum.fields.adr} {museum.fields.cp} {museum.fields.ville}</td>
        <td>{museum.fields.nomdep}</td>
        <td>{museum.fields.telephone1}</td>
        <td>{museum.fields.periode_ouverture}</td>
        <td>
          <a href={museumURL}><button >Site Web</button></a>
        </td>
      </tr>
    );
  }
}

class MuseumTable extends React.Component{  
  constructor(props){
    super(props);
    this.handleSelectedDptChange=this.handleSelectedDptChange.bind(this);
  }

  handleSelectedDptChange(e){
    this.props.onSelectedDptChange(e.target.value);
  }
  
  render(){
    const options = ["AIN", "ALLIER"];
    const museums = this.props.museums;
    const rows=[];
    let cpt=1;

    museums.forEach((museum)=>{
      let nameInspected = museum.fields.nom_du_musee.toLowerCase();
      if ((nameInspected.indexOf(this.props.filterText.toLowerCase()) === -1) 
      ||
        (museum.fields.nomdep.indexOf(this.props.selectedDpt)=== -1)) {
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
            <th>
              Département
              <select value={this.props.selectedDpt} onChange={this.handleSelectedDptChange}>
                <option value={options[0]}>{options[0]}</option>
                <option value={options[1]}>{options[1]}</option>
              </select>
            </th>
            <th>Téléphone</th>
            <th>Horaires d'ouverture</th>
            <th></th>
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
          <FontAwesomeIcon icon ={faSearch} />
          <input type="text" placeholder="Rechercher par nom.." value={filterText} onChange={this.handleFilterTextChange}/>
        </form>
      </div>
    );
  }
}

class FilterableMuseumTable extends React.Component{
  constructor(props){
    super(props)
    this.state={
      filterText:"",
      selectedDpt:"ALLIER"
    };
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleSelectedDptChange = this.handleSelectedDptChange.bind(this);
  } 

  handleFilterTextChange(filterText) {
    this.setState({
      filterText: filterText
    });
  }

  handleSelectedDptChange(selectedDpt){
    this.setState({
      selectedDpt: selectedDpt
    });
  }

  render(){
    return(
      <div>
        <h1>Liste des musées de France</h1>
        <SearchBar filterText={this.state.filterText} onFilterTextChange={this.handleFilterTextChange}/>
        <MuseumTable 
          museums={this.props.source} 
          filterText={this.state.filterText} 
          selectedDpt={this.state.selectedDpt}
          onSelectedDptChange={this.handleSelectedDptChange} />
      </div>
    );
  }
}

 export default App;
