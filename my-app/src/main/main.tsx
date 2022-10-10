import React, {useEffect, useState} from 'react';
import './main.scss'
import '../popup/popup.scss'

const Main = () => {
  const [edit, setEdit] = useState<number>(0)
  const [cardEdit, setCardEdit] = useState<number>(0)
  const [descriptionEdit, setDescriptionEdit] = useState<number>(0)
  const [commentEdit, setCommentEdit] = useState<number>(0)
  const [visible, setVisible] = useState<number[]>([0])
  const [add, setAdd] = useState<number>(0)
  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [comments, setComments] = useState<string>('')
  const [author, setAuthor] = useState<string>('')
  const input = document.querySelectorAll('input')
  const [tables, setTables] = useState([
    {id: 1, name: 'TODO', cards: []},
    {id: 2, name: 'In progress', cards: [
        {name: 'sad', description: 'asd', comments: [
            {comment: 'sda', commentator: 'das'},
            {comment: 'as', commentator: 'ff'}
          ], author: 'asd'},
      ]},
    {id: 3, name: 'Testing', cards: []},
    {id: 4, name: 'Done', cards: []},
  ])

  const newComment = {
    comment: comments,
    commentator: author
  }

  const newCard = {
    name,
    description,
    comments: [],
    author
  }

  useEffect(() => {
    const table = localStorage.getItem('table')
    if (table) {
      setTables(JSON.parse(table))
    }
    setAuthor(localStorage.getItem('userName') || '')
  }, [])

  window.addEventListener('beforeunload', function () {
    localStorage.setItem('table', JSON.stringify(tables));
  })

  const escapeCheck = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {setVisible([0])}
  }

  useEffect(() => {
    window.addEventListener('keyup', escapeCheck)
    return () => {
      window.removeEventListener('keyup', escapeCheck)
    }
  }, [])


  const editHandler = (name: string, id: number) => {
    return (
        <input autoFocus type="text" onChange={(e) => {
          setTables(tables.map(tab => tab.id === id ? {...tab, name: e.target.value} : tab))
        }} defaultValue={name}/>
    )
  }

  const editClose = () => {
    setCardEdit(0)
    input.forEach(el => el.value = '')
  }

  const cardEditHandler = (cardName: string, id: number, cardId: number) => {
    return (
        <div className='add-wrapper'>
          <input type='text'
                 autoFocus
                 className='add-input'
                 defaultValue={cardName}
                 onChange={(e) => {
                   setName(e.target.value)
                 }}/>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <button onClick={() => cardEdit1(id, cardId)} className='add-button'>Save</button>
            <button onClick={() => editClose()} className='close-button'>X</button>
          </div>
        </div>
    )
  }

  const deleteCard = (tableId: number, cardId: number) => {
    const cardArr = tables[tableId - 1].cards
    cardArr.splice(cardId, 1);
    setTables(tables.map(tab => tab.id === tableId ? {...tab, cards: cardArr} : tab))
  }

  const deleteComment = (tableId: number, cardId: number, commentId: number) => {
    const cardArr = tables[tableId - 1].cards
    cardArr[cardId].comments.splice(commentId, 1)
    setTables(tables.map(tab => tab.id === tableId ? {...tab, cards: cardArr} : tab))
  }

  const cardEdit1 = (tableId: number, cardId: number) => {
    if (name.length > 0) {
      const cardList = tables[tableId - 1].cards.map((card, idx) => idx === cardId ? {...card, name: name} : card)
      setTables(tables.map(table => table.id === tableId ? {...table, cards: cardList} : table))
      setCardEdit(0)
    }
  }

  const postComment = (tableId: number, cardId: number) => {
    const dsa = tables[tableId - 1].cards.map((card, idx) => idx === cardId ? {...card, comments: [...card.comments, newComment]} : card)
    setTables(tables.map(tab => tab.id === tableId ? {...tab, cards: dsa} : tab))
    input.forEach(el => el.value = '')
    setComments('')
  }

  const descriptionEditHandle = (tableId: number, cardId: number) => {
    const dsa = tables[tableId - 1].cards.map((card, idx) => idx === cardId ? {...card, description: description} : card)
    setTables(tables.map(tab => tab.id === tableId ? {...tab, cards: dsa} : tab))
    setDescriptionEdit(0)
    setDescription('')
  }

  const editCommentHandler = (tableId: number, cardId: number, commentId: number) => {
    const dsa = tables[tableId - 1].cards.map((card, idx) => idx === cardId ? {...card, comments: [...card.comments]} : card)
    dsa[0].comments[commentId].comment = comments
    setCommentEdit(0)
  }

  const closeHandle = () => {
    setAdd(0);
    setName('')
  }

  const addHandler = (id: number) => {

    const add = () => {
      if (name.length > 0) {
        setTables(tables.map(tab => tab.id === id ? {...tab, cards: [...tab.cards, newCard]} : tab))
        setAdd(0)
      }
      setName('')
    }

    return (
        <div className='add-wrapper'>
          <input type='text'
                 autoFocus
                 className='add-input'
                 placeholder='Enter a title for the card'
                 onChange={(e) => {
                   setName(e.target.value)
                 }}/>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <button
                onClick={() => add()}
                className='add-button'>Add card
            </button>
            <button onClick={() => closeHandle()} className='close-button'>X</button>
          </div>
        </div>
    )
  }

  return (
      <div className='main'>
        {tables.map((table, idx) =>
            <div key={table.id} className='table'>
              <div className='table__content'>
                <div className='title-wrapper'>
                  {edit === table.id
                      ? editHandler(table.name, table.id)
                      : <span className='table__title'>{table.name}</span>}
                  <div className='edit-logo'
                       onClick={() => setEdit(edit === table.id ? 0 : table.id)}>
                  </div>
                </div>
                {table.cards.map((el, id) =>
                    <div key={id}>
                      {visible[0] === id + 1 && visible[1] === idx + 1
                          ? <div className='card-popup'>
                            <button className='close-button btn'
                                    onClick={() => setVisible([0])}>X
                            </button>
                            <div className='card-content'>
                              {cardEdit === table.id
                                  ? cardEditHandler(el.name, table.id, id)
                                  : <span
                                      onClick={() => setCardEdit(edit === table.id ? 0 : table.id)}
                                      className='popup__title card'>{el.name}</span>}
                              <span className='popup-text'>in the <b>{table.name}</b> column</span>
                              <span className='popup-text'>created by <b>{el.author}</b></span>
                              <div className='description-wrapper'>
                                <span onClick={() => setDescriptionEdit(table.id)} className='popup__title description'>Description</span>
                                {el.description.length > 1 && descriptionEdit === 0
                                    ? <span className='popup-text'>{el.description}</span>
                                    : <div className='description-wrapper'>
                                      <input defaultValue={el.description}
                                             type='text'
                                             className='add-input'
                                             placeholder='Enter a description'
                                             onChange={(e) => {
                                                    setDescription(e.target.value)
                                                  }}/>
                                      <button onClick={() => descriptionEditHandle(table.id, id)}
                                              className='add-button'>Save</button>
                                    </div>
                                }
                              </div>
                              <span className='popup__title comment'>Comments</span>
                              <div>
                                <input onChange={(e) => {
                                  setComments(e.target.value)}}
                                       className='add-input comment-input'
                                       type='text'
                                       placeholder='Write a comment...'/>
                                <button onClick={() => comments.length > 0 ? postComment(table.id, id) : ''} className='add-button comment-button'>Post</button>
                              </div>
                              <div className='scroll-wrapper'>
                              {el.comments.map((comment, idx) => <div key={idx} className='comment-body'>
                                <div style={{display: 'flex', alignItems: 'center', columnGap: '5px'}}>
                                  <img src={require('../assets/jpg/profile.jpg')} height='20px' width='20px'/>
                                  <span className='comment-author'>{comment.commentator}</span>
                                </div>

                                <div className='comment-wrapper'>
                                  {commentEdit > 0 && idx + 1 === commentEdit
                                      ? <div>
                                        <input onChange={(e) => {
                                          setComments(e.target.value)}}
                                               autoFocus
                                               className='add-input comment-input'
                                               type='text'
                                               defaultValue={comment.comment}/>
                                        <button onClick={() => editCommentHandler(table.id, id, idx)}
                                                className='add-button comment-button'>Save</button>
                                      </div>
                                      : <span className='comment-text'>{comment.comment}</span>}
                                  {comment.commentator === author
                                      ? <div className='comment-edit'>
                                        <img onClick={() => setCommentEdit(idx + 1)} style={{cursor: 'pointer'}} src={require('../assets/png/edit-icon.png')} height='30px' width='30px' alt='edit'/>
                                        <span onClick={() => deleteComment(table.id, id, idx)} className='close-button'>X</span>
                                      </div>
                                      : ''}
                                </div>
                              </div>)}
                              </div>
                              <button onClick={() => deleteCard(table.id, id)}
                                      className='add-button delete'>Delete card</button>
                            </div>
                          </div>
                          : ''}
                      <div onClick={() => setVisible([id + 1, idx + 1])} className='card-wrapper'>

                        <span className='table__text black'>{el.name}</span>
                        <span style={{display: el.comments.length > 0 ? 'flex' : 'none'}}
                              className='comments'>{el.comments.length}</span>
                      </div>
                    </div>
                )}
                {add === table.id
                    ? addHandler(table.id)
                    : <span onClick={() => setAdd(add === table.id ? 0 : table.id)}
                            className='table__text add-card'>+ Add card</span>}
              </div>
            </div>
        )}
      </div>
  );
}

export default Main;
