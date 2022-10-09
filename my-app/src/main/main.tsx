import React, {useEffect, useState} from 'react';
import './main.scss'

const Main = () => {
  const [editedTitle, setEditedTitle] = useState<string>('')
  const [edit, setEdit] = useState<number>(0)
  const [visible, setVisible] = useState<boolean>(false)
  const [tables, setTables] = useState([
    {id: 1, name: 'TODO'},
    {id: 2, name: 'In progress'},
    {id: 3, name: 'Testing'},
    {id: 4, name: 'Done'},
  ])

  const editHandler = (name: string, id: number) => {
    return (
        <input type="text" onChange={(e) => {
          setTables(tables.map(tab => tab.id === id ? {...tab, name: e.target.value} : tab))
        }} defaultValue={name}/>
    )
  }

  useEffect(() => {

  }, [edit])

  return (
      <div className='main'>
        {tables.map(table =>
            <div className='table'>
              <div className='table__content'>
                <div className='title-wrapper'>
                  {edit === table.id
                      ? editHandler(table.name, table.id)
                      : <a className='table__title'>{table.name}</a>}
                  <div className='edit-logo' onClick={() => setEdit(edit === table.id ? 0 : table.id)}>
                  </div>
                </div>
                <a className='table__text add-card'>+ Add card</a>
              </div>
            </div>
        )}
      </div>
  );
}

export default Main;
