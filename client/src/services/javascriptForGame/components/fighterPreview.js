import createElement from "../helpers/domHelper";

export function createFighterImage(fighter) {
  const { name } = fighter;
  const attributes = {
    src: "https://66.media.tumblr.com/tumblr_lq8g3548bC1qd0wh3o1_400.gif",
    title: name,
    alt: name,
  };
  const imgElement = createElement({
    tagName: "img",
    className: "fighter-preview___img",
    attributes,
  });

  return imgElement;
}
