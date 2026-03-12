import Manuscrit from "../components/infographie/Manuscrit";
import Quote from "../components/question/quote";
import Timeline from "../components/infographie/Timeline";
import DoughnutChart from "../components/infographie/DoughnutChart";
import {DropZone, AnswerBank} from "../components/infographie/Puzzle";
import RepartitionDynamique from "../components/infographie/RepartitionDynamique";

const PATH_PUBLIC = import.meta.env.DEV ? '.' : './public';

const debateData = {
  "meta": {
    "serie": "contrevoix",
    "titre": "Le scrutin proportionnel est-il un remède à la crise démocratique ?",
    "date": "11 octobre 2024",
    "thematique": "Vie démocratique",
    "chapeau": "Entre représentativité du corps électoral et stabilité gouvernementale, faut-il choisir ? C'est habituellement sous ce dilemme que l'on présente le débat entre scrutin proportionnel et scrutin majoritaire. Le contexte politique lui donne une actualité renouvelée depuis la dissolution de l'Assemblée nationale, alors que Michel Barnier, dans son discours de politique générale, s'est dit ouvert à une « réflexion sur le sujet ». Le scrutin proportionnel peut-il répondre à la crise démocratique que traverse notre pays ? Entre enjeu démocratique de fond et tactique politique habile, la réforme du mode de scrutin doit-elle être mise à l'agenda ?",
    "credits": "Propos recueillis par Hortense Miginiac",
    "intervenants": [
      {
        "id": "morel",
        "nom": "Benjamin Morel",
        "titre": "Maître de conférences en droit public à l'Université Paris II Panthéon-Assas"
      },
      {
        "id": "levade",
        "nom": "Anne Levade",
        "titre": "Constitutionnaliste, professeure de droit public à l'Université Paris 1 Panthéon-Sorbonne"
      }
    ]
  },
  "accroches": [
    "Entre représentativité et stabilité, faut-il vraiment choisir ?",
    "Six formations au Bundestag avec la proportionnelle. Onze à l'Assemblée nationale avec le scrutin majoritaire.",
    "+7 points de participation. +12 chez les jeunes. La proportionnelle change la donne.",
    "Mille formules de proportionnelle existent. Aucune ne fait l'unanimité.",
    "La crise n'est pas politique. Elle est démocratique.",
    "Deux visions du pouvoir. Un seul choix de société."
  ],
  "accrocheImages": [
    "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=1200&q=80",
    "https://images.unsplash.com/photo-1494172961521-33799ddd43a5?w=1200&q=80",
    "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=1200&q=80",
    "https://images.unsplash.com/photo-1577415124269-fc1140354569?w=1200&q=80",
    "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=1200&q=80",
    "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200&q=80"
  ],
  "podcast": {
      "episode": "EP 3 : Le scrutin proportionnel est-il un remède à la crise démocratique ?",
      "title": "Avec Benjamin MOREL et Anne LEVADE",
      "cover": `${PATH_PUBLIC}/img/carte_article.png`
  },
  "questions": [
    {
      "question": "Le scrutin proportionnel",
      "color": "#00483B",
      "textcolor": "#C6F9E6",
      "dialogue": [
        {
          "intervenant": "morel",
          "contenu": [
            <Quote
              photo={`${PATH_PUBLIC}/img/1.png`}
              quote="Pour donner un peu de contexte, la France a déjà appliqué le principe du scrutin proportionnel <b>entre 1946 et 1958.</b>"
              isLeft={true}
            />,
            <Timeline className="mx-auto w-fit mb-6" />,
            <>Le général de Gaulle fit donc le choix d'en revenir au vieux mode de scrutin en place depuis le <Manuscrit>Second Empire</Manuscrit> et qui avait dominé sous la <Manuscrit surrounded={false}>IIIe République</Manuscrit> : le scrutin majoritaire à deux tours, qui lui offrit une majorité absolue à partir de 1962.</>
            ]
        },
        {
          "intervenant": "levade",
          "contenu": [
            <Quote
              photo={`${PATH_PUBLIC}/img/2.png`}
              quote="J'ajouterai à cela que <b>De Gaulle est d'abord favorable à la proportionnelle</b> sous la IVe, qu'il perçoit comme un <b>moyen de contenir le Parti communiste.</b>"
              isLeft={false}
            />,
            <><Manuscrit>La proportionnelle</Manuscrit> est le mode de scrutin "le plus récent". Il s'est développé à la naissance des partis, à la fin du <DropZone correctAnswer="XIX" /> siècle.</>,
            <AnswerBank answers={["XVIII", "XIX", "XX"]} />,
            <>Avant cela, les programmes reposaient avant tout sur <Manuscrit surrounded={false}>une personne</Manuscrit>. Ainsi, le mode de scrutin et la structuration des partis influent l'un sur l'autre. Et il s'agit toujours d'un processus au <Manuscrit surrounded={false}>long cours</Manuscrit>.</>,
          ]
        },
      ]
    },
    {
      "question": "Une réponse à la crise politique",
      "color": "#C6F9E6",
      "textcolor": "#00483B",
      "dialogue": [
        {
          "type": "interlocuteur2",
          "intervenant": "levade",
          "contenu": [
            <Quote
              photo={`${PATH_PUBLIC}/img/2.png`}
              quote="Face à la crise politique que nous traversons, on peut penser que le scrutin proportionnel permet de lutter contre la dislocation des grands partis politiques qui empêchent l'émergence d'une majorité gouvernementale."
              isLeft={ false }
            />,
            "Pourtant, obliger les partis politique à s'allier ne facilite pas forcément l'émergence d'un programme politique solide.",
            "L'idée d'un scrutin proportionnel revient souvent dans le débat, mais souvent sans rentrer dans le détail des modalités."
          ],
        },
        {
          "type": "interlocuteur1",
          "intervenant": "morel",
          "contenu": [
            <Quote
              photo={`${PATH_PUBLIC}/img/1.png`}
              quote="Il n'est pas certain que la proportionnelle déstructure le système de partis. Si l'on compare avec d'autres démocraties libérales, où la proportionnelle est appliquée, on constate que la décomposition du paysage politique est tout autant sensible."
              isLeft={ true }
            />,
            "Par exemple, au Bundestag, le mode de scrutin est proportionnel et six formations politiques sont représentées.",
            "À l'Assemblée nationale française, où le scrutin majoritaire prévaut, elles sont au nombre de onze.",
            "Le débat est donc souvent caricatural, d'autant plus que les effets du scrutin proportionnel dépendent largement de ses modalités d'application.",
            "Par exemple, au Bundestag, le mode de scrutin est proportionnel et six formations politiques sont représentées.",
            "À l'Assemblée nationale française, où le scrutin majoritaire prévaut, elles sont au nombre de onze.",
            "Le débat est donc souvent caricatural, d'autant plus que les effets du scrutin proportionnel dépendent largement de ses modalités d'application."
            ]
        },
        {
          "type": "interlocuteur2",
          "intervenant": "levade",
          "contenu": [
            <Quote
              photo={`${PATH_PUBLIC}/img/2.png`}
              quote="Certes, mais le mode de scrutin ne suffit pas à structurer la vie politique, et c'est là que l'observation comparée des systèmes politiques et constitutionnels montre ses limites."
              isLeft={ false }
            />,
            "On ne peut pas se baser sur des exemples étrangers pour anticiper les résultats en France, ni convertir un scrutin majoritaire pour imaginer un résultat en scrutin proportionnel. Par ailleurs, la France pratique le scrutin proportionnel lors de certaines élections, comme les européennes."
          ],
        }
      ]
    },
    {
      "question": "Différences de scrutins",
      "color": "#A4BAE8",
      "textcolor": "#4657C6",
      "dialogue": [
        {
          "intervenant": "levade",
          "contenu": [
            <Quote
              photo={`${PATH_PUBLIC}/img/2.png`}
              quote="Il n'existe en effet pas une mais des formes de scrutin proportionnel."
              isLeft={ false }
            />,
            "En surface, c'est simple : un parti reçoit un nombre de sièges proportionnel aux voix obtenus. Mais c'est une véritable ingénierie électorale qui se cache derrière ce terme.",
            "Différentes proportionnelles existent en fonction des variables suivantes :",
            <RepartitionDynamique />,
          ],
        },
        {
          "intervenant": "morel",
          "contenu": [
            <Quote
              photo={`${PATH_PUBLIC}/img/1.png`}
              quote="Je suis d'accord avec vous, le comportement électoral est très variable selon les modes de scrutin."
              isLeft={ true }
            />,
            "L'espace politique est fracturé par une polarisation grandissante : ",
            <DoughnutChart
              className="mx-auto my-8"
              segments={[
                { label: 'LFI', percentage: 12, color: '#E3F280' },
                { label: '', percentage: 63, color: '#D2D2D2' },
                { label: 'RN', percentage: 25, color: '#A4BAE8' },
              ]}
            />,
          "Pour ces partis, les alliances sont difficiles. Comme sous la IVe République, nous serions donc condamnés à gouverner avec les partis centristes.",
          <Quote
              photo={`${PATH_PUBLIC}/img/1.png`}
              quote="Avec le scrutin proportionnel, le Président de la République ne peut annoncer de réforme sans savoir s'il aura une majorité pour le soutenir. 
              </br></br>Nous sommes confrontés à une bataille d'intérêts sur la vision du régime : s'agit-il d'obtenir une majorité absolue soumise à un chef ou de mettre en place un régime plus parlementaire ? "
              isLeft={ true }
            />,
          ]
        },
        {
          "intervenant": "levade",
          "contenu": [
            <Quote
              photo={`${PATH_PUBLIC}/img/2.png`}
              quote="La culture politique française est à l'évidence différente d'autres pays et sans doute davantage présidentialiste que nos voisins européens ! 
              </br></br>Une culture politique se forge dans le temps long et suppose une réadaptation progressive et permanente aux événements. 
              </br></br>Si l'on passe à une VIe République avec scrutin proportionnel, il y a fort à parier que cela n'apportera aucune solution à la crise démocratique profonde que nous traversons désagrégation des forces politiques, déficit, etc. "
              isLeft={ false }
            />,
          ],
        }
      ]
    },
    {
        "question": "Avantages / Inconvénients",
        "color": "#4657C6",
        "textcolor": "#A4BAE8",
        "dialogue": [
        {
          "intervenant": "morel",
          "contenu": [
            <Quote
              photo={`${PATH_PUBLIC}/img/1.png`}
              quote="Il nous faut d'abord établir un objectif, puis réfléchir aux moyens à mettre en œuvre."
              isLeft={ true }
            />,
            "Cherche-t-on à instaurer un régime plus parlementaire ? Une meilleure représentativité ? Davantage de stabilité politique ?",
            <Quote
              photo={`${PATH_PUBLIC}/img/1.png`}
              quote="C'est pourquoi je préconise des améliorations à l'intérieur du système actuel, en passant simplement par une loi ordinaire."
              isLeft={ true }
            />
          ]
        },
        {
          "intervenant": "levade",
          "contenu": [
            <Quote
              photo={`${PATH_PUBLIC}/img/2.png`}
              quote="La crise actuelle n'est pas tant politique que démocratique. Dans ce contexte, se précipiter de remettre en cause les institutions me paraît particulièrement dangereux."
              isLeft={ false }
            />,
            "Si le résultat de la proportionnelle suscite l'insatisfaction, comme c'est probable, la contestation sera encore aggravée.",
            "Ce n'est pas \"le système\" qui est défaillant et interdit la formation de coalitions, mais la structuration politique qui fait défaut : le débat est dysfonctionnel, les politiques semblent déconnectés du réel et on voit une crise de la représentativité."
          ],
        }
      ]
    },
    {
      "question": "Quels impactes pour le RN ?",
      "color": "#FFDED6",
      "textcolor": "#EB5D31",
      "dialogue": [
        {
          "intervenant": "morel",
          "contenu": [
            <Quote
              photo={`${PATH_PUBLIC}/img/1.png`}
              quote="Pendant des années, le Rassemblement national n'a pas proposé de vision structurée ou de programme concret en matière institutionnelle, hormis son engagement constant en faveur de la proportionnelle."
              isLeft={ true }
            />,
            "Il y est toujours favorable et préconise désormais une version avec une prime majoritaire, qui lui permettrait d'obtenir une majorité absolue. Avec une prime de 15-20 %, le RN pourrait espérer gouverner sous ses seules couleurs."
           ]
        },
        {
          "intervenant": "levade",
          "contenu": [
            <Quote
              photo={`${PATH_PUBLIC}/img/2.png`}
              quote="Peut-être faudrait-il faire intervenir un élément de psychologie, ou plus exactement de stratégie politique, et questionner la volonté effective du RN d'arriver au pouvoir."
              isLeft={ false }
            />,
            "La représentation proportionnelle lui garantit : de ne pas obtenir une majorité absolue embarrassante pour un parti qui ne veut pas gouverner tout de suite, pour en être mieux capable à terme. Il désactive le front républicain, ou ce qu'il en reste, et facilite donc l'ascension du Rassemblement National." 
          ]
        }
      ]
    }
  ],
  "endQuestions": [
    {
      question: "Pensez-vous que la proportionnelle serait bénéfique pour la représentation ?",
      options: [
        "Absolument, c'est la meilleure solution",
        "Plutôt oui, avec quelques ajustements",
        "Neutre, ça dépend du contexte",
        "Plutôt non, le système actuel fonctionne mieux",
        "Pas du tout, c'est une mauvaise idée"
      ]
    },
    {
      question: "Quelle est votre plus grande préoccupation avec cette réforme ?",
      options: [
        "Je n'ai pas de préoccupation majeure",
        "Les citoyens pourraient être confus par le changement",
        "Les coûts politiques seraient trop élevés",
        "Les petits partis auraient trop de pouvoir",
        "La stabilité gouvernementale pourrait être compromise"
      ]
    },
    {
      question: "Seriez-vous en faveur d'une transition progressive ?",
      options: [
        "Oui, c'est la meilleure approche",
        "Peut-être, si les détails sont bien pensés",
        "J'hésite, c'est compliqué",
        "Plutôt un changement complet si c'est nécessaire",
        "Non, maintenons le statu quo"
      ]
    }
  ]
};

export default debateData;