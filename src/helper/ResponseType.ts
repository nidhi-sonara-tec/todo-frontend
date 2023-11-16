export interface TodoType {
  readonly _id: string;
  readonly title: string;
  readonly type: string;
  readonly description: string;
  readonly assignee: string;
  readonly currentStateId: string;
}

export interface TodoProps {
  readonly tasks: TodoType[];
  readonly todoStatusTitle: string
}
