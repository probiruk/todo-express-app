import {
  IControllerResult,
  newControllerData,
  newControllerError,
} from '../../utils/controller-result.model';
import { todosDal, TodosDal } from './dal';
import { ITodoPayload, Todo } from './model';
import { validateTodoCreatePayload, validateTodoEditPayload } from './validator';

export class TodosController {
  todosDal: TodosDal;
  constructor(todosDal: TodosDal) {
    this.todosDal = todosDal;
  }

  create(payload: ITodoPayload): IControllerResult<Todo> {
    const { error, value } = validateTodoCreatePayload(payload);
    if (error) {
      return newControllerError(error.details[0].message, 400);
    }

    return newControllerData(this.todosDal.create(value));
  }

  //TODO: Implement get all
  getAll(): IControllerResult<Todo[]> {
    return newControllerData(this.todosDal.getAll());
  }

  //TODO: Implement update
  update(payload: ITodoPayload, id: string): IControllerResult<Todo> {
    const { error, value } = validateTodoEditPayload(payload);
    if (error) {
      return newControllerError(error.details[0].message, 400);
    }

    return newControllerData(this.todosDal.edit(payload, id));
  }

  //TODO: Implement delete
  delete(id: string): String {
    const deleted = newControllerData(this.todosDal.delete(id));
    if (deleted) {
      return "Todo deleted successfully";
    } else {
      return "Something went wrong";
    }
  }
}

export const todosController = new TodosController(todosDal);
