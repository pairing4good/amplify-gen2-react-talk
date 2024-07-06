import { FormEvent, useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import '@aws-amplify/ui-react/styles.css';

const client = generateClient<Schema>();

function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);
  const [prompt, setPrompt] = useState<string>("");
  const [answer, setAnswer] = useState<string | null>(null);

  const sendPrompt = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { data, errors } = await client.queries.generateHaiku({
      prompt,
    });

    if (!errors) {
      setAnswer(data);
      setPrompt("");
    } else {
      console.log(errors);
    }
  };

  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, []);

  function createTodo() {
    client.models.Todo.create({ content: window.prompt("Todo content") });
  }

  return (
    <main>
      <h1>My todos</h1>
      <button onClick={createTodo}>+ new</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.content}</li>
        ))}
      </ul>
      <div>
        🥳 App successfully hosted. Try creating a new todo.
        <br />
        <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
          Review next step of this tutorial.
        </a>
      </div>

      <h1 className="text-3xl font-bold text-center mb-4">Haiku Generator</h1>

        <form className="mb-4 self-center max-w-[500px]" onSubmit={sendPrompt}>
          <input
            className="text-black p-2 w-full"
            placeholder="Enter a prompt..."
            name="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </form>

        <div className="text-center">
          <pre>{answer}</pre>
        </div>
    </main>
  );
}

export default App;
