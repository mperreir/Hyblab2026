// ════════════════════════════════════════════════════════════════
//  POLYGON ZONES
//  Ajouter chaque nouvelle zone ici après calibration.
//  coordinates → ici (géométrie)
//  article content → epstein-data.json (par id)
// ════════════════════════════════════════════════════════════════

const POLYGON_ZONES = [

{
  id: 'ordinateur',
  points: [
      { phi: 1.8104, theta: -2.6096 },
      { phi: 1.818, theta: -2.6462 },
      { phi: 1.8358, theta: -2.6067 },
      { phi: 1.8271, theta: -2.5586 },
      { phi: 1.7907, theta: -2.5685 },
      { phi: 1.6692, theta: -2.532 },
      { phi: 1.648, theta: -2.7106 },
      { phi: 1.8027, theta: -2.7153 },
      { phi: 1.7917, theta: -2.6115 },
      { phi: 1.8135, theta: -2.608 },
      { phi: 1.785, theta: -2.5713 },
      { phi: 1.7855, theta: -2.5324 },
      { phi: 1.6829, theta: -2.5322 }
  ],
},
{
  id: 'documents',
  points: [
      { phi: 1.8553, theta: -2.8115 },
      { phi: 1.8632, theta: -2.9011 },
      { phi: 1.8384, theta: -2.9056 },
      { phi: 1.8329, theta: -2.8449 }
  ],
},

  {
    id: 'corde',
    points: [
      { phi: 1.8732, theta: 0.3565 },
      { phi: 1.7501, theta: 0.3715 },
      { phi: 1.7429, theta: 0.4179 },
      { phi: 1.6936, theta: 0.4201 },
      { phi: 1.693,  theta: 0.4524 },
      { phi: 1.6997, theta: 0.4496 },
      { phi: 1.7038, theta: 0.4276 },
      { phi: 1.7399, theta: 0.4251 },
      { phi: 1.7435, theta: 0.4411 },
      { phi: 1.6949, theta: 0.4429 },
      { phi: 1.6952, theta: 0.4518 },
      { phi: 1.7429, theta: 0.4464 },
      { phi: 1.7512, theta: 0.4661 },
      { phi: 1.8808, theta: 0.4634 },
      { phi: 1.9012, theta: 0.4668 },
      { phi: 1.9007, theta: 0.4546 },
      { phi: 1.8882, theta: 0.4531 },
      { phi: 1.8918, theta: 0.4307 },
      { phi: 1.9034, theta: 0.4321 },
      { phi: 1.9112, theta: 0.4154 },
      { phi: 1.8949, theta: 0.4096 },
      { phi: 1.8841, theta: 0.4084 },
      { phi: 1.8885, theta: 0.4029 },
      { phi: 1.8869, theta: 0.3683 },
      { phi: 1.8935, theta: 0.3689 },
      { phi: 1.8933, theta: 0.3575 },
    ],
  },

  {
    id: 'globe',
    points: [
      { phi: 1.8375, theta: 1.0231 },
      { phi: 1.8474, theta: 1.0169 },
      { phi: 1.8479, theta: 0.9515 },
      { phi: 1.8366, theta: 0.9442 },
      { phi: 1.8196, theta: 0.9622 },
      { phi: 1.8232, theta: 1.0243 },
      { phi: 1.8374, theta: 1.025  },
      { phi: 1.8144, theta: 0.9921 },
      { phi: 1.8104, theta: 0.9745 },
      { phi: 1.8194, theta: 0.9671 },
      { phi: 1.8007, theta: 0.9789 },
      { phi: 1.7772, theta: 0.9353 },
      { phi: 1.7534, theta: 0.9267 },
      { phi: 1.7227, theta: 0.9248 },
      { phi: 1.7014, theta: 0.9366 },
      { phi: 1.6811, theta: 0.9578 },
      { phi: 1.674,  theta: 0.9857 },
      { phi: 1.6793, theta: 0.9999 },
      { phi: 1.6689, theta: 1.005  },
      { phi: 1.694,  theta: 1.0442 },
      { phi: 1.728,  theta: 1.059  },
      { phi: 1.7658, theta: 1.0539 },
      { phi: 1.7885, theta: 1.0347 },
      { phi: 1.8008, theta: 1.0173 },
      { phi: 1.8092, theta: 1.0015 },
      { phi: 1.8125, theta: 0.993  },
    ],
  },

  {
    id: 'tigre',
    points: [
      { phi: 1.9461, theta: 2.9362 },
      { phi: 1.9026, theta: 2.8817 },
      { phi: 1.8703, theta: 2.8779 },
      { phi: 1.848,  theta: 2.8835 },
      { phi: 1.8187, theta: 2.875  },
      { phi: 1.7996, theta: 2.8759 },
      { phi: 1.806,  theta: 2.8607 },
      { phi: 1.8019, theta: 2.841  },
      { phi: 1.8114, theta: 2.8159 },
      { phi: 1.8107, theta: 2.8041 },
      { phi: 1.8167, theta: 2.7993 },
      { phi: 1.8309, theta: 2.8067 },
      { phi: 1.8485, theta: 2.8024 },
      { phi: 1.8603, theta: 2.7937 },
      { phi: 1.8536, theta: 2.7523 },
      { phi: 1.8579, theta: 2.72   },
      { phi: 1.8697, theta: 2.6987 },
      { phi: 1.8853, theta: 2.6835 },
      { phi: 1.8998, theta: 2.6752 },
      { phi: 1.9114, theta: 2.6711 },
      { phi: 1.9221, theta: 2.6793 },
      { phi: 1.9308, theta: 2.6969 },
      { phi: 1.9528, theta: 2.8215 },
      { phi: 1.9637, theta: 2.8793 },
      { phi: 1.9691, theta: 2.8968 },
      { phi: 1.9555, theta: 2.9359 },
    ],
  },


{
  id: 'livre',
  points: [
      { phi: 1.7917, theta: 2.2801 },
      { phi: 1.8027, theta: 2.2441 },
      { phi: 1.8177, theta: 2.2431 },
      { phi: 1.8303, theta: 2.2809 },
      { phi: 1.8163, theta: 2.3155 },
      { phi: 1.8003, theta: 2.3175 }
  ],
},

  {
    id: 'document_vietnam',
    points: [
      { phi: 2.1094, theta: -1.4415 },
      { phi: 2.1040, theta: -1.2948 },
      { phi: 2.1779, theta: -1.2765 },
      { phi: 2.1883, theta: -1.4299 },
    ],
  },
  
{
  id: 'cheminee',
  points: [
      { phi: 2.0085, theta: -1.7865 },
      { phi: 2.0264, theta: -1.8073 },
      { phi: 2.0401, theta: -1.8051 },
      { phi: 2.0483, theta: -1.8032 },
      { phi: 2.051, theta: -1.7424 },
      { phi: 2.0136, theta: -1.7404 },
      { phi: 2.0027, theta: -1.7608 },
      { phi: 1.8208, theta: -1.7537 },
      { phi: 1.7783, theta: -1.7448 },
      { phi: 1.7314, theta: -1.7532 },
      { phi: 1.6297, theta: -1.7481 },
      { phi: 1.6297, theta: -1.7481 },
      { phi: 1.6193, theta: -1.7649 },
      { phi: 1.6114, theta: -1.7653 },
      { phi: 1.5763, theta: -1.7566 },
      { phi: 1.566, theta: -1.7704 },
      { phi: 1.5711, theta: -1.7861 },
      { phi: 1.605, theta: -1.7818 },
      { phi: 1.6181, theta: -1.7784 },
      { phi: 1.6262, theta: -1.7902 },
      { phi: 1.7199, theta: -1.7886 },
      { phi: 1.7717, theta: -1.7962 },
      { phi: 1.8165, theta: -1.7884 },
      { phi: 1.873, theta: -1.7843 }
  ],
},

{
  id: 'fauteuil',
  points: [
      { phi: 2.4126, theta: 3.0386 },
      { phi: 2.43, theta: 2.9582 },
      { phi: 2.5022, theta: 2.9721 },
      { phi: 2.5, theta: 3.035 },
      { phi: 2.4856, theta: 3.1235 }
  ],
},


{
  id: 'fauteuil',
  points: [
      { phi: 2.2009, theta: -2.7694 },
      { phi: 2.1213, theta: -2.7733 },
      { phi: 2.1143, theta: -2.7315 },
      { phi: 2.15, theta: -2.725 },
      { phi: 2.199, theta: -2.7273 }
  ],
},


{
  id: 'fauteuil',
  points: [
      { phi: 2.0604, theta: -0.0173 },
      { phi: 2.1267, theta: -0.0075 },
      { phi: 2.1622, theta: 0.0245 },
      { phi: 2.117, theta: 0.1194 },
      { phi: 2.0913, theta: 0.078 },
      { phi: 2.0514, theta: 0.059 }
  ],
},

{
  id: 'fauteuil',
  points: [
      { phi: 1.816, theta: -0.6214 },
      { phi: 1.8143, theta: -0.6602 },
      { phi: 1.8784, theta: -0.6508 },
      { phi: 1.89, theta: -0.6057 }
  ],
},

{
  id: 'fauteuil',
  points: [
      { phi: 1.8357, theta: -0.1825 },
      { phi: 1.8271, theta: -0.2588 },
      { phi: 1.8069, theta: -0.2412 },
      { phi: 1.8143, theta: -0.1752 }
  ],
},


{
  id: 'fauteuil',
  points: [
      { phi: 2.1155, theta: -1.4504 },
      { phi: 2.1992, theta: -1.4492 },
      { phi: 2.1877, theta: -1.2603 },
      { phi: 2.0963, theta: -1.2893 }
  ],
},


{
  id: 'fauteuil',
  points: [
      { phi: 2.5903, theta: -0.7044 },
      { phi: 2.6683, theta: -0.5582 },
      { phi: 2.645, theta: -0.5183 },
      { phi: 2.5854, theta: -0.6397 }
  ],
},

{
  id: 'fauteuil',
  points: [
      { phi: 2.0454, theta: 0.7571 },
      { phi: 2.0508, theta: 0.6955 },
      { phi: 2.1026, theta: 0.7642 },
      { phi: 2.0906, theta: 0.8847 },
      { phi: 2.0906, theta: 0.8847 },
      { phi: 2.0621, theta: 0.8372 },
      { phi: 2.0659, theta: 0.7957 }
  ],
},


{
  id: 'fauteuil',
  points: [
      { phi: 1.6728, theta: -0.8837 },
      { phi: 1.6754, theta: -0.9349 },
      { phi: 1.6902, theta: -0.914 },
      { phi: 1.6885, theta: -0.8622 }
  ],
},

{
  id: 'fauteuil',
  points: [
      { phi: 2.1483, theta: 1.906 },
      { phi: 2.1613, theta: 1.9206 },
      { phi: 2.1495, theta: 1.9222 },
      { phi: 2.175, theta: 1.9536 },
      { phi: 2.1723, theta: 2.0114 },
      { phi: 2.1723, theta: 2.0114 },
      { phi: 2.1565, theta: 2.007 },
      { phi: 2.1544, theta: 2.0389 },
      { phi: 2.1422, theta: 2.0452 },
      { phi: 2.1422, theta: 2.0452 },
      { phi: 2.118, theta: 2.0102 },
      { phi: 2.0939, theta: 1.9862 },
      { phi: 2.0903, theta: 1.9634 },
      { phi: 2.0849, theta: 1.9439 },
      { phi: 2.1059, theta: 1.9445 },
      { phi: 2.0974, theta: 1.9213 },
      { phi: 2.1021, theta: 1.909 },
      { phi: 2.1126, theta: 1.9056 }
  ],
},

];