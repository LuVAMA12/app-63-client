import { Link } from "react-router"

const Home = ()=> {
 return ( 
   <main id="home">
    <section className="welcome-section">
      <div className="welcome-text">
      <h1>Le 63 Restaurant</h1>
      <p>vous souhaite la bienvenue</p>
      </div>
      <div className="buttons">
        <Link to='#' className="button"> Je commande</Link>
        <Link to='#' className="grey-button"> Je réserve</Link>
      </div>
    </section>
    <section  className="story-section">
      <h2>NOTRE HISTOIRE</h2>
      <p>Le restaurant 63 est un ami ! Un ami qui aime partager l’art de bien manger. Son menu change souvent pour vivre avec son temps ! Mais la base reste la même: un bon service, une bonne ambiance et un bon coup  de fourchette. Dans ce restaurant, les gens viennent pour manger mais  surtout pour se faire plaisir avec des produits de qualité à des prix  abordables. Avec son esprit sportif et collectif, le 63 met dans votre  assiette ce qu’il a de mieux dans la boucherie…</p>
    </section>
    </main>
 )
}

export default Home