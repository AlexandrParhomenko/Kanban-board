export type commentsType = {
  comment: string;
  commentator: string;
}

export type cardsType = {
  name: string;
  description: string;
  comments: commentsType[];
  author: string;
}

export type tableType = {
  id: number;
  name: string;
  cards: cardsType[];
}
