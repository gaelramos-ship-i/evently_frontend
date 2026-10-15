import Footer from '../components/Footer'
import FormEvent from '../components/FormEvent'
import Navbar from '../components/Navbar'

function Create() {
    return (
        <>
            <header>
                <div>
                    <a href="/">Event<span>ly</span></a>
                    <Navbar />
                </div>
            </header>
            <main>
                <FormEvent />
            </main>
            <Footer />
        </>
    )
}

export default Create