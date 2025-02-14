import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface Element {
  slug: string;
  name: string;
  ecv: string;
}

interface Thematique {
  id: number;
  name: string;
  slug: string;
  elements: Element[];
}

/*sert à créer un contexte pour les thématiques*/
const ThematiqueContext = createContext<Thematique[]>([]);

/*cré"ation d'un hook pour utiliser le contexte des thématiques*/
export const useThematique = () => {
  const context = useContext(ThematiqueContext);
  if (!context) {
    throw new Error("useThematique must be used within a ThematiqueProvider");
  }
  return context;
};

/*sert à fournir les thématiques*/
interface ThematiqueProviderProps {
  children: ReactNode;
  thematique: Thematique[];
}

export const ThematiqueProvider: React.FC<ThematiqueProviderProps> = ({
  children,
  thematique,
}) => {
  const [thematiques, setThematiques] = useState<Thematique[]>(thematique);

  useEffect(() => {
    const fetchThematiques = async () => {
      try {
        const response = await fetch("http://localhost:3310/thematiques");
        const data = await response.json();
        setThematiques(data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des thématiques :",
          error,
        );
      }
    };

    fetchThematiques();
  }, []);

  return (
    <ThematiqueContext.Provider value={thematiques}>
      {children}
    </ThematiqueContext.Provider>
  );
};
