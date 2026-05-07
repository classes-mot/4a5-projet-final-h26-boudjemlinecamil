import { createContext, useState } from 'react'

export const LanguageContext = createContext({
  language: 'fr',
  changeLanguage: () => {},
  translations: {}
})

const dictionary = {
  fr: {
    title: 'Recettes de cuisine',
    addRecipe: 'Ajouter une recette',
    logout: 'Se déconnecter',
    login: 'Se connecter',
    signup: "S'inscrire",
    noAccount: "Pas de compte? S'inscrire",
    back: '← Retour',
    email: 'Email',
    password: 'Mot de passe',
    name: 'Nom',
    description: 'Description',
    ingredients: 'Ingrédients',
    preparationTime: 'Temps de préparation',
    minutes: 'minutes',
    delete: 'Supprimer',
    edit: 'Modifier',
    cancel: 'Annuler',
    add: 'Ajouter',
    save: 'Enregistrer',
    notFound: 'Page introuvable'
  },
  en: {
    title: 'Cooking recipes',
    addRecipe: 'Add a recipe',
    logout: 'Logout',
    login: 'Login',
    signup: 'Sign up',
    noAccount: 'No account? Sign up',
    back: '← Back',
    email: 'Email',
    password: 'Password',
    name: 'Name',
    description: 'Description',
    ingredients: 'Ingredients',
    preparationTime: 'Preparation time',
    minutes: 'minutes',
    delete: 'Delete',
    edit: 'Edit',
    cancel: 'Cancel',
    add: 'Add',
    save: 'Save',
    notFound: 'Page not found'
  }
}

export function LanguageContextProvider({ children }) {
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'fr')

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage)
    localStorage.setItem('language', newLanguage)
  }

  return (
    <LanguageContext.Provider value={{
      language,
      changeLanguage,
      translations: dictionary[language]
    }}>
      {children}
    </LanguageContext.Provider>
  )
}