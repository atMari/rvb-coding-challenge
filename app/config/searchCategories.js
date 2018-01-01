import cms from './messages';
import cats from '../constants/searchCategories';

export const searchCategories = [
  {
    text: cms['category.electricGuitars'],
    value: cats.electricGuitars
  },
  {
    text: cms['category.accessories'],
    value: cats.accessories
  },
  {
    text: cms['category.parts'],
    value: cats.parts
  },
  {
    text: cms['category.acousticGuitars'],
    value: cats.acousticGuitars
  },
  {
    text: cms['category.amps'],
    value: cats.amps
  },
  {
    text: cms['category.bassGuitars'],
    value: cats.bassGuitars
  },
  {
    text: cms['category.effectsAndPedals'],
    value: cats.effectsAndPedals
  },
  {
    text: cms['category.proAudio'],
    value: cats.proAudio
  },
  {
    text: cms['category.folkInstruments'],
    value: cats.folkInstruments
  },
  {
    text: cms['category.software'],
    value: cats.software
  },
  {
    text: cms['category.drumsAndPercussion'],
    value: cats.drumsAndPercussion
  },
  {
    text: cms['category.homeAudio'],
    value: cats.homeAudio
  },
  {
    text: cms['category.bandAndOrchestra'],
    value: cats.bandAndOrchestra
  },
  {
    text: cms['category.keyboardsAndSynths'],
    value: cats.keyboardsAndSynths
  },
  {
    text: cms['category.djAndLightingGear'],
    value: cats.djAndLightingGear
  },
  {
    text: cms['category.electricKeyboards'],
    value: cats.electricKeyboards
  },
  {
    text: cms['category.electricPianos'],
    value: cats.electricPianos
  }
];

export default searchCategories;

export const searchCategoryStrings = searchCategories.map(
  cat => cat.text.toLowerCase()
);
