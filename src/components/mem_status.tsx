'use client'
import React, { useState } from 'react'

interface Person {
  name: string
  enterTime: string
  exitTime: string
  isPresent: boolean
}

// const people: Person[] = [
//   {
//     name: 'Alice',
//     enterTime: '10:00',
//     exitTime: '16:30',
//     isPresent: true,
//   },
//   {
//     name: 'Bob',
//     enterTime: '09:30',
//     exitTime: '18:00',
//     isPresent: true,
//   },
//   {
//     name: 'Carol',
//     enterTime: '11:15',
//     exitTime: '15:45',
//     isPresent: false,
//   },
// ]

//表示するための関数

const Table: React.FC<{ onTogglePresence: (index: number) => void; data: Person[] }> = ({
  onTogglePresence,
  data,
}) => {
  const tableHeader = ['名前', '入室時間', '退室時間', '在室状況']

  //mapを使用することで配列の各要素を受け取る
  return (
    <table>
      <thead>
        <tr>
          {tableHeader.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((person, index) => (
          <tr key={index}>
            <td>{person.name}</td>
            <td>{person.enterTime}</td>
            <td>{person.exitTime}</td>
            <td>
              <button onClick={() => onTogglePresence(index)}>変更</button>
              {person.isPresent ? '在室' : '退室'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

const App: React.FC = () => {
  const [name, setName] = useState('')
  //timeはストリング型に変換してから受け取る
  const [enterTime, setEnterTime] = useState('')
  const [exitTime, setExitTime] = useState('')

  const [people, setPeople] = useState<Person[]>([])

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  const handleEnterTimeChange = () => {
    const currentTime = new Date().toLocaleTimeString()
    setEnterTime(currentTime)
  }

  const handleExitTimeChange = () => {
    const currentTime = new Date().toLocaleTimeString()
    setExitTime(currentTime)
  }

  const togglePresence = (index: number) => {
    setPeople((prevPeople) => {
      console.log('チェック')
      const updatedPeople = [...prevPeople]
      updatedPeople[index].isPresent = !updatedPeople[index].isPresent
      return updatedPeople
    })
  }

  const handleAddPerson = () => {
    const newPerson: Person = {
      name: name,
      enterTime: enterTime,
      exitTime: exitTime,
      isPresent: true,
    }
    setPeople([...people, newPerson])
    setName('')
    setEnterTime('')
    setExitTime('')
  }

  return (
    <div className='timedisplay'>
      <h1>メンバーの在室状況</h1>
      <div>
        <label>
          名前:
          <input type='text' value={name} onChange={handleNameChange} />
        </label>
      </div>
      <div>
        入室時間: {enterTime}
        <button className='in' onClick={handleEnterTimeChange}>
          入室
        </button>
      </div>
      <div>
        退室時間: {exitTime}
        <button className='out' onClick={handleExitTimeChange}>
          退室
        </button>
      </div>
      <p></p>
      <button className='add' onClick={handleAddPerson}>
        追加
      </button>
      <p></p>

      <Table onTogglePresence={togglePresence} data={people} />
    </div>
  )
}

export default App
