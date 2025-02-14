import { useEffect, useState } from "react";

interface Element {
  name: string;
  slug: string;
  ecv: string;
}

interface Thematique {
  name: string;
  id: number;
}

interface ImpactCO2CustomProps {
  element: Element;
  selectedThematique: Thematique | null;
}

function ImpactCo2Element({
  element,
  selectedThematique,
}: ImpactCO2CustomProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedElement, setEditedElement] = useState<Element>(element);

  useEffect(() => {
    // Fetch the list of saved elements from the backend
    const fetchSavedElements = async () => {
      try {
        const response = await fetch("http://localhost:3310/elements");
        const savedElements = await response.json();
        // Check if the current element is already saved
        const isElementSaved = savedElements.some(
          (savedElement: Element) => savedElement.slug === element.slug,
        );
        setIsSaved(isElementSaved);
        if (isElementSaved) {
          const saved = savedElements.find(
            (savedElement: Element) => savedElement.slug === element.slug,
          );
          setEditedElement({
            ...saved,
            ecv: saved.ecv,
          });
        }
        console.info("isElementSaved =", isElementSaved);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des éléments enregistrés:",
          error,
        );
      }
    };

    fetchSavedElements();
  }, [element.slug]);

  /* Gestion des images pour les avions */
  const getImageSlug = (slug: string) => {
    if (
      slug.startsWith("avion-courtcourrier") ||
      slug.startsWith("avion-moyencourrier") ||
      slug.startsWith("avion-longcourrier")
    ) {
      return "avion";
    }
    return slug;
  };
  const imageUrl = `https://impactco2.fr/icons/${getImageSlug(element.slug)}.svg`;

  ///////////////////GESTION DU CRUD EN FRONT////////////////////
  function onClickEditButton() {
    setIsEditing(true);
  }

  function onClickSaveButton() {
    handleSave();
  }

  function onClickSaveModificationButton() {
    handleModify();
    setIsEditing(false);
  }

  function onClickDeleteButton() {
    handleDelete();
  }

  /*Enregistrement en back de l'élément*/
  const handleSave = async () => {
    try {
      const imageUrl = `https://impactco2.fr/icons/${getImageSlug(element.slug)}.svg`;
      const response = await fetch("http://localhost:3310/elements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: element.name,
          slug: element.slug,
          ecv: element.ecv,
          image_url: imageUrl,
          category: selectedThematique?.name,
          thematique_id: selectedThematique?.id,
        }),
      });

      if (!response.ok) throw new Error("Erreur lors de l'enregistrement");

      setIsSaved(true);
      setIsEditing(false);
      alert("Élément enregistré avec succès !");
    } catch (error) {
      console.error(error);
      alert("Erreur lors de l'enregistrement.");
    }
  };
  /*Modification en back de l'élément*/
  const handleModify = async () => {
    try {
      const response = await fetch(
        `http://localhost:3310/elements/${element.slug}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: editedElement.name,
            ecv: editedElement.ecv,
          }),
        },
      );

      if (!response.ok) throw new Error("Erreur lors de l'enregistrement");

      setIsSaved(true);
      setIsEditing(false);
      alert("Élément enregistré avec succès !");
    } catch (error) {
      console.error(error);
      alert("Erreur lors de l'enregistrement.");
    }
  };
  /*Suppresssion en back de l'élément*/
  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:3310/elements/${element.slug}`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) throw new Error("Erreur lors de la suppression");

      setIsSaved(false);
      setIsEditing(false);
      alert("Élément supprimé avec succès !");
    } catch (error) {
      console.error(error);
      alert("Erreur lors de la suppression.");
    }
  };

  /* Formatage de l'ECV */
  const formatEcv = (ecv: string) => {
    const ecvNumber = Number.parseFloat(ecv);
    if (Number.isNaN(ecvNumber)) {
      return "N/A";
    }
    if (selectedThematique?.name === "Transport") {
      return `${(ecvNumber * 1000).toFixed(0)} g CO₂e`;
    }
    return `${ecvNumber.toFixed(2)} kg CO₂e`;
  };

  return (
    <div className="impact-co2-element">
      <img
        className="impact-co2-element-image"
        src={imageUrl}
        alt={element.slug}
        style={{ width: 48, height: 48 }}
      />

      {selectedThematique?.name === "Alimentation" && (
        <div>
          {isEditing ? (
            <>
              <input
                type="number"
                value={editedElement.ecv}
                onChange={(e) =>
                  setEditedElement({
                    ...editedElement,
                    ecv: e.target.value,
                  })
                }
              />
              <input
                type="text"
                value={editedElement.name}
                onChange={(e) =>
                  setEditedElement({ ...editedElement, name: e.target.value })
                }
              />
            </>
          ) : (
            <>
              <div className="ecv">{formatEcv(editedElement.ecv)}</div>
              <div className="name">{`pour ${editedElement.name}`}</div>
            </>
          )}
        </div>
      )}

      {selectedThematique?.name === "Numérique" && (
        <div>
          {isEditing ? (
            <>
              <input
                type="number"
                value={editedElement.ecv}
                onChange={(e) =>
                  setEditedElement({
                    ...editedElement,
                    ecv: e.target.value,
                  })
                }
              />
              <input
                type="text"
                value={editedElement.name}
                onChange={(e) =>
                  setEditedElement({ ...editedElement, name: e.target.value })
                }
              />
            </>
          ) : (
            <>
              <div className="ecv">{formatEcv(editedElement.ecv)}</div>
              <div className="name">{`pour ${editedElement.name}`}</div>
            </>
          )}
        </div>
      )}

      {selectedThematique?.name === "Boisson" && (
        <div>
          {isEditing ? (
            <>
              <input
                type="number"
                value={editedElement.ecv}
                onChange={(e) =>
                  setEditedElement({
                    ...editedElement,
                    ecv: e.target.value,
                  })
                }
              />
              <input
                type="text"
                value={editedElement.name}
                onChange={(e) =>
                  setEditedElement({ ...editedElement, name: e.target.value })
                }
              />
            </>
          ) : (
            <>
              <div className="ecv">{formatEcv(editedElement.ecv)}</div>
              <div className="name">{`pour ${editedElement.name}`}</div>
            </>
          )}
        </div>
      )}

      {selectedThematique?.name === "Transport" && (
        <div>
          {isEditing ? (
            <>
              <input
                type="number"
                value={editedElement.ecv}
                onChange={(e) =>
                  setEditedElement({
                    ...editedElement,
                    ecv: e.target.value,
                  })
                }
              />
              <input
                type="text"
                value={editedElement.name}
                onChange={(e) =>
                  setEditedElement({ ...editedElement, name: e.target.value })
                }
              />
            </>
          ) : (
            <>
              <div className="ecv">{formatEcv(editedElement.ecv)}</div>
              <div className="name">{`pour ${editedElement.name}`}</div>
            </>
          )}
        </div>
      )}

      {selectedThematique?.name === "Habillement" && (
        <div>
          {isEditing ? (
            <>
              <input
                type="number"
                value={editedElement.ecv}
                onChange={(e) =>
                  setEditedElement({
                    ...editedElement,
                    ecv: e.target.value,
                  })
                }
              />
              <input
                type="text"
                value={editedElement.name}
                onChange={(e) =>
                  setEditedElement({ ...editedElement, name: e.target.value })
                }
              />
            </>
          ) : (
            <>
              <div className="ecv">{formatEcv(editedElement.ecv)}</div>
              <div className="name">{`pour ${editedElement.name}`}</div>
            </>
          )}
        </div>
      )}

      {selectedThematique?.name === "Électroménager" && (
        <div>
          {isEditing ? (
            <>
              <input
                type="number"
                value={editedElement.ecv}
                onChange={(e) =>
                  setEditedElement({
                    ...editedElement,
                    ecv: e.target.value,
                  })
                }
              />
              <input
                type="text"
                value={editedElement.name}
                onChange={(e) =>
                  setEditedElement({ ...editedElement, name: e.target.value })
                }
              />
            </>
          ) : (
            <>
              <div className="ecv">{formatEcv(editedElement.ecv)}</div>
              <div className="name">{`pour ${editedElement.name}`}</div>
            </>
          )}
        </div>
      )}

      {selectedThematique?.name === "Mobilier" && (
        <div>
          {isEditing ? (
            <>
              <input
                type="number"
                value={editedElement.ecv}
                onChange={(e) =>
                  setEditedElement({
                    ...editedElement,
                    ecv: e.target.value,
                  })
                }
              />
              <input
                type="text"
                value={editedElement.name}
                onChange={(e) =>
                  setEditedElement({ ...editedElement, name: e.target.value })
                }
              />
            </>
          ) : (
            <>
              <div className="ecv">{formatEcv(editedElement.ecv)}</div>
              <div className="name">{`pour ${editedElement.name}`}</div>
            </>
          )}
        </div>
      )}

      {selectedThematique?.name === "Chauffage" && (
        <div>
          <div className="ecv">{formatEcv(element.ecv)}</div>
          <div className="name">{`par ${element.name}`}</div>
        </div>
      )}

      {selectedThematique?.name === "Chauffage" && (
        <div>
          {isEditing ? (
            <>
              <input
                type="number"
                value={editedElement.ecv}
                onChange={(e) =>
                  setEditedElement({
                    ...editedElement,
                    ecv: e.target.value,
                  })
                }
              />
              <input
                type="text"
                value={editedElement.name}
                onChange={(e) =>
                  setEditedElement({ ...editedElement, name: e.target.value })
                }
              />
            </>
          ) : (
            <>
              <div className="ecv">{formatEcv(editedElement.ecv)}</div>
              <div className="name">{`pour ${editedElement.name}`}</div>
            </>
          )}
        </div>
      )}

      {selectedThematique?.name === "Fruits et légumes" && (
        <div>
          {isEditing ? (
            <>
              <input
                type="number"
                value={editedElement.ecv}
                onChange={(e) =>
                  setEditedElement({
                    ...editedElement,
                    ecv: e.target.value,
                  })
                }
              />
              <input
                type="text"
                value={editedElement.name}
                onChange={(e) =>
                  setEditedElement({ ...editedElement, name: e.target.value })
                }
              />
            </>
          ) : (
            <>
              <div className="ecv">{formatEcv(editedElement.ecv)}</div>
              <div className="name">{`pour ${editedElement.name}`}</div>
            </>
          )}
        </div>
      )}

      {selectedThematique?.name === "Usage numérique" && (
        <div>
          {isEditing ? (
            <>
              <input
                type="number"
                value={editedElement.ecv}
                onChange={(e) =>
                  setEditedElement({
                    ...editedElement,
                    ecv: e.target.value,
                  })
                }
              />
              <input
                type="text"
                value={editedElement.name}
                onChange={(e) =>
                  setEditedElement({ ...editedElement, name: e.target.value })
                }
              />
            </>
          ) : (
            <>
              <div className="ecv">{formatEcv(editedElement.ecv)}</div>
              <div className="name">{`pour ${editedElement.name}`}</div>
            </>
          )}
        </div>
      )}

      {selectedThematique?.name === "Cas pratiques" && (
        <div>
          {isEditing ? (
            <>
              <input
                type="number"
                value={editedElement.ecv}
                onChange={(e) =>
                  setEditedElement({
                    ...editedElement,
                    ecv: e.target.value,
                  })
                }
              />
              <input
                type="text"
                value={editedElement.name}
                onChange={(e) =>
                  setEditedElement({ ...editedElement, name: e.target.value })
                }
              />
            </>
          ) : (
            <>
              <div className="ecv">{formatEcv(editedElement.ecv)}</div>
              <div className="name">{`pour ${editedElement.name}`}</div>
            </>
          )}
        </div>
      )}

      {/* Bouton pour enregistrer ou modifier l'entrée fetchée */}
      <div className="button-container">
        {!isSaved ? (
          <button
            type="button"
            className="save-button"
            onClick={onClickSaveButton} // Enregistre directement si l'élément n'est pas encore enregistré
          >
            Enregistrer
          </button>
        ) : (
          <>
            {!isEditing ? (
              <>
                <button
                  type="button"
                  className="modify-button"
                  onClick={onClickEditButton} // Active juste le mode édition
                >
                  Modifier
                </button>
                <button
                  type="button"
                  className="delete-button"
                  onClick={onClickDeleteButton} // Supprime l'élément
                >
                  Supprimer
                </button>
              </>
            ) : (
              <button
                type="button"
                className="save-button"
                onClick={onClickSaveModificationButton} // Sauvegarde la modification
              >
                Sauvegarder
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default ImpactCo2Element;
