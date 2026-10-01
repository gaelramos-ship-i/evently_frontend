import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Search from '../components/Search'
import Account from '../components/account'
import '../styles/home.scss'

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
        <section id='search'>
          <Search />
          <Account />
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Home