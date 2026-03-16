import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCityByCoordinates } from '../../../utils/coordinate';
import { findNearestArticles, getLastArticleDistance } from '../../../utils/dist';
import CityModal from '../components/CityModal';
import './Home.css';
import RoutePoinillee from './../assets/home_illustrations/chemin.svg';
import TraitJaune from './../assets/home_illustrations/Trait Jaune.svg';
import Pin2Shadow from './../assets/home_illustrations/Pin 2_shadow.svg';
import Pin2 from './../assets/home_illustrations/Pin 1.svg';
import Local2Shadow from './../assets/home_illustrations/Local 2_shadow.svg';
import Local2 from './../assets/home_illustrations/Local 1-2.svg';
import Article2Shadow from './../assets/home_illustrations/Article 2_shadow.svg';
import Article1 from './../assets/home_illustrations/Article 1.svg';

import { NB_ARTICLES } from '../test';

const SwitchIcon = ({ imgShadow, imgFlat, active, size = 70 }) => (
  <div className="switch-icon" style={{ width: size, height: size }}>
    <img
      src={imgShadow}
      alt=""
      width={size}
      height={size}
      className="switch-icon__img switch-icon__img--shadow"
      style={{ opacity: active ? 0 : 1 }}
    />
    <img
      src={imgFlat}
      alt=""
      width={size}
      height={size}
      className="switch-icon__img switch-icon__img--flat"
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

const Home = () => {
  const navigate = useNavigate();

  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [articles, setArticles] = useState([]);
  const [activeBtn, setActiveBtn] = useState(null);
  const svgContainerRef = useRef(null);

  const [cityError, setCityError] = useState('');
  const [isModalLoading, setIsModalLoading] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    fetch('/vivant/api/articles')
      .then(r => r.json())
      .then((data) => { setArticles(data); })
      .catch(err => console.error('Error fetching articles:', err));
  }, []);

  // ── Fetch SVG, injection inline, animation dans l'ordre de SEQUENCE ──
  useEffect(() => {
    const container = svgContainerRef.current;
    if (!container) return;

    const timers = [];

    fetch(RoutePoinillee)
      .then(r => r.text())
      .then(svgText => {
        container.innerHTML = svgText;

        const svg = container.querySelector('svg');
        if (svg) {
          svg.style.width = '100%';
          svg.style.height = '100%';
        }

        // Le premier <g> contient le personnage/vélo
        const svgEl = container.querySelector('svg');
        const allGroups = svgEl ? Array.from(svgEl.children).filter(el => el.tagName === 'g') : [];
        const veloGroup = allGroups[0]; // premier g = vélo

        if (veloGroup) {
          veloGroup.style.opacity = '0';
          veloGroup.style.transition = 'opacity 0.4s ease';
        }

        // Initialement, on masque tout ce qui est dans la séquence
        SEQUENCE.flat().forEach(id => {
          if (id === '__velo__') return;
          // On cherche dans l'élément SVG injecté OU dans son parent direct (pour les boutons)
          const el = container.querySelector(`#${id}`) || container.parentElement.querySelector(`#${id}`);
          if (el) {
            el.style.opacity = '0';
            if (id.startsWith('tiret')) {
              el.style.transform = 'scale(0.5)';
              el.style.transformBox = 'fill-box';
              el.style.transformOrigin = 'center';
            }
            el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
          }
        });

        // Déclencher chaque étape
        SEQUENCE.forEach((group, index) => {
          const t = setTimeout(() => {
            group.forEach(id => {
              if (id === '__velo__') {
                if (veloGroup) veloGroup.style.opacity = '1';
                return;
              }
              const el = container.querySelector(`#${id}`) || container.parentElement.querySelector(`#${id}`);
              if (el) {
                el.style.opacity = '1';
                if (id.startsWith('tiret')) {
                  el.style.transform = 'scale(1)';
                }
              }
            });
          }, index * DELAY_MS);
          timers.push(t);
        });
      })
      .catch(err => console.error('Erreur chargement SVG chemin:', err));

    return () => timers.forEach(clearTimeout);
  }, []);

  const handlePress = (btnId, action) => {
    setActiveBtn(btnId);
    setTimeout(() => {
      setActiveBtn(null);
      action();
    }, 600);
  };

  const handleGeolocation = () => {
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
          const nearestArticles = findNearestArticles(articles, centre, NB_ARTICLES);
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

  const handleLastArticle = async () => {
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
      const nearestArticles = findNearestArticles(articles, centre, NB_ARTICLES);
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
        },
      });
    } else {
      navigate('/carte', { state: { hasCity: false, articles, allArticles: articles } });
    }
  };

  const handleCitySubmit = ({ name, lat, lng }) => {
    setCityError('');
    setIsModalLoading(true);
    try {
      const centre = { latitude: lat, longitude: lng };
      const nearest = findNearestArticles(articles, centre, NB_ARTICLES);
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
      <div className="home-page transition-all duration-300">

        {/* ── Titre ── */}
        <div className="text-center text-xl mb-2">
          <h1>
            Comment voulez-vous<br />
            démarrer votre{" "}
            <span className="relative inline-block">
              exploration
              <img
                src={TraitJaune}
                alt=""
                className="absolute left-0 top-[-7px] w-full"
              />
            </span>{" "}
            ?
          </h1>
        </div>

        {/* ── Colonne de boutons ── */}
        <div
          className="home-buttons-col"
          style={{ position: 'relative', width: '100%' }}
        >

          {/* ── SVG route injecté inline via fetch ── */}
          <div
            ref={svgContainerRef}
            className="route-svg"
            aria-hidden="true"
          />

          {/* ── Bouton 1 : Près de chez vous ── */}
          <button
            id="btn-geo"
            className="home-btn"
            onClick={() => handlePress('geo', handleGeolocation)}
            disabled={isLoadingLocation}
            style={{ position: 'relative', zIndex: 1 }}
          >
            {isLoadingLocation ? (
              <span className="loading loading-spinner loading-lg" style={{ width: 35, height: 35 }} />
            ) : (
              <SwitchIcon
                imgShadow={Pin2Shadow}
                imgFlat={Pin2}
                active={activeBtn === 'geo'}
              />
            )}
            <span className="text-sm">Près de chez vous</span>
          </button>

          {/* ── Bouton 2 : Par une ville ── */}
          <button
            id="btn-ville"
            className="home-btn"
            onClick={() => handlePress('ville', () => modalRef.current?.showModal())}
            style={{ position: 'relative', zIndex: 1 }}
          >
            <SwitchIcon
              imgShadow={Local2Shadow}
              imgFlat={Local2}
              active={activeBtn === 'ville'}
            />
            <span className="text-sm">Par une ville de notre région</span>
          </button>

          {/* ── Bouton 3 : Dernier article ── */}
          <button
            id="btn-article"
            className="home-btn"
            onClick={() => handlePress('article', handleLastArticle)}
            style={{ position: 'relative', zIndex: 1 }}
          >
            <SwitchIcon
              imgShadow={Article2Shadow}
              imgFlat={Article1}
              active={activeBtn === 'article'}
            />
            <span className="text-sm">
              Depuis la localisation de<br />notre dernier article
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
    </>
  );
};

export default Home;