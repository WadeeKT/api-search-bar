import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/Episode.css'
import '../styles/Menu.css'
import croixSVG from "../assets/images/croix.svg";
import reverseImage from "../assets/images/reverse.png";
import arrowDown from "../assets/images/down.png";
import arrowTriangle from "../assets/images/arrowTriangle.svg";
import fullScreenIcon from "../assets/images/fullscreen.svg";
import fullScreenExitIcon from "../assets/images/fullscreenexit.svg";
import lowBatteryIcon from "../assets/images/lowbattery.svg";
import Footer from '../components/Footer'
import Menu from '../components/Menu'
import linksFR from '../scripts/linksFranime';
import linksVF from '../scripts/linksfranimevf';
import persosParE from '../scripts/persosParEp/AUPDATEpersosParEp';
import characterIcon from "../assets/images/character.svg";


function Episode() {

  useEffect(() => {
    document.title = 'One Piece - Episodes'
    const metaDescription = document.querySelector('meta[name="description"]')
    metaDescription.content = 'Retrouvez vos épisodes préférés de One Piece en streaming VOSTFR!'
  }, [])

  const [data, setData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [currentId, setCurrentId] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isLowBattery, setIsLowBattery] = useState(false);
  const [countOpen, setCountOpen] = useState(0);
  const [dataArc, setDataArc] = useState(null);
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    fetch("https://api.api-onepiece.com/arcs")
      .then((res) => res.json())
      .then((data) => {
        setDataArc(data);
      }
    );
  }, [])



  useEffect(() => {
    fetch("https://api.api-onepiece.com/episodes")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setFilteredData(data);
      });
  }, []);

  document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.querySelector(".searchbar");
    searchInput.focus();
  });
  

  const resetSearch = (e) => {
    e.target.style.display = "none";
    document.querySelector(".searchbar").value = "";
    updateFilteredData(data);
  }

  const handleSearch = (e) => {
    let croix = document.querySelector(".croix-croix");
    if (e.target.value === "") {
      croix.style.display = "none";
    } else {
      croix.style.display = "block";
    }
    updateFilteredData(data);
  };

  const clickChangeFilter = (e) => {
    e.target.checked = !e.target.checked;
    if (e.target.checked) {
      e.target.classList.add("filter-checked");
    } else {
      e.target.classList.remove("filter-checked");
    }
    const withnumber = document.getElementById("withnumber");
    const withperso = document.getElementById("withperso");
    const withtitle = document.getElementById("withtitle");
    const withdescription = document.getElementById("withdescription");

    if (!withnumber.checked && !withtitle.checked && !withdescription.checked && !withperso.checked) {
      withnumber.checked = true;
      withnumber.classList.add("filter-checked");
    }

    updateFilteredData(data);
  };

  const dbclickChangeFilter = (e) => {
    e.target.checked = true;
    e.target.classList.add("filter-checked");

    const withnumber = document.getElementById("withnumber");
    const withtitle = document.getElementById("withtitle");
    const withdescription = document.getElementById("withdescription");
    const withperso = document.getElementById("withperso");

    let arr = [withnumber, withtitle, withdescription, withperso];

    arr.forEach((el) => {
      if (!(e.target===el)) {
        el.checked = false;
        el.classList.remove("filter-checked");
      }
    });

    updateFilteredData(data);
  }

  const reverseNum = () => {
    document.querySelector(".reverse-back").checked =
      !document.querySelector(".reverse-back").checked;
    if (document.querySelector(".reverse-back").checked) {
      document.querySelector(".reverse-back").classList.add("reverse-checked");
    } else {
      document
        .querySelector(".reverse-back")
        .classList.remove("reverse-checked");
    }
    updateFilteredData(data);
  };

  const updateFilteredData = (data) => {
    const withnumber = document.getElementById("withnumber");
    const withtitle = document.getElementById("withtitle");
    const withdescription = document.getElementById("withdescription");
    const withperso = document.getElementById("withperso");
    const searchText = document.querySelector(".searchbar").value.toLowerCase().split(" ");
    const reversed = document.querySelector(".reverse-back").checked;

    const filtered = data.filter((dat) => {
      const titleKeywords = withtitle.checked && searchText.every(keyword => dat.title.toLowerCase().includes(keyword));
      const descriptionKeywords = dat.description && withdescription.checked && searchText.every(keyword => dat.description.toLowerCase().includes(keyword));
      const numberKeywords = withnumber.checked && searchText.every(keyword => dat.number.slice(2, dat.number.length).includes(keyword));
      const persoKeywords = persosParE[dat.id] && withperso.checked && searchText.every(keyword =>   Array.isArray(persosParE[dat.id])? persosParE[dat.id].join(' ').toLowerCase().includes(keyword) : false);

      return titleKeywords || descriptionKeywords || numberKeywords || persoKeywords;
    });

    setFilteredData(reversed ? filtered.reverse() : filtered);
  };

  const closePopup = () => {
    document.querySelector(".attention-player").style.display = "none";
    document.querySelector(".attention-player").style.width = "0px";
  }


  const iframeOpen = (e) => {
    if (e.target.classList.contains("mibperso") || e.target.parentElement.classList.contains('mitperso') || e.target.parentElement.parentElement.classList.contains('mitperso') || e.target.parentElement.parentElement.parentElement.classList.contains('mitperso') || e.target.parentElement.parentElement.parentElement.parentElement.classList.contains('mitperso') || e.target.parentElement.parentElement.parentElement.parentElement.parentElement.classList.contains('mitperso') || e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.classList.contains('mitperso') || e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.classList.contains('mitperso') || e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.classList.contains('mitperso') || e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.classList.contains('mitperso') || e.target.parentElement.parentElement.parentElement.parentElement.parentElement.pa) {
      return;
    }
    setCurrentId(e.target.id.toString());
    document.querySelector(".iframe-container").style.display = "flex";
    const chapterContainer = document.querySelector(".chapter-container");
    window.innerWidth <= 1000? chapterContainer.style.width = '100vw' : chapterContainer.style.width = "calc(100% - 500px)";
    const currId = e.target.id.toString();
    verifArrowOnClick(currId);

    const attentionPlayer = document.querySelector(".attention-player");
    setCountOpen(countOpen + 1);
    if (!countOpen) {
      attentionPlayer.style.display = "flex";
      attentionPlayer.style.width = "500px";
      setTimeout(() => {
        attentionPlayer.style.display = "none";
        attentionPlayer.style.width = "0px";
      }, 60000);
      setInterval(() => {
        setCountdown(countdown => countdown - 1);
      }, 1000);
    }
  };

  const closeIframe = () => {
    document.querySelector(".iframe-container").style.display = "none";
    const chapterContainer = document.querySelector(".chapter-container");
    chapterContainer.style.width = "100%";
  };

  const arcFilter = (e) => {
    if (window.innerWidth <= 850) {
      openArcTab()
      openFuncTab()
    }
    
    const reversed = document.querySelector(".reverse-back").checked;
    const arcF = parseInt(e.target.id + e.target.parentElement.id)
    const filtered = data.filter((dat) => {
      return dat.arc_id === arcF
    })
    setFilteredData(reversed ? filtered.reverse() : filtered);
  };

  const openArcTab = () => {
    const headerTome = document.querySelector(".header-tome-tri");
    const tomeContainer = document.querySelector(".tome-select-container");
    headerTome.checked = !headerTome.checked;
    if (headerTome.checked) {
      headerTome.classList.add("arc-checked");
      tomeContainer.style.height = "calc(100vh - 90px)";
    }
    else {
      headerTome.classList.remove("arc-checked");
      tomeContainer.style.height = "0";
    }
  }

  const moreInfoTabAppear = (e) => {
    e.target.nextElementSibling.style.display = "flex";
  }

  const moreInfoTabDisappear = (e) => {
    e.target.nextElementSibling.style.display = "none";
  }

  const mita = (e) => {
    e.target.checked = !e.target.checked;

    if (!e.target.checked) {
      e.target.parentElement.classList.add("mitactive");
    }
    else {
      e.target.parentElement.classList.remove("mitactive");
    }
  }


  const goChapSP = (e) => {
    let arrowPrecedent = document.querySelector(".arrow-precedent");
    let arrowSuivant = document.querySelector(".arrow-suivant");

    if (e.target === arrowPrecedent) {
      setCurrentId((parseInt(currentId) - 1).toString());
    }
    else if (e.target === arrowSuivant) {
      setCurrentId((parseInt(currentId) + 1).toString());
    }

    verifArrow(parseInt(currentId)-1, e);
  }

  const verifArrow = (id, e) => {
    let currID = parseInt(id);
    let arrowPrecedent = document.querySelector(".arrow-precedent");
    let arrowSuivant = document.querySelector(".arrow-suivant");
    if (e.target === arrowPrecedent && currID === 1) {
      arrowPrecedent.style.opacity = "0";
      arrowPrecedent.style.pointerEvents = "none";
    }
    else if (e.target === arrowSuivant && currID === data.length - 1) {
      arrowSuivant.style.opacity = "0";
      arrowSuivant.style.pointerEvents = "none";
    }
    else {
      arrowPrecedent.style.opacity = "100%";
      arrowSuivant.style.opacity = "100%";
      arrowPrecedent.style.pointerEvents = "auto";
      arrowSuivant.style.pointerEvents = "auto";
    }
    document.querySelector(".iframe-chap").focus();
  }

  const verifArrowOnClick = (id) => {
    let currID = parseInt(id);
    let arrowPrecedent = document.querySelector(".arrow-precedent");
    let arrowSuivant = document.querySelector(".arrow-suivant");
    if (currID === 1) {
      arrowPrecedent.style.opacity = "0";
      arrowPrecedent.style.pointerEvents = "none";
      arrowSuivant.style.opacity = "100%";
      arrowSuivant.style.pointerEvents = "auto";
    }
    else if (currID === (data.length - 1)) {
      arrowSuivant.style.opacity = "0";
      arrowSuivant.style.pointerEvents = "none";
      arrowPrecedent.style.opacity = "100%";
      arrowPrecedent.style.pointerEvents = "auto";
    }
    else {
      arrowPrecedent.style.opacity = "100%";
      arrowSuivant.style.opacity = "100%";
      arrowPrecedent.style.pointerEvents = "auto";
      arrowSuivant.style.pointerEvents = "auto";
    }
    document.querySelector(".iframe-chap").focus();

  }

  const fullScreenScript = () => {
    setIsFullScreen(!isFullScreen);
    const iframeContainer = document.querySelector(".iframe-container");
    if (!isFullScreen){
      iframeContainer.classList.add("iframe-fullscreen");
    } else {
      iframeContainer.classList.remove("iframe-fullscreen");
    }
    document.querySelector(".iframe-chap").focus();
  };

  
  const lowBatteryFunc = () => {
    let hBattery = document.querySelector('.header-battery')
    let BatImage = document.querySelector('.image-battery')
    setIsLowBattery(!isLowBattery);
    if (!isLowBattery){
      hBattery.classList.add("header-battery-active");
      BatImage.classList.add("battery-image-active");
    } else {
      hBattery.classList.remove("header-battery-active");
      BatImage.classList.remove("battery-image-active");
    }
  }

  const toNumberString = (st) => {
    const regex = /([0-9]+)/g;
    const found = st.match(regex);
    return found? found.join(", ") : "inconnu";
  }

  const openFuncTab = () => {
    let telFilterContainer = document.querySelector('.tel-filter-container')
    let arrowTelFilter = document.querySelector('.arrow-tel-filter')
    let telFilter = document.querySelector('.tel-filter')
    
    arrowTelFilter.checked = !arrowTelFilter.checked;
    if (arrowTelFilter.checked) {
      telFilterContainer.style.height = "53px";
      telFilter.style.display = "flex";
      arrowTelFilter.style.transform = "rotate(180deg)";
    } else {
      telFilterContainer.style.height = "0";
      telFilter.style.display = "none";
      arrowTelFilter.style.transform = "rotate(0deg)";
    }
  }

  // ----°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-°-----------------------------------------------------------------
  return (
    <div>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,400;0,700;1,300&family=Rubik:wght@400;500;700&display=swap"
        rel="stylesheet"
      />
      {/* polices : Noto Serif, Rubik */}
      <p className='info-beta'>Beta</p>
      <p className='backupannonce'>Note: Certains épisodes affichés en dernier ne sont pas encore sorti ; Désolé pour ce problème.</p>
      <header className="header-container">
        <span onClick={lowBatteryFunc} className="header-battery">
          <img className="image-battery" src={lowBatteryIcon} alt="logo save battery" title="Consommez moins de données avec en activant cette option." />
        </span>
        <span className="header-search">
        <Link className="sous-search" to="/">Rechercher un chapitre</Link>
          <span className="cont-searchbar">
            <input
              type="text"
              className="searchbar"
              onChange={handleSearch}
              placeholder="Numéro, Titre ou Description du de l'épisode.."
            />
            <span className="croix-search">
              <div onClick={resetSearch} className="croix-croix">x</div>
            </span>
            <span className="buttons-search">
              <span onClick={reverseNum} className="reverse-back">
                <img
                  className="button-reverse"
                  src={reverseImage}
                  alt="bouton reverse"
                  title="Trier par ordre décroissant"
                />
              </span>
            </span>
          </span>
          <h5 className="nb-result">
            {filteredData
              ? filteredData.length === 1
                ? "1 épisode trouvé."
                : filteredData.length + " épisodes trouvés."
              : null}
          </h5>
        </span>
        <span className="header-checkbox">
          <div className="sme tri-par">Trier par :</div>
          <div
            title="Trier par numéros des chapitres"
            checked
            onDoubleClick={dbclickChangeFilter}
            onClick={clickChangeFilter}
            className="sme check filter-checked"
            id="withnumber"
          >
            Numéros
          </div>
          <div
            title='Trier par titres des chapitres'
            checked
            onDoubleClick={dbclickChangeFilter}
            onClick={clickChangeFilter}
            className="sme check filter-checked"
            id="withtitle"
          >
            Titres
          </div>
          <div
            title='Trier par descriptions des chapitres'
            checked
            onDoubleClick={dbclickChangeFilter}
            onClick={clickChangeFilter}
            className="sme check filter-checked"
            id="withdescription"
          >
            Descriptions
          </div>
          <div
            title="Trier par personnages présents dans le chapitre"
            checked
            onDoubleClick={dbclickChangeFilter}
            onClick={clickChangeFilter}
            className="sme check filter-checked"
            id="withperso"
          >
            Persos
          </div>
          <div title='Double-cliquez sur la catégorie que vous voulez pour selectionner seulement celle-ci.' className='info-i'>i</div>
        </span>
        <span className="header-tome-tri-container">
          <span onClick={openArcTab} className="header-tome-tri header-tome-tri-pc">
            <span>
              Trier par Arc
            </span>
            <img className="arrow-down" src={arrowDown} alt="flèche vers le bas" />
          </span>
          <div className="tome-select-container">
            <ul className="liste-tome">
              {
                dataArc && dataArc.filter((arc) => {return arc.arc_title!=='Arc Roi acide carbonique'}).map((arc) => {
                  return (
                    <li onClick={arcFilter} id={arc.id} title={arc.arc_title + " : " + arc.arc_description}><b>{arc.arc_title}</b></li>
                  )
                })
              }
            </ul>
          </div>
        </span>
      </header>
      <Menu />

      <div  className="tel-filter-container">
        <img onClick={openFuncTab} className="arrow-tel-filter" src={arrowDown} alt="flèche vers le bas" />
        <div className="tel-filter">
        <Link to="/" activeClassName="active" className="go-to-other">Rechercher des chapitres</Link>
          <span span onClick={reverseNum} className="reverse-back rb-mobile">
            <img
              className="button-reverse br-mobile"
              src={reverseImage}
              alt="bouton reverse"
              title="Trier par ordre décroissant"
            />
          </span>
          <span onClick={openArcTab} className="header-tome-tri htt-tel">
            <span>
              Trier par Arc
            </span>
            <img className="arrow-down ad-tel" src={arrowDown} alt="flèche vers le bas" />
          </span>
        </div>
      </div>

      {/* CHAPTER VISUAL ---------------------------------------------------- */}

      <main className="main-container">
        <div className='attention-player'>
          <img onClick={closePopup} className='img-croix-popup' src={croixSVG} alt='fermer le popup' />
          <p>Mettez un <a className='link-adblock' href="https://chrome.google.com/webstore/detail/ublock-origin/cjpalhdlnbpafiamejdnhcphjbkeiagm" title='uBlock Origin extension'>Ad Blocker</a> ! </p>
          <p>Attention ! Si votre navigateur n'autorise pas la fenêtre, <a target="_blank" rel="noreferrer" href="https://twitter.com/messages/compose?recipient_id=1676561327903457281&text=La%20fenêtre%20d'épisodes%20ne%20marche%20pas,%20Je%20suis%20sur..">faites le moi savoir</a> !</p>
          <p>Fermeture automatique dans {countdown} secondes</p>
        </div>
        {filteredData && (
          <ul className="chapter-container">
            {filteredData.map((dat) => (
              <li onClick={iframeOpen} className="chapter-link">

                <img
                  className="backImage"
                  src={isLowBattery? 'https://miro.medium.com/v2/resize:fit:1200/1*bHiUeH6By-mQ0w8VE87yAA.png' : "https://i.imgur.com/U8Uo4co.png"}
                  alt={"One Piece episode n°" + dat.id.toString()}
                  loading={"lazy"}
                />
                <p className="chapter-number chapter-night">
                  {dat.number.slice(2, dat.number.length)}
                </p>
                <p className="chapter-title chapter-night">{dat.title}</p>
                <p
                  id={dat.number.slice(2, dat.number.length)}
                  className="chapter-description">

                    
                  <div className="more-info-container micperso" id={dat.number.slice(2, dat.number.length)}>
                    <div className="mitperso mitactive" id={dat.number.slice(2, dat.number.length)} >
                      <ul className="listPerso" id={dat.number.slice(2, dat.number.length)}>
                        {
                          Array.isArray(persosParE[dat.id])
                          ? persosParE[dat.id].sort().map((perso) => (<li id={dat.number.slice(2, dat.number.length)}>{perso}</li>)) 
                          : persosParE[dat.id]
                        }
                      </ul>
                      <img className="mibperso" onClick={mita} id={dat.number.slice(2, dat.number.length)} src={characterIcon} alt="Icone de personnage" />
                    </div>
                  </div>


                  <div className="more-info-container">
                    <p className="more-info-button" id={dat.number.slice(2, dat.number.length)} onMouseOut={moreInfoTabDisappear} onMouseOver={moreInfoTabAppear}>i</p>
                    <div className="more-info-tab" id={dat.number.slice(2, dat.number.length)} >
                      <p className="more-info-title">
                        "<i>{dat.title}</i>", Ep. n°{dat.number.slice(2, dat.number.length)}
                      </p>
                      <p className='more-info-title'>
                        {dat.saga_id && <div>Saga n°{dat.saga.saga_number} : "<i>{dat.saga.saga_title}</i>" </div>}
                      </p>
                      <p className='more-info-title'>
                        Sortie le {dat.release_date} il y a {dat.release_date ? Math.floor((new Date() - new Date(dat.release_date)) / (1000 * 60 * 60 * 24 * 30 * 12)) : null} ans.
                      </p>
                      <p className='more-info-title'>
                        Adapte le/les chapitre(s) n° {toNumberString(dat.chapter)} .
                      </p>
                      <p className='more-info-title'></p>

                    </div>
                  </div>
                  <p 
                  id={dat.number.slice(2, dat.number.length)}
                  title={dat.description
                      ? dat.description
                      : "Cet épisode n'a pas de description."}>
                    {dat.description ? dat.description.length <300? dat.description : dat.description.slice(0, 300) + "..." : "Cet épisode n'a pas de description."}
                  </p>
                  <span 
                  id={dat.number.slice(2, dat.number.length)}
                  className="aall-link">
                    <a
                      className="alink color-link"
                      rel="noreferrer"
                      target="_blank"
                      href={
                        linksFR[dat.id]
                      }
                      id={dat.number.slice(2, dat.number.length)}
                    >
                      Voir l'épisode en VOSTFR.
                    </a>
                    <a
                      className="alink nb-link"
                      rel="noreferrer"
                      target="_blank"
                      href={
                        linksVF[dat.id]
                      }
                      id={dat.number.slice(2, dat.number.length)}
                    >
                      Voir l'épisode en VF.
                    </a>
                  </span>
                </p>
              </li>
            ))}
          </ul>
        )}
        <div className="iframe-container">
          <picture onClick={closeIframe} className="close-iframe">
            <img src={croixSVG} className="close-iframe-img" alt="croix" />
          </picture>
          <iframe
            className="iframe-chap iframe-video"
            src={currentId ? linksFR[currentId] : ""}
            title="OnePieceStreaming.tv"
            allowFullScreen
            mozallowfullscreen="true"
            webkitallowfullscreen="true"
          ></iframe>
          <div className="arrows-iframe">
            <img className="arrow-tri arrow-precedent" onClick={goChapSP} title={"Aller à l'épisode " + (parseInt(currentId) - 1).toString()} src={arrowTriangle} alt="Flèche Episode précédent" />
            <img className="arrow-tri arrow-suivant" onClick={goChapSP} title={"Aller à l'épisode " + (parseInt(currentId) + 1).toString()} src={arrowTriangle} alt="Flèche Episode suivant" />
          </div>
          <div className="full-screen-iframe">
            <img className="full-screen-icon" onClick={fullScreenScript} src={isFullScreen? fullScreenExitIcon : fullScreenIcon} alt="Passer en plein écran" title="Plein écran"  />
          </div>
        </div>
      </main>
      <footer>
        <Footer /> 
      </footer>
    </div>
  );
}

export default Episode