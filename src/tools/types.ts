/* Types */

export type Todo = {
  title: string
  description?: string
  status?: string
}

export type TodoRequest = {
  GET: {
    Params: {
      id: number
    }
  }
  POST: {
    Body: Todo
  }
  PUT: {
    Body: Todo
    Params: {
      id: number
    }
  }
  DELETE: {
    Params: {
      id: number
    }
  }
}
