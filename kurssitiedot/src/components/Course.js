
import React from 'react'

const Course = ({course}) => {
  const name = course.name
  const parts = course.parts
  console.log('course: ', course)
    return (
      <div>
        <Header name={name} />
        <Content content={parts} />
        <Total parts={parts} />
      </div>
    )
}

const Header = ({name}) => {
  console.log('Header course: ', name)
    return (       
        <h2>{name}</h2>
    )
}

const Content = ({content}) => {
    console.log('Content: ', content)
    const rows = () => content.map(part =>
      <Part
        key={part.id}
        {...part}
      /> 
      ) 
    return (
        <ul>          
           {rows()}   
        </ul>
    )
}

const Part = ({name, exercises}) => {
  return (
    <li>{name} {exercises}</li>
  )
}

const Total = ({parts}) => {
  const newArr = parts.map(part => part.exercises)
  const getSum = (total, num) => total + num 
  const sum = newArr.reduce(getSum)
  console.log('sum: ', sum)

    return (
        <div><strong>total of {sum} exercises</strong></div>
        )
}

export default Course
