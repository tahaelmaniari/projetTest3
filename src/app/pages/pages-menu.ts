import {NbMenuItem} from "@nebular/theme";

export const MENU_ITEMS: NbMenuItem[] = [

  
  {
    title: 'Dashboard',
    link: '/pages/pilotage',
    icon: {
      icon: 'shapes',
      pack: 'fas'
    },
  },
  {
    title: 'Projets',
    icon: 'list-outline',
    expanded: true,
    link: '/pages/projets',

    },
 /*  {
    title: 'Estimation Cout',
    icon: 'list-outline',
    expanded: false,
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
  }, */
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
    icon: 'fa-star',
  },
]
