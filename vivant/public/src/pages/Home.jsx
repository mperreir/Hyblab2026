import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCityByCoordinates } from '../../../utils/coordinate';
import { findNearestArticles, getLastArticleDistance } from '../../../utils/dist';
import CityModal from '../components/CityModal';
import ArticleCountModal from '../components/ArticleCountModal';
import './Home.css';
import RoutePoinillee from './../assets/home_illustrations/chemin.svg';
import BgHomePc from './../assets/home_illustrations/bg_home_pc.svg';
import TraitJaune from './../assets/home_illustrations/Trait Jaune.svg';
import Pin2Shadow from './../assets/home_illustrations/Pin 2_shadow.svg';
import Pin2 from './../assets/home_illustrations/Pin 1.svg';
import Local2Shadow from './../assets/home_illustrations/Local 2_shadow.svg';
import Local2 from './../assets/home_illustrations/Local 1-2.svg';
import Article2Shadow from './../assets/home_illustrations/Article 2_shadow.svg';
import Article1 from './../assets/home_illustrations/Article 1.svg';

import { NB_ARTICLES } from '../PathComponent';
import { center } from 'turf';

const SwitchIcon = ({ imgShadow, imgFlat, active, className }) => (
  <div className={`switch-icon relative ${className}`}>
    <img
      src={imgShadow}
      alt=""
      className="switch-icon__img switch-icon__img--shadow w-full h-full object-contain absolute top-0 left-0"
      style={{ opacity: active ? 0 : 1 }}
    />
    <img
      src={imgFlat}
      alt=""
      className="switch-icon__img switch-icon__img--flat w-full h-full object-contain absolute top-0 left-0"
      style={{ opacity: active ? 1 : 0 }}
    />
  </div>
);

// Chaque entrée = un groupe qui apparaît simultanément.
// 'velo' est un marqueur spécial : fait apparaître le personnage/vélo.
const SEQUENCE = [
  ['tiret-14'],
  ['tiret-6'],
  ['tiret-5'],
  ['btn-geo'],                                                  // bouton pres de chez vous
  ['tiret-2'],
  ['tiret-4'],
  ['tiret-17'],
  ['tiret-41', 'tiret-29', 'tiret-33', 'tiret-35', 'tiret-36'], // herbe 1
  ['tiret-24'],
  ['tiret-21'],
  ['btn-ville'],                                                // bouton par une ville
  ['tiret-13'],
  ['tiret-16'],
  ['tiret-15'],
  ['tiret-9'],
  ['tiret-19'],
  ['tiret-7'],
  ['tiret-12'],
  ['btn-article'],                                              // bouton dernier article
  ['tiret-11'],
  ['tiret-10'],
  ['tiret-40', 'tiret-22', 'tiret-27', 'tiret-38'],             // herbe 2
  ['tiret-3'],
  ['tiret-8'],
  ['tiret-20'],
  ['tiret-18', 'tiret-26', 'tiret-32', 'tiret-34'],             // herbe 3
  ['tiret-25'],
  ['tiret-28'],
  ['tiret-30'],
  ['tiret-23'],
  ['__velo__'],                                                 // apparition du vélo
  ['tiret-31'],
  ['tiret-37'],
  ['tiret-1', 'tiret-39'],                                      // points d'interrogation
];

const DELAY_MS = 80;

const SEQUENCE_PC = [
  ['__velo_pc__'],
  ['tiret-pc-1'],
  ['tiret-pc-2'],
  ['tiret-pc-3'],
  ['tiret-pc-4'],
  ['tiret-pc-5'],
  ['tiret-pc-6'],
  ['btn-geo'],
  ['tiret-pc-7'],
  ['tiret-pc-8'],
  ['btn-ville'],
  ['tiret-pc-9'],
  ['tiret-pc-10'],
  ['btn-article'],
  ['tiret-pc-11'],
  ['tiret-pc-12'],
  ['tiret-pc-13'],
  ['tiret-pc-14'],
  ['tiret-pc-15'],
  ['tiret-pc-16'],

];

const Home = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [articles, setArticles] = useState([]);
  const [activeBtn, setActiveBtn] = useState(null);
  const svgContainerRef = useRef(null);
  const svgContainerPcRef = useRef(null);

  const [cityError, setCityError] = useState('');
  const [isModalLoading, setIsModalLoading] = useState(false);
  const modalRef = useRef(null);



  const articleCountRef = useRef(null);
  const pendingActionRef = useRef(null);
  const chosenCountRef = useRef(NB_ARTICLES);

  useEffect(() => {
    fetch('api/articles')
      .then(r => r.json())
      .then((data) => { setArticles(data); })
      .catch(err => console.error('Error fetching articles:', err));
  }, []);

  useEffect(() => {
    const container = svgContainerRef.current;
    const pcContainer = svgContainerPcRef.current;

    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const checkMobileWidth = () => window.innerWidth < 768;
    const isCurrentlyMobile = checkMobileWidth();

    const timers = [];



    if (container && isCurrentlyMobile) {
      fetch(RoutePoinillee)
        .then(r => r.text())
        .then(svgText => {
          container.innerHTML = svgText;

          const svg = container.querySelector('svg');
          if (svg) {
            svg.style.width = '100%';
            svg.style.height = '100%';
          }

          const svgEl = container.querySelector('svg');
          const allGroups = svgEl ? Array.from(svgEl.children).filter(el => el.tagName === 'g') : [];
          const veloGroup = allGroups[0];

          if (veloGroup) {
            veloGroup.style.opacity = '0';
            veloGroup.style.transition = 'opacity 0.4s ease';
          }

          SEQUENCE.flat().forEach(id => {
            if (id === '__velo__') return;
            const el = container.querySelector(`#${id}`) || document.querySelector(`#${id}`);
            if (el) {
              el.style.opacity = '0';
              if (id.startsWith('tiret') || id.startsWith('btn-')) {
                el.style.transform = 'scale(0.5)';
                el.style.transformBox = 'fill-box';
                el.style.transformOrigin = 'center';
              }
              el.style.transition = 'opacity 0.8s ease, transform 0.4s ease';
            }
          });

          SEQUENCE.forEach((group, index) => {
            const t = setTimeout(() => {
              group.forEach(id => {
                if (id === '__velo__') {
                  if (veloGroup) veloGroup.style.opacity = '1';
                  return;
                }
                const el = container.querySelector(`#${id}`) || document.querySelector(`#${id}`);
                if (el) {
                  el.style.opacity = '1';
                  if (id.startsWith('tiret') || id.startsWith('btn-')) {
                    el.style.transform = 'scale(1)';
                  }
                }
              });
            }, index * DELAY_MS);
            timers.push(t);
          });
        })
        .catch(err => console.error('Erreur chargement SVG chemin:', err));
    }

    if (pcContainer && !isCurrentlyMobile) {
      fetch(BgHomePc)
        .then(r => r.text())
        .then(svgText => {
          pcContainer.innerHTML = svgText;
          const svg = pcContainer.querySelector('svg');
          if (svg) {
            svg.classList.add('w-full', 'h-auto', 'absolute', 'top-[0]', 'left-0');
          }

          const veloGroupPc = pcContainer.querySelector('#__velo_pc__');
          if (veloGroupPc) {
            veloGroupPc.style.opacity = '0';
            veloGroupPc.style.transition = 'opacity 0.6s ease';
          }

          SEQUENCE_PC.flat().forEach(id => {
            const el = pcContainer.querySelector(`#${id}`) || document.querySelector(`#${id}`);
            if (el) {
              el.style.opacity = '0';
              if (id.startsWith('tiret-pc-') || id.startsWith('btn-')) {
                el.style.transform = 'scale(0.5)';
                el.style.transformBox = 'fill-box';
                el.style.transformOrigin = 'center';
              }
              el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            }
          });

          SEQUENCE_PC.forEach((group, index) => {
            const t = setTimeout(() => {
              group.forEach(id => {
                if (id === '__velo_pc__') {
                  if (veloGroupPc) veloGroupPc.style.opacity = '1';
                  return;
                }
                const el = pcContainer.querySelector(`#${id}`) || document.querySelector(`#${id}`);
                if (el) {
                  el.style.opacity = '1';
                  if (id.startsWith('tiret-pc-') || id.startsWith('btn-')) {
                    el.style.transform = 'scale(1)';
                  }
                }
              });
            }, index * DELAY_MS);
            timers.push(t);
          });
        })
        .catch(err => console.error('Erreur chargement SVG PC:', err));
    }

    return () => {
      window.removeEventListener('resize', checkMobile);
      timers.forEach(clearTimeout);
    };
  }, [isMobile]);

  const handlePress = (btnId, action) => {
    setActiveBtn(btnId);
    setTimeout(() => {
      setActiveBtn(null);
      pendingActionRef.current = action;
      articleCountRef.current?.showModal();
    }, 600);
  };

  const handleArticleCountConfirm = (count) => {
    chosenCountRef.current = count;
    if (pendingActionRef.current) {
      pendingActionRef.current(count);
      pendingActionRef.current = null;
    }
  };

  const handleGeolocation = (nbArticles = NB_ARTICLES) => {
    if (!navigator.geolocation) {
      alert("La géolocalisation n'est pas supportée par votre navigateur.");
      navigate('/carte', { state: { hasCity: false } });
      return;
    }
    setIsLoadingLocation(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const cityName = await getCityByCoordinates(
            position.coords.latitude,
            position.coords.longitude
          );
          const centre = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          const nearestArticles = findNearestArticles(articles, centre, nbArticles);
          const lastDist = getLastArticleDistance(nearestArticles, centre);
          setIsLoadingLocation(false);
          navigate('/carte', {
            state: {
              hasCity: true,
              lat: position.coords.latitude,
              long: position.coords.longitude,
              name: cityName || 'Votre position',
              articles: nearestArticles,
              allArticles: articles,
              lastArticleDist: lastDist,
              nbArticles,
            },
          });
        } catch {
          setIsLoadingLocation(false);
          navigate('/carte', { state: { hasCity: false, articles, allArticles: articles } });
        }
      },
      () => {
        setIsLoadingLocation(false);
        navigate('/carte', { state: { hasCity: false, articles, allArticles: articles } });
      }
    );
  };

  const handleLastArticle = async (nbArticles = NB_ARTICLES) => {
    if (!articles || articles.length === 0) {
      navigate('/carte', { state: { hasCity: false, articles, allArticles: articles } });
      return;
    }

    let lat = null;
    let long = null;
    const firstArticle = articles[0];

    if (firstArticle._latlngmarker) {
      try {
        const marker = JSON.parse(firstArticle._latlngmarker);
        if (marker.latitude && marker.longitude) {
          lat = parseFloat(marker.latitude);
          long = parseFloat(marker.longitude);
        }
      } catch (e) {
        console.error('Erreur parsing latlngmarker pour le dernier article');
      }
    }

    const cityName = await getCityByCoordinates(lat, long);

    if (lat !== null && long !== null) {
      const centre = { latitude: lat, longitude: long };
      const nearestArticles = findNearestArticles(articles, centre, nbArticles);
      const lastDist = getLastArticleDistance(nearestArticles, centre);
      navigate('/carte', {
        state: {
          hasCity: true,
          lat,
          long,
          name: cityName || 'Dernier article',
          articles: nearestArticles,
          allArticles: articles,
          lastArticleDist: lastDist,
          nbArticles,
        },
      });
    } else {
      navigate('/carte', { state: { hasCity: false, articles, allArticles: articles } });
    }
  };

  const handleCitySubmit = ({ name, lat, lng }) => {
    const nbArticles = chosenCountRef.current || NB_ARTICLES;
    setCityError('');
    setIsModalLoading(true);
    try {
      const centre = { latitude: lat, longitude: lng };
      const nearest = findNearestArticles(articles, centre, nbArticles);
      const lastDist = getLastArticleDistance(nearest, centre);

      setIsModalLoading(false);
      modalRef.current?.close();

      navigate('/carte', {
        state: {
          hasCity: true,
          lat,
          long: lng,
          name,
          articles: (nearest && nearest.length > 0) ? nearest : articles,
          allArticles: articles,
          lastArticleDist: (nearest && nearest.length > 0) ? lastDist : null,
          nbArticles,
        },
      });
    } catch (err) {
      console.error('Erreur de calcul :', err);
      setCityError('Erreur de calcul.');
      setIsModalLoading(false);
    }
  };

  return (
    <>
      <div className="home-page transition-all duration-300" style={{ alignItems: isMobile ? 'center' : 'flex-start' }}>

        {/* Desktop Background SVG */}
        {!isMobile && (
          <div
            ref={svgContainerPcRef}
            className="fixed xl:top-[34vh] left-0 w-full pointer-events-none z-0"
          />
        )}

        <div className="xl:text-left text-center xl:text-[2.5vw] text-xl mb-2 relative z-10 xl:whitespace-nowrap xl:w-full">
          <h1>
            Comment voulez-vous {isMobile && <br />}
            démarrer votre{" "}
            <span className="relative inline-block">
              exploration
              <img
                src={TraitJaune}
                alt=""
                className="absolute left-0 top-[-7px] xl:top-[-0.36vw] w-full"
              />
            </span>{" "}
            ?
          </h1>
        </div>

        <div
          className="home-buttons-col flex flex-col items-center gap-[15px] w-full max-w-[320px] relative z-10 overflow-visible mt-[15px] 
          xl:mt-0 xl:fixed xl:w-full xl:max-w-none xl:flex-row xl:top-[25vh] xl:justify-center xl:gap-[3.25vw] xl:pt-[2vw]"
        >

          {/* Mobile Path SVG */}
          {isMobile && (
            <div
              ref={svgContainerRef}
              className="route-svg"
              aria-hidden="true"
            />
          )}

          <button
            id="btn-geo"
            className="home-btn flex-1 max-w-[200px] xl:max-w-[14.5vw] xl:translate-y-[1.6vw]"
            onClick={() => handlePress('geo', handleGeolocation)}
            disabled={isLoadingLocation}
            style={{ position: 'relative', zIndex: 1 }}
          >
            {isLoadingLocation ? (
              <span className="loading loading-spinner loading-lg w-[35px] h-[35px] xl:w-[3.6vw] xl:h-[3.6vw]" />
            ) : (
              <SwitchIcon
                imgShadow={Local2Shadow}
                imgFlat={Local2}
                active={activeBtn === 'geo'}
                className="w-[70px] h-[70px] xl:w-[8.33vw] xl:h-[8.33vw]"
              />
            )}
            <span className="text-sm xl:text-[1.15vw] xl:mt-[1.25vw] font-bold text-center leading-snug">Près de chez vous</span>
          </button>

          <button
            id="btn-ville"
            className="home-btn flex-1 max-w-[200px] xl:max-w-[14.5vw] xl:-translate-y-[1.2vw]"
            onClick={() => handlePress('ville', () => modalRef.current?.showModal())}
            style={{ position: 'relative', zIndex: 1 }}
          >
            <SwitchIcon
              imgShadow={Pin2Shadow}
              imgFlat={Pin2}
              active={activeBtn === 'ville'}
              className="w-[70px] h-[70px] xl:w-[8.33vw] xl:h-[8.33vw]"
            />
            <span className="text-sm xl:text-[1.15vw] xl:mt-[1.25vw] font-bold text-center leading-snug">Par une ville de notre région</span>
          </button>

          <button
            id="btn-article"
            className="home-btn flex-1 max-w-[200px] xl:max-w-[14.5vw] xl:translate-y-[1.6vw]"
            onClick={() => handlePress('article', handleLastArticle)}
            style={{ position: 'relative', zIndex: 1 }}
          >
            <SwitchIcon
              imgShadow={Article2Shadow}
              imgFlat={Article1}
              active={activeBtn === 'article'}
              className="w-[70px] h-[70px] xl:w-[8.33vw] xl:h-[8.33vw]"
            />
            <span className="text-sm xl:text-[1.15vw] xl:mt-[1.25vw] font-bold text-center leading-snug">
              Depuis la localisation de {isMobile && <br />}notre dernier article
            </span>
          </button>

        </div>
      </div>

      <CityModal
        isOpen={false}
        cityError={cityError}
        isLoading={isModalLoading}
        nArticles={NB_ARTICLES}
        onSubmit={handleCitySubmit}
        onSkip={() => {
          modalRef.current?.close();
          navigate('/carte', { state: { hasCity: false, articles, allArticles: articles } });
        }}
        modalRef={modalRef}
      />

      <ArticleCountModal
        modalRef={articleCountRef}
        defaultCount={NB_ARTICLES}
        onConfirm={handleArticleCountConfirm}
      />
    </>
  );
};

export default Home;