import React from 'react';

const SearchForm = (props) => {
  return (
    <div>
      <h4>Rajaa hakua:</h4>
      <input
        name={props.name}
        value={props.value}
        onChange={props.onChange}
      />
     </div>

  )

}

export default SearchForm
