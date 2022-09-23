
import AnecdotesForm from "./components/AnecdotesForm";
import AnecdoteList from "./components/AnecdoteList";
import Notification from "./components/Notification";

const App = () => {




  return (
    <div>
        <Notification />
      <h2>Anecdotes</h2>
        <AnecdoteList />
      <AnecdotesForm />

    </div>
  )
}

export default App
