import Manuscrit from "../components/infographie/Manuscrit";
import Quote from "../components/question/quote";
import Timeline from "../components/infographie/Timeline";
import DoughnutChart from "../components/infographie/DoughnutChart";
import {DropZone, AnswerBank} from "../components/infographie/Puzzle";
import RepartitionDynamique from "../components/infographie/RepartitionDynamique";

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
    <>Entre représentativité et stabilité, faut-il vraiment choisir ?</>,
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
      "cover": "/img/carte_article.png"
  },
  "questions": [
    {
      "question": "Le scrutin proportionnel",
      "color": "#00483B",
      "textcolor": "#C6F9E6",
      "dialogue": [
        {
          "type": "interlocuteur1",
          "intervenant": "morel",
          "contenu": [
            <Quote
              photo="/img/1.png"
              quote="Pour donner un peu de contexte, la France a déjà appliqué le principe du scrutin proportionnel <b>entre 1946 et 1958.</b>"
              isLeft={true}
            />,
            <Timeline className="mx-auto w-fit mb-6" />,
            <p>Le général de Gaulle fit donc le choix d'en revenir au vieux mode de scrutin en place depuis le <Manuscrit>Second Empire</Manuscrit> et qui avait dominé sous la <Manuscrit surrounded={false}>IIIe République</Manuscrit> : le scrutin majoritaire à deux tours, qui lui offrit une majorité absolue à partir de 1962.</p>
            ]
        },
        {
          "type": "interlocuteur2",
          "intervenant": "levade",
          "contenu": [
            <Quote
              photo="/img/2.png"
              quote="J'ajouterai à cela que <b>De Gaulle est d'abord favorable à la proportionnelle</b> sous la IVe, qu'il perçoit comme un <b>moyen de contenir le Parti communiste.</b>"
              isLeft={false}
            />,
            <>Le général de Gaulle fit donc le choix d'en revenir au scrutin majoritaire à deux tours,<DropZone correctAnswer="XIX" /> qui offrit une majorité absolue à partir de 1962. Comme le mode de scrutin avait été la variable d'ajustement sous la IIIe République, les législateurs conservèrent cette souplesse en ne l'inscrivant pas dans la Constitution.</>,
            <AnswerBank answers={["XVIII", "XIX", "XX"]} />,
            "Avant cela, les programmes reposaient avant tout sur une personne.",
            "Ainsi, le mode de scrutin et la structuration des partis influent l'un sur l'autre. Et il s'agit toujours d'un processus au long cours.",
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
              photo="/img/2.png"
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
              photo="/img/1.png"
              quote="Il n'est pas certain que la proportionnelle déstructure le système de partis. Si l'on compare avec d'autres démocraties libérales, où la proportionnelle est appliquée, on constate que la décomposition du paysage politique est tout autant sensible."
              isLeft={ true }
            />,
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
              photo="/img/2.png"
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
          "type": "interlocuteur2",
          "intervenant": "levade",
          "contenu": [
            <Quote
              photo="/img/2.png"
              quote="Il n'existe en effet pas une mais des formes de scrutin proportionnel."
              isLeft={ false }
            />,
            "En surface, c'est simple : un parti reçoit un nombre de sièges proportionnel aux voix obtenus. Mais c'est une véritable ingénierie électorale qui se cache derrière ce terme.",
            "Différentes proportionnelles existent en fonction des variables suivantes :",
            <RepartitionDynamique />,
          ],
        },
        {
          "type": "interlocuteur1",
          "intervenant": "morel",
          "contenu": [
            <Quote
              photo="/img/1.png"
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
              photo="/img/1.png"
              quote="Avec le scrutin proportionnel, le Président de la République ne peut annoncer de réforme sans savoir s'il aura une majorité pour le soutenir. Nous sommes confrontés à une bataille d'intérêts sur la vision du régime : s'agit-il d'obtenir une majorité absolue soumise à un chef ou de mettre en place un régime plus parlementaire ? "
              isLeft={ true }
            />,
          ]
        },
        {
          "type": "interlocuteur2",
          "intervenant": "levade",
          "contenu": [
            <Quote
              photo="/img/2.png"
              quote="La culture politique française est à l'évidence différente d'autres pays et sans doute davantage présidentialiste que nos voisins européens ! Une culture politique se forge dans le temps long et suppose une réadaptation progressive et permanente aux événements. Si l'on passe à une VIe République avec scrutin proportionnel, il y a fort à parier que cela n'apportera aucune solution à la crise démocratique profonde que nous traversons désagrégation des forces politiques, déficit, etc. "
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
          "type": "interlocuteur1",
          "intervenant": "morel",
          "contenu": [
            "Je n'ai rien, en soi, contre une VIe République… mais c'est un slogan, et je suis tout à fait d'accord avec vous sur ce point. Il nous faut d'abord établir un objectif, puis réfléchir aux moyens à mettre en œuvre. Cherche-t-on à instaurer un régime plus parlementaire ? Une meilleure représentativité ? Davantage de stabilité politique ?",
            "C'est justement parce que je partage l'idée qu'une rupture institutionnelle n'est pas souhaitable que je préconise des améliorations à l'intérieur du système actuel, en passant simplement par une loi ordinaire.",
            "Il faut faire preuve de pragmatisme : définir des objectifs précis et modifier à la marge le texte existant. En ce qui concerne les rapports entre les pouvoirs, ou la démocratie directe, on peut déjà envisager de grands changements textuels sans bouleverser totalement notre cadre institutionnel."
          ]
        },
        {
          "type": "interlocuteur2",
          "intervenant": "levade",
          "contenu": [
            "De la même manière que personne n'aurait la drôle d'idée d'établir un diagnostic médical par « convention citoyenne », il faudrait éviter de changer la Constitution de manière participative. La technicité du droit demande des manœuvres de précision.",
            "La crise actuelle n'est pas tant politique que démocratique. Dans ce contexte, se précipiter de remettre en cause les institutions me paraît particulièrement dangereux.",
            "On court aussi le risque d'un effet de déception phénoménal. Quelle que soit la formule choisie, cela ne changera pas notre paysage politique. La désinstitutionnalisation est l'une des dernières choses dont nous ayons besoin. Les institutions ont acquis une légitimité démocratique assise sur un système de vote.",
            "Ce n'est pas « le système » qui est défaillant et interdit la formation de coalitions, mais la structuration politique qui fait défaut : et cela, ce n'est pas le scrutin proportionnel qui le changera."
          ],
          "citation": "La crise actuelle n'est pas tant politique que démocratique. Se précipiter de remettre en cause les institutions me paraît particulièrement dangereux."
        },
        {
          "type": "interlocuteur1",
          "intervenant": "morel",
          "contenu": [
            "Nous traversons effectivement une crise démocratique et le risque d'effets déceptifs est sérieux. Néanmoins, cette crise agit sur trois ressorts, et le scrutin proportionnel reste un levier d'action utile pour agir sur le dernier :",
            "Premièrement, une déstructuration de l'espace public, qui rend le débat sur le réel dysfonctionnel. Deuxièmement, une crise de la capacité de la politique à agir sur le réel — les prélèvements obligatoires représentent 43,2 % de notre PIB et les dépenses publiques s'élèvent à 57 %, sans parvenir à améliorer la qualité des services publics. Troisièmement, une crise de la représentativité politique.",
            "Or, cela, le scrutin proportionnel peut y répondre en partie : faciliter les coalitions et surtout les faire perdurer après les élections sur des accords politiques stabilisés. Nous disposons de ces voies techniques pour opérer certains aménagements institutionnels."
          ]
        }
      ]
    },
    {
      "question": "Quels impactes pour le RN ?",
      "color": "#FFDED6",
      "textcolor": "#EB5D31",
      "dialogue": [
        {
          "type": "interlocuteur1",
          "intervenant": "morel",
          "contenu": [
            "Pendant des années, le Rassemblement national n'a pas proposé de vision structurée en matière institutionnelle, hormis son engagement constant en faveur de la proportionnelle, l'un de ses seuls chevaux de bataille dont il n'ait jamais démordu.",
            "Cependant, depuis quelques mois, le seul parti susceptible d'obtenir la majorité absolue dans le cadre du scrutin majoritaire à deux tours actuel est précisément le RN, qui continue à militer pour l'instauration de la proportionnelle.",
            "C'est là une évolution majeure : le RN est toujours favorable à la proportionnelle, mais désormais, il préconise une version avec une prime majoritaire, qui lui permettrait d'obtenir une majorité absolue. Avec une prime de 15–20 %, le RN pourrait espérer gouverner sous ses seules couleurs."
          ]
        },
        {
          "type": "interlocuteur2",
          "intervenant": "levade",
          "contenu": [
            "Peut-être faudrait-il faire intervenir un élément de psychologie, ou plus exactement de stratégie politique, et questionner la volonté effective du RN d'arriver au pouvoir.",
            "La représentation proportionnelle lui garantit de ne pas obtenir une majorité absolue embarrassante pour un parti qui ne veut pas gouverner tout de suite, pour en être mieux capable à terme.",
            "L'autre avantage du scrutin proportionnel avec prime majoritaire, pour le RN, c'est qu'il désactive le front républicain, ou ce qu'il en reste, et facilite donc l'ascension du Rassemblement National."
          ]
        }
      ]
    }
  ]
};

export default debateData;