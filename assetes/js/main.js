"use strict";
const socials = new Map();
socials.set("www.facebook.com", "./assetes/icons/facebook.svg");
socials.set("twitter.com", "./assetes/icons/twitter.svg");
socials.set("www.instagram.com", "./assetes/icons/instagram.svg");
const root = document.getElementById("root");

fetch("./assetes/js/data.json")
  .then((response) => response.json())
  .then((actors) => {
    console.log(actors);
    const actorItem = actors.map((actor) => createActorCard(actor));
    ulActors.append(...actorItem);
  })
  .catch(() => {
    root.append("try again");
  });

const h1 = createElement("h1", { classNames: ["actors-title"] }, "actors");
const ulActors = createElement("ul", { classNames: ["actors-list"] });
const sectionContainer = createElement(
  "div",
  { classNames: ["actors-container"] },
  h1,
  ulActors
);
const divWrapper = createElement(
  "section",
  { classNames: ["wrapper-actor-cads"] },
  sectionContainer
);
const h2 = createElement(
  "h2",
  { classNames: ["choosed-group-title"] },
  document.createTextNode("you choose")
);
const choosedGroup = createElement("div", {
  classNames: ["choosed-group"],
});
const choosedGroupWrapper = createElement(
  "section",
  {
    classNames: ["choosed-group-wrapper"],
  },
  h2,
  choosedGroup
);
root.append(divWrapper);
root.append(choosedGroupWrapper);

function createActorCard({
  id,
  firstName,
  lastName,
  profilePicture,
  contacts,
}) {
  if (firstName && lastName) {
    const links = contacts.map((contact) => {
      const hostname = new URL(contact).hostname;
      const href = new URL(contact).href;
      const img = createElement("img", {
        classNames: ["link-img"],
        attributes: { src: socials.get(hostname), alt: firstName },
      });
      return createElement(
        "a",
        {
          classNames: ["actor-link"],
          attributes: { href, target: "_blank" },
        },
        img
      );
    });

    const linksWrapper = createElement(
      "div",
      { classNames: ["links-wrapper"] },
      ...links
    );

    const h2Initials = createElement(
      "h2",
      {
        classNames: ["actor-initials"],
        styles: { backgroundColor: stringToColour(firstName) },
      },
      firstName[0] + lastName[0]
    );

    const divPhotoWrapper = createElement(
      "div",
      { classNames: ["actor-photo-wrapper"] },
      h2Initials
    );

    const img = createElement("img", {
      classNames: ["actor-photo"],
      attributes: { src: profilePicture, alt: firstName },
      events: { load: handleImgLoad(divPhotoWrapper) },
    });

    const h2Name = createElement(
      "h2",
      { classNames: ["actor-name"] },
      firstName + " " + lastName
    );

    const article = createElement(
      "article",
      { classNames: ["actor-card"] },
      divPhotoWrapper,
      h2Name,
      linksWrapper
    );

    const img2 = createElement("img", {
      classNames: ["choosed-actor-photo"],
      attributes: { src: profilePicture, alt: firstName },
    });

    const divActor = createElement(
      "div",
      {
        classNames: ["choosed-actor"],
        attributes: { id },
      },
      img2,
      firstName + " " + lastName
    );
    const li = createElement(
      "li",
      {
        classNames: ["actor-item"],
        events: {
          click: () => {
            console.log(divActor);
            if (choosedGroup.contains(divActor) === false) {
              choosedGroup.append(divActor);

              article.style.backgroundColor = "pink";
            } else {
              divActor.remove();
              article.style.backgroundColor = "";
            }
          },
        },
      },
      article
    );
    return li;
  }
  return "";
}
