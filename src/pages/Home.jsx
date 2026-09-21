import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Search from '../components/Search'

const Home = () => {
  return (
    <>
      <header>
        <div>
          <a href="/">Event<span>ly</span></a>
          <Navbar />
        </div>
      </header>
      <main>
        <section>
          <div>
            <h1>Découvre, participe et partage des événements.</h1>
            <Search />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Home