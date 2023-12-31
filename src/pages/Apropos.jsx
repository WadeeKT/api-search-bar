import React, {useEffect} from 'react'
import '../styles/Home2.css'
import '../styles/Footer.css'
import Footer from '../components/Footer'
import Menu from '../components/Menu'
import '../styles/Menu.css'
import '../styles/Apropos.css'
import Logo from '../components/Logo'
import { NavLink } from 'react-router-dom'

function Apropos() {
  useEffect(() => {
    document.querySelector('body').classList.remove('jeu-body');
    document.querySelector('html').classList.remove('jeu-html');
    document.title = 'One Piece - À propos'
    const metaDescription = document.querySelector('meta[name="description"]')
    metaDescription.content = 'Retrouvez vos épisodes préférés de One Piece en streaming VOSTFR!'
  }, [])
  useEffect(() => {
    const kofiCont = document.querySelector('.kofi-cont')
    const kofiFrame = document.getElementById('kofiframe')
    kofiFrame.addEventListener('mouseover', () => {
      kofiCont.style.bottom = '00px'
    })
    kofiFrame.addEventListener('mouseleave', () => {
      kofiCont.style.bottom = '-570px'
    })
  }
  , [])
  return (
    <div>
        <Logo />
        <Menu />
        <div className='apropos-cont apropos-cont-night'>
            <h1>A propos</h1><br />
            <p>Ce site sert principalement à retrouver vos meilleurs chapitres avec la plus grande précision. Celui-ci n'aurait pas pu voir le jour sans l'API de <a target='_blank' rel='noreferrer' href="https://twitter.com/NathDie1">Nathan DIERICKX</a> : <a target='_blank' rel='noreferrer' href="https://api-onepiece.com">api-onepiece.com</a> </p> <br />
            <p><NavLink to="/">onepiecechapitre.fr</NavLink> sera régulièrement mis à jour. Une idée d'ajout ? <a target='_blank' rel='noreferrer' href="https://twitter.com/messages/compose?recipient_id=1676561327903457281&text=G%20une%20idée%20d'ajout">Contactez-moi sur Twitter</a> !</p> <br />
            <p><b>&nbsp;&nbsp;&nbsp; LÉGAL</b></p>
            <p>J'accorde une grande importance à la confidentialité et à la sécurité des données de l'utilisateurs. Pour garantir une expérience en ligne fluide et sécurisée, j'ai opté pour une approche innovante. Plutôt que de stocker des données sensibles sur notre serveur, j'utilise une méthode différente. Je récupère les informations nécessaires directement à partir de sites tiers réputés et fiables tels que <a target='_blank' rel='noreferrer' href="https://franime.fr">FrAnime.fr</a>, <a target='_blank' rel='noreferrer' href="https://littlexgarden.com/">LittlexGarden.com</a> ou encore <a target='_blank' rel='noreferrer' href="https://ww9.readonepiece.com">readonepiece.com</a>, tout en respectant leurs politiques de confidentialité et leurs droits d'auteur. Cela nous permet de vous offrir un accès à du contenu de qualité sans compromettre la sécurité de vos données personnelles. Vous pouvez ainsi naviguer sur mon site en toute tranquillité, sachant que vos informations ne sont jamais stockées sur quelconque serveur. Je m'engage à maintenir un environnement sécurisé tout en offrant une expérience utilisateur optimale.</p>
            <p>OnePieceChapitres n'héberge aucun lecteur de scan, de vidéo ou d'audio sur son serveur. Contactez directement les plateformes d'hébergement pour toutes réclamations de droits relatifs aux contenus en question.</p>
            <p>Merci encore aux collaborateurs et aux donateurs : Captain Guzman, FrAnime, Laurent D., Little Garden, LU2CI, Myze, Ramon A., VoirAnime <a target='_blank' rel='noreferrer' href="https://franime.fr">FRAnime</a> et <a target='_blank' rel='noreferrer' href="https://littlexgarden.com/">Little Garden</a> pour m'avoir fait confiance sur ce projet ! Je tenais énormément à ce que les sites affiliés soient les plus fiables possibles ; Je pense avoir réussi !</p>
            <p className='invers-p'>Et merci à tous d'avoir été si nombreux à me soutenir lors de l'avancement de cet énorme projet, j'espère qu'il vous plait !</p>
            <p className='invers-p'>Un problème de fonctionnement ? <a target='_blank' rel='noreferrer' href="https://twitter.com/messages/compose?recipient_id=1676561327903457281&text=G%20un%20probleme">Contactez-moi sur Twitter</a> </p>
            <p className='invers-p'><a target="_blank" rel='noreferrer' href="mailto:onepiecechapitres@gmail.com">Me contacter par mail</a>.</p>
        </div>
        <div className='kofi-cont'>
          <iframe className='kofiframe kofi-apropos' id='kofiframe' src='https://ko-fi.com/wadeekt/?hidefeed=true&widget=true&embed=true&preview=true' title='wadeekt'></iframe>
        </div>
        <Footer />
    </div>
  )
}

export default Apropos
