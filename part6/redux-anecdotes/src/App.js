
import AnecdotesForm from "./components/AnecdotesForm";
import AnecdoteList from "./components/AnecdoteList";
import Notification from "./components/Notification";
import Filter from "./components/Filter";

const App = () => {




  return (
    <div>
        <Notification />
      <h2>Anecdotes</h2>
        <AnecdoteList />
        <Filter />
      <AnecdotesForm />

    </div>
  )
}

export default App
