import React from 'react';

export default class Autocomplete extends React.Component {
  constructor(props) {
    super(props);
    this.state = { matches: []};
  }

  onKeyPress = async (event) => {
    let results = await this.props.getResults(event.target.value);
    console.debug("=====", results);
    this.setState({ matches: results });
  }
  
  render() {
    return (
    <div>
      <div className="dropdown is-active">
        <div className="dropdown-trigger">
          <input className="input is-rounded" placeholder="Begin typing to search" onChange={this.onKeyPress}/>
        </div>
          {this.state.matches && this.state.matches.length > 0 &&
            <div className="dropdown-menu" id="dropdown-menu" role="menu">
              <div className="dropdown-content">
              {this.state.matches.map((match, i) => {
                return (<a key={i} className="dropdown-item">
                  <h4>{match.title}</h4>
                  <p> {match.labels.map((l) => {
                    return <span className="tag is-rounded" key={l.id}>{l.name}</span>
                  })}
                  </p>
                </a>)  
              })}
              </div>
            </div>
          }
      </div>
    </div>)
  }
}

