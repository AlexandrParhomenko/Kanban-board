import React, {useEffect, useState} from 'react';
import './main.scss'

const Main = () => {
  const [edit, setEdit] = useState<number>(0)
  const [add, setAdd] = useState<number>(0)
  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [tables, setTables] = useState([
    {id: 1, name: 'TODO', cards: []},
    {id: 2, name: 'In progress', cards: [
        {name: 'sad', description: ''},
      ]},
    {id: 3, name: 'Testing', cards: []},
    {id: 4, name: 'Done', cards: []},
  ])

  const editHandler = (name: string, id: number) => {
    return (
        <input type="text" onChange={(e) => {
          setTables(tables.map(tab => tab.id === id ? {...tab, name: e.target.value} : tab))
        }} defaultValue={name}/>
    )
  }

  const addHandler = (id: number) => {
    const newCard = {
      name,
      description
    }
    const micro = () => {
      setTables(tables.map(tab => tab.id === id ? {...tab, cards: [...tab.cards, newCard]} : tab))
      setAdd(0)
    }
    return (
        <div className='add-wrapper'>
          <textarea className='add-input' placeholder='Enter a title for the card' onChange={(e) => {
            setName(e.target.value)
          }}/>
          <div style={{display: 'flex', alignItems: 'center'}}><button
              onClick={() => micro()}
              className='add-button'>Add card</button>
            <button onClick={() => setAdd(0)} className='close-button'>X</button></div>
        </div>
    )
  }

  useEffect(() => {
    console.log(tables)
  }, [tables])

  return (
      <div className='main'>
        {tables.map(table =>
            <div className='table'>
              <div className='table__content'>
                <div className='title-wrapper'>
                  {edit === table.id
                      ? editHandler(table.name, table.id)
                      : <span className='table__title'>{table.name}</span>}
                  <div className='edit-logo'
                       onClick={() => setEdit(edit === table.id ? 0 : table.id)}>
                  </div>
                </div>
                {table.cards.map(el =>
                    <div className='card-wrapper'>
                      <span className='table__text black'>{el.name}</span>
                    </div>
                )}
                {add === table.id
                    ? addHandler(table.id)
                    : <span onClick={() => setAdd(add === table.id ? 0 : table.id)} className='table__text add-card'>+ Add card</span>}
              </div>
            </div>
        )}
      </div>
  );
}

export default Main;
