import { Link } from "react-router"

const Home = ()=> {
 return ( 
   <main id="home">
    <section className="hello-section">
      <div>
      <h1>Le 63 Restaurant</h1>
      <p>vous souhaite la bienvenue</p>
      </div>
      <div className="buttons">
      <Link to='#' className="button"> Je commande</Link>
      </div>
    </section>
    </main>
 )
}

export default Home