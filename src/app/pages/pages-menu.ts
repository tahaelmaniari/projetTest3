import {faCoffee} from "@fortawesome/free-solid-svg-icons";
import {NbMenuItem} from "@nebular/theme";



export const MENU_ITEMS: NbMenuItem[] = [

  
  {
    title: 'Dashboard',
    link: '/pages/pilotage',
    icon: 'home',
  },
  {
    title: 'Projets',
    icon: 'list-outline',
    expanded: true,
    link: '/pages/projets',

    },
  {
    title: 'Estimation Cout',
    icon: 'list-outline',
    expanded: true,
    children: [
      {
        title: "Article 1",
        icon: 'faCoffee',
        link: "/pages/estimation-article1"
      },
      {
        title: 'Article 2',
        link: "/pages/lot-electricite",
        icon: 'star',
      },
      {
        title: 'Article 3',
        link: '/pages/lot-climatisation',
        icon: 'star',
      },
      {
        title: 'Article 4',
        link: '/pages/list-fournisseur-projet3',
        icon: 'people-outline',
      },
    ],
  },
  // {
  //   title: 'Demandes à valider',
  //   link: '/demandes-a-valider',
  //   icon: 'briefcase-outline',
  // },
  // {
  //   title: 'Demandes cloturées',
  //   link: '/demandes-cloturees',
  //   icon: 'archive-outline',
  // },
  {
    title: 'Fournisseurs',
    link: '/pages/list-fournisseur',
    icon: 'people-outline',
  },
  {
    title: 'Esitmations',
    link: '/pages/estimation-cout',
    icon: 'people-outline',
  },
]
