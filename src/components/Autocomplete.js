import React from 'react';

export default class Autocomplete extends React.Component {
  constructor(props) {
    super(props);
    this.state = { matches: []};
  }

  onKeyPress = async (event) => {
    this.setState({ loading: true });
    let results = await this.props.getResults(event.target.value);
    this.setState({ matches: results, selected: 0, loading: false });
  }

  select = (selected) => {
    this.setState({ matches: [], selected: 0 });
    this.props.onSelect(selected);
  }

  keyHandling = (event) => {
    if (!this.state.matches || this.state.matches.length === 0)
      return;
    
    if (event.keyCode === 38) { // Up Arrow
      let newSelection = this.state.selected - 1;
      if (newSelection < 0)
        newSelection = this.state.matches.length + newSelection;
      this.setState({ selected: newSelection });
    } else if (event.keyCode === 40) { // Down Arrow
      let newSelection = this.state.selected + 1;
      if (newSelection >= this.state.matches.length)
        newSelection = 0;
      this.setState({ selected: newSelection });
    } else if (event.keyCode === 13) { // Enter
      this.select(this.state.matches[this.state.selected]);
    }
  }

  componentDidMount() {
    window.addEventListener("keyup", this.keyHandling);
  }

  componentWillUnmount() {
    window.removeEventListener("keyup", this.keyHandling);
  }

  render() {
    return (
    <div>
      <div className="dropdown is-active dropdown-autocomplete">
        <div className={`dropdown-trigger control ${this.state.loading && 'is-loading'}`}>
          <input className="input is-rounded" placeholder="Begin typing to search" onChange={this.onKeyPress}/>
        </div>
          {this.state.matches && this.state.matches.length > 0 &&
            <div className="dropdown-menu" id="dropdown-menu" role="menu">
              <div className="dropdown-content">
              {this.state.matches.map((match, i) => {
                return (<a key={i} className={`dropdown-item ${this.state.selected === i && 'is-active'}`} onClick={() => { this.select(match) }}>
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

