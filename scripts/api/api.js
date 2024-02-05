class Api {
  static async fetchData() {
    const jsonFilePath = "data/photographers.json";
    try {
      const response = await fetch(jsonFilePath);
      if (!response.ok) {
        throw new Error(
          `Erreur de chargement du fichier JSON : ${response.statusText}`
        );
      }
      const jsonData = await response.json();
      return jsonData;
    } catch (error) {
      console.error("Erreur fetch :", error);
    }
  }
}

export { Api };