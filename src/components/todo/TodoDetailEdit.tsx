import { useState } from "react";
import { useTodo } from "hooks/todo/useTodo";
import { useMutate } from "hooks/.commons/useMutate";
import { todoItemDto } from "types/todoTypes";
import { amendState } from "utils/amendState";
import Button from "components/.commons/Button";
import Textarea from "components/.commons/Textarea";
import { ReactComponent as EditIcon } from "assets/image/edit.svg";
import "assets/css/TodoDetail.css";

interface todoEditProps {
  id: string;
  originalTodo: todoItemDto;
  toggleEditMode?: () => void;
}

const TodoDetailEdit = ({
  id,
  originalTodo,
  toggleEditMode = () => {},
}: todoEditProps) => {
  const [editedTodo, setEditedTodo] = useState<todoItemDto>(originalTodo);
  const { updateTodo, onSuccessToUpdate } = useTodo();

  const { mutate } = useMutate(
    () => updateTodo(id, editedTodo.title, editedTodo.content),
    () => {
      toggleEditMode();
      onSuccessToUpdate();
    }
  );

  return (
    <section className="todo-detail__wrapper">
      <Textarea
        className="todo-detail__title"
        value={editedTodo.title}
        onChange={(value: string) =>
          amendState(editedTodo, setEditedTodo, "title", value)
        }
      />
      <Textarea
        className="todo-detail__content"
        value={editedTodo.content ?? ""}
        onChange={(value: string) =>
          amendState(editedTodo, setEditedTodo, "content", value)
        }
      />
      <div className="todo-detail__buttons">
        <Button
          value="저장"
          color="primary"
          isFilled
          icon={<EditIcon />}
          onClick={() => mutate()}
        />
        <Button
          value="취소"
          className="no-icon"
          color="tertiary"
          onClick={() => {
            setEditedTodo(originalTodo);
            toggleEditMode();
          }}
        />
      </div>
    </section>
  );
};

export default TodoDetailEdit;
