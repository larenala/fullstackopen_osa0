import React from 'react';

const Button = (props) => (
  <button className="button" onClick={props.onClick}>{props.text}</button>
)

const Person = (props) => {
  return (
    <div>
      <p key={props.id}>{props.name} {props.number} <Button text= "Poista" onClick={props.onClick}/></p>
    </div>
  )

}

export default Person
